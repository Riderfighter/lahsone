import { replaceAll, join, formatBraces } from "./Strutil";
import { Weekday, DateRange, parseDateRange, getWeekday, dateInRange } from "./Dutil";

/**
 * A container for schedules and when they take place
 */
export default class Calendar
{
    public readonly schedules: {[id: string]: Schedule};
    public readonly correction: number;

    private default: {[key in Weekday]: string};
    private overrides: {id: string, name: string, range: DateRange}[];

    constructor(schedules: string, calendar: string, correction: string)
    {
        this.correction = parseInt(correction);

        // Init fields
        this.schedules = {};
        this.default = {} as any;
        this.overrides = [];

        // Clean up files
        schedules = replaceAll(replaceAll(schedules, '\r', ''), '\n\n\n', '\n\n');
        calendar = replaceAll(calendar, '\r', '');

        /*-- BEGIN PARSE SCHEDULES --*/
        schedules.split('\n\n').forEach(e =>
        {
            const lines = e.split('\n');
            
            // Line 0: "* id # Name"
            const tokens = lines[0].split(' ');
            this.schedules[tokens[1]] = {} as any;
            this.schedules[tokens[1]].periods = [];
            this.schedules[tokens[1]].id = tokens[1];
            this.schedules[tokens[1]].name = join(tokens, ' ', 3);

            // Line 1-last: "start Name"
            for (let j = 1; j < lines.length; j++)
            {
                this.schedules[tokens[1]].periods[j - 1] = {} as Period;
                const space = lines[j].indexOf(' ');

                this.schedules[tokens[1]].periods[j - 1].start = lines[j].substring(0, space);
                this.schedules[tokens[1]].periods[j - 1].name = formatBraces(lines[j].substring(space + 1), '{', '}', n => `$${n}`);
                this.schedules[tokens[1]].periods[j - 1].passing = this.schedules[tokens[1]].periods[j - 1].name.includes('Passing to');
            }
        });
        /*-- END PARSE SCHEDULES --*/
        
        /*-- BEGIN PARSE CALENDAR --*/
        calendar.split('\n').forEach(line =>
        {
            const tokens = line.split(' ');
            
            switch(tokens[0])
            {
                // Ignores
                case '*': case '': case undefined: return;

                // Default Week
                case 'Sun': this.default.sunday = tokens[1]; break;
                case 'Mon': this.default.monday = tokens[1]; break;
                case 'Tue': this.default.tuesday = tokens[1]; break;
                case 'Wed': this.default.wednesday = tokens[1]; break;
                case 'Thu': this.default.thursday = tokens[1]; break;
                case 'Fri': this.default.friday = tokens[1]; break;
                case 'Sat': this.default.saturday = tokens[1]; break;
            
                // Special Days
                default:
                    this.overrides.push({
                        id: tokens[1],
                        name: join(tokens, ' ', 3),
                        range: parseDateRange(tokens[0], '-', false)
                    });
            }
        });
        /*-- END PARSE CALENDAR --*/
    }

    /**
     * Find a schedule for any given day
     * @param day Day of the schedule to find
     */
    public get(day: Date): Schedule & { day: Date }
    {
        // Check overrides
        const override = this.overrides.find(e => dateInRange(e.range.start, e.range.end, day));
        if (override)
        {
            return {
                id: override.id,
                name: override.name ? override.name : this.schedules[override.id].name,
                periods: this.schedules[override.id].periods,
                day: day
            };
        }

        // Fall-back to default
        const $out = this.schedules[this.default[getWeekday(day)].trim()];
        return { id: $out.id, name: $out.name, periods: $out.periods, day: day };
    }
}

export type Schedule = {
        id: string,
        name: string,
        periods: Period[]
};

type Period = { name: string, start: string, passing: boolean };