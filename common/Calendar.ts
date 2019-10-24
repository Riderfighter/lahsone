import { replaceAll, join } from "./Strutil";
import { Weekday, DateRange, parseDateRange } from "./Dutil";

/**
 * A container for schedules and when they take place
 */
export default class Calendar
{
    public readonly schedules: Schedule[];
    
    private default: {[key in Weekday]: string};
    private overrides: {id: string, name: string, range: DateRange}[];

    constructor(schedules: string, calendar: string)
    {
        // Init fields
        this.schedules = [];
        this.default = {} as any;
        this.overrides = [];

        /*-- BEGIN PARSE SCHEDULES --*/
        replaceAll(schedules,'\n\n\n','\n\n') // Clean up file
            .split('\n\n') // Split by schedule
            .forEach((e, i) => // Populate out
        {
            const lines = e.split('\n');
            
            this.schedules[i].periods = {} as Period[];

            // Line 0: "* id # Name"
            const tokens = lines[0].split(' ');
            this.schedules[i].id = tokens[1];
            this.schedules[i].name = join(tokens, ' ', 3);

            // Line 1-last: "start Name"
            for (let j = 1; j < lines.length; j++)
            {
                this.schedules[i].periods[j - 1] = {} as Period;
                const space = lines[i].indexOf(' ');

                this.schedules[i].periods[j - 1].start = lines[i].substring(0, space);
                this.schedules[i].periods[j - 1].name = lines[i].substring(space + 1);
                this.schedules[i].periods[j - 1].passing = this.schedules[i].periods[i - 1].name.includes('Passing to');
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

}

export type Schedule = {
        id: string,
        name: string,
        periods: Period[]
};

type Period = { name: string, start: string, passing: boolean };