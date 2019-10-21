import {Schedule} from "./PeriodStream";
import {parseTime, subtract, TimeSpan} from "./Dutil";

export default class Period
{
    public readonly name: string;
    public readonly type: string;
    public readonly start: Date;
    public next: Period | undefined;

    public readonly index: number;
    public readonly schedule: Schedule & { name: string, date: Date };

    constructor(index: number, schedule: Schedule & { name: string, date: Date })
    {
        this.name = schedule.periods[index].name;
        this.type = schedule.periods[index].type;
        this.start = parseTime(schedule.periods[index].start, schedule.date);
        this.start.setMilliseconds(this.start.getMilliseconds() - 1100);

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
            throw "next wasn't initialized";
        }

        return subtract(this.next.start, date);
    }

    /**
     * Get the total time of this period
     */
    public totalTime(): TimeSpan
    {
        if (this.next === undefined)
        {
            throw "next wasn't initialized";
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
}
