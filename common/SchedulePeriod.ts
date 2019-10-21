import Gradebook from "./Gradebook";

export default class SchedulePeriod
{
    public name: string;
    public type: string;

    public start: { str: string, date: Date };
    public end: { str: string, date: Date };

    constructor(now: PeriodData, next: PeriodData, date: Date)
    {
        this.name = now.name;
        this.type = now.type;

        this.start = this.initDate(now.start, date);
        this.end = this.initDate(next.start, date);
    }

    private initDate(str: string, date: Date): { str: string, date: Date }
    {
        date = new Date(date);

        let colon = str.indexOf(':');
        let h = parseInt(str.substring(0, colon));
        let m = parseInt(str.substring(colon + 1));

        date.setHours(h, m, 0);

        return { str: str, date: date };
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

    public percent(time: Date): number
    {
        return 1 *
            ((time.getTime() - this.start.date.getTime())
            /(this.end.date.getTime() - this.start.date.getTime()));
    }

    toString(): string
    {
        return this.type + this.name;
    }
}

type PeriodData = { name: string, start: string, type: string }