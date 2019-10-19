
export default class SchedulePeriod
{
    public name: string;
    public type: string;

    public start: string;
    public end: string;

    constructor(now: PeriodData, next: PeriodData)
    {
        this.name = now.name;
        this.type = now.type;

        this.start = now.start;
        this.end = next.start;
    }

    toString(): string
    {
        return this.type + this.name;
    }
}

type PeriodData = { name: string, start: string, type: string }