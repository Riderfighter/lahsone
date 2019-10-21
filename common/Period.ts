import PeriodStream, { Schedule } from "./PeriodStream";
import { parseTime } from "./Dutil";

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

        this.index = index;
        this.schedule = schedule;
    }

    public timeLeft(date: Date): Date
    {
        if (this.next === undefined)
        {
            throw "next wasn't initialized";
        }

        //alert(date.getHours());
        return new Date(this.next.start.getTime() - date.getTime());
    }
}