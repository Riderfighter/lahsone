import {parseTime, subtract, TimeSpan} from "./Dutil";
import GradebookClass from "./Gradebook";
import { format2 } from "./Strutil";
import { Schedule } from "./Calendar";

export default class Period
{
    public readonly name: string;
    public readonly passing: boolean;
    public readonly start: Date;
    public next: Period | undefined;

    public readonly index: number;
    public readonly schedule: Schedule & {day: Date};
    public readonly correction: number;

    constructor(index: number, schedule: Schedule & {day: Date}, correction: number)
    {
        this.name = schedule.periods[index].name;
        this.passing = schedule.periods[index].passing;
        this.start = parseTime(schedule.periods[index].start, schedule.day);

        this.index = index;
        this.schedule = schedule;
        this.correction = correction;
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

        date.setTime(date.getTime() +  this.correction);
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
    public static formatName(period: { name: string, passing: boolean }, gradebook: GradebookClass | undefined = undefined): string
    {
        return format2(period.name, n => {
            if (gradebook === undefined)
            {
                return `Period ${n}`;
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
