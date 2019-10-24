import Period from './Period';
import { tomorrowOf, yesterdayOf } from './Dutil';
import Calendar from './Calendar';

export default class PeriodStream
{
    public readonly calendar: Calendar;

    private current: Period | undefined;

    constructor(calendar: Calendar, now: Date)
    {
        this.calendar = calendar;
        this.load(now);
    }

    /**
     * Resets the stream and loads the period of the given date
     * @param date Date of the currently-happening date
     */
    public load(date: Date): void
    {
        let schedule = this.calendar.get(date);

        while (schedule.periods.length <= 0)
        {
            schedule = this.calendar.get(yesterdayOf(schedule.day));
        }

        this.current = new Period(0, schedule, this.calendar.correction);
        this.nextOf(this.current);
    }

    /**
     * Get the current period
     * @param date If provided, do a smart increment to match the date
     */
    public get(date: Date | undefined = undefined): Period
    {
        if (!date) // Return with no re-assignment
        {
            if (!this.current)
            {
                throw new Error("err_null_current_period");
            }
            return this.current;
        }

        while (this.current && this.current.next && this.current.next.start < date)
        {
            this.current = this.current.next;
            this.nextOf(this.current);
        }

        if (!this.current)
        {
            throw new Error("err_null_current_period");
        }
        return this.current;
    }

    /**
     * Get the period after the target period and assign it if necessary
     * @param period Target period
     */
    public nextOf(period: Period): Period
    {
        if (period.next !== undefined) // Already calculated
        {
            return period.next;
        }

        if (period.index < period.schedule.periods.length - 1) // Same day
        {
            return period.next = new Period(period.index + 1, period.schedule, this.calendar.correction);
        }

        let schedule = this.calendar.get(tomorrowOf(period.schedule.day));
        while (schedule.periods.length <= 0) // Tomorrow(++)
        {
            schedule = this.calendar.get(tomorrowOf(schedule.day));
        }

        return period.next = new Period(0, schedule, this.calendar.correction);
    }
}

