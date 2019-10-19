import Gradebook from "./Gradebook";

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

    toString(): string
    {
        return this.type + this.name;
    }
}

type PeriodData = { name: string, start: string, type: string }