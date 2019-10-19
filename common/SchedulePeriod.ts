import TimePeriod from './TimePeriod';

export default class SchedulePeriod
{
    public name: string;
    public time: TimePeriod;

    constructor(name:string, start: string, end: string)
    {
        this.name = name;
        this.time = new TimePeriod(start, end);
    }

    toString()
    {
        return `${this.time.start} > ${this.name} > ${this.time.end}`;
    }
}