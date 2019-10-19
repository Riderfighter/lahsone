import Gradebook from "./Gradebook";

export default class SchedulePeriod
{
    public name: string;
    public type: string;

    public start: { str: string, h: number, m: number };
    public end: { str: string, h: number, m: number };

    constructor(now: PeriodData, next: PeriodData)
    {
        this.name = now.name;
        this.type = now.type;

        this.start = this.initDate(now.start);
        this.end = this.initDate(next.start);
    }

    private initDate(str: string): { str: string, h: number, m: number }
    {
        let colon = str.indexOf(':');
        return { str: str, h: parseInt(str.substring(0, colon)), m: parseInt(str.substring(colon + 1))}
    }

    public getName(gradebook: Gradebook | undefined): string
    {
        const ind = this.name.indexOf("$");

        if (gradebook === undefined || ind < 0)
        {
            return this.name;
        }

        const course = gradebook.getClass(parseInt(this.name.charAt(ind + 1)));
        return this.name.replace(new RegExp('\\$.', 'g'), course ? course.course : "Free");
    }

    public startToDate(now: Date): Date
    {
        now.setHours(this.start.h, this.start.m);

        return now;
    }

    public endToDate(now: Date): Date
    {
        now.setHours(this.end.h, this.end.m);

        return now;
    }

    public percentTo(time: Date, other: SchedulePeriod): number
    {
        return 50;
    }

    toString(): string
    {
        return this.type + this.name;
    }
}

type PeriodData = { name: string, start: string, type: string }