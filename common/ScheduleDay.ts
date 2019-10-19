import SchedulePeriod from "./SchedulePeriod";
import Schedules from "./schedules/schedules.json";

export default class ScheduleDay
{
    public periods: SchedulePeriod[];

    constructor(url: string)
    {
        this.periods = [];
    }
}
