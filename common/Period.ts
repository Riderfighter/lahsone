import {Schedule} from "./PeriodStream";
import {parseTime, subtract, TimeSpan} from "./Dutil";
import GradebookClass from "./Gradebook";
import { format2 } from "./Strutil";

export default class Period
{
    public readonly name: string;
    public readonly type: string;
    public readonly start: Date;
    public next: Period | undefined;

    public readonly index: number;
    public readonly schedule: Schedule & { name: string, date: Date, offset: number };

    constructor(index: number, schedule: Schedule & { name: string, date: Date, offset: number })
    {
        this.name = schedule.periods[index].name;
        this.type = schedule.periods[index].type;
        this.start = parseTime(schedule.periods[index].start, schedule.date);

        this.index = index;
        this.schedule = schedule;
    }

    /**
     * Get the time left in the period
     * @param date Date within the period
     */
    public timeLeft(date: Date): TimeSpan
    {
        if (this.next === undefined)
        {
            throw new Error("next wasn't initialized");
        }

        date.setTime(date.getTime() +  this.schedule.offset);
        return subtract(this.next.start, date);
    }

    /**
     * Get the total time of this period
     */
    public totalTime(): TimeSpan
    {
        if (this.next === undefined)
        {
            throw new Error("next wasn't initialized");
        }

        return subtract(this.next.start, this.start);
    }

    /**
     * Percent of the period complete
     * @param date Date within the period
     */
    public percent(date: Date): number
    {
        return 100 - 100 * (this.timeLeft(date).toSeconds() / this.totalTime().toSeconds());
    }

    /**
     * Formats the name with optional gradebook parameter
     * @param gradebook Gradebook to fetch classnames from
     */
    public static formatName(period: { name: string, type: string }, gradebook: GradebookClass | undefined = undefined): string
    {
        return format2(period.name, n => {
            if (gradebook === undefined)
            {
                return period.type === 'passing' ? `Passing to ${n}` :`Period ${n}`;
            }
            return `TODO schedule-gradebook link`
        });
    }

    /**
     * Formats the name with optional gradebook parameter
     * @param gradebook Gradebook to fetch classnames from
     */
    public formatName(gradebook: GradebookClass | undefined = undefined): string
    {
        return Period.formatName(this, gradebook);
    }
}
