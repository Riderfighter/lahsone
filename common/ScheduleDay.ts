import SchedulePeriod from "./SchedulePeriod";
import SchedulesData from "./schedules/schedules.json";

export default class ScheduleDay
{
    public periods: SchedulePeriod[];

    constructor(todayID: ScheduleID, tomorrowID: ScheduleID)
    {
        this.periods = [];
        const data = SchedulesData[todayID];
        
        let i = 0;
        while (i < data.length - 1)
        {            
            this.periods[i] = new SchedulePeriod(data[i], data[i+1]);
            i++;
        }
        this.periods[i] = new SchedulePeriod(data[i], SchedulesData[tomorrowID][0]);
    }
}

type ScheduleID = "regular" | "tutorial";