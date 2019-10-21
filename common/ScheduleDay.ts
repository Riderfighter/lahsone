import SchedulePeriod from "./SchedulePeriod";
import SchedulesData from "./fetched/schedules.json";

export default class ScheduleDay
{
    public periods: SchedulePeriod[];
    private currentPeriodIndex: number;

    constructor(todayID: ScheduleID, tomorrowID: ScheduleID, date: Date)
    {
        this.periods = [];
        this.currentPeriodIndex = 0;
        const data = SchedulesData[todayID];

        const tomorrowDate = new Date();
        tomorrowDate.setDate(date.getDate() + 1);
        
        let i = 0;
        while (i < data.length - 1)
        {            
            this.periods[i] = new SchedulePeriod(data[i], data[i+1], date);
            i++;
        }
        this.periods[i] = new SchedulePeriod(data[i], SchedulesData[tomorrowID][0], tomorrowDate);
    }

    public getPercentage(now: Date): { period: SchedulePeriod, percentage: number, left: Date }
    {
        let percent = this.periods[this.currentPeriodIndex].percent(now);
        while (percent < 0 || percent > 100)
        {
            percent = this.periods[++this.currentPeriodIndex].percent(now);
        }

        return {
            period: this.periods[this.currentPeriodIndex],
            percentage: percent,
            left: new Date(this.periods[this.currentPeriodIndex].end.date.getTime() - now.getTime())
        };
    }
}

type ScheduleID = "regular" | "tutorial" | "weekend";