import Period from './Period';
import { Weekday, getWeekday, parseDates, dateInRange, tomorrowOf, yesterdayOf } from './Dutil';
import { formalize } from './Strutil';

export default class PeriodStream
{
    private calendar: Calendar;
    private schedules: Schedule[];

    private current: Period | undefined;

    constructor(calendar: Calendar, schedules: Schedule[], date: Date | undefined = undefined)
    {
        this.calendar = calendar;
        this.schedules = schedules;

        if (date !== undefined)
        {
            this.load(date);
        }
    }

    /**
     * Resets the stream and loads the period of the given date
     * @param date Date of the currently-happening date
     */
    public load(date: Date): void
    {
        let schedule = this.getSchedule(date);

        while (schedule.periods.length <= 0)
        {
            schedule = this.getSchedule(yesterdayOf(schedule.date))
        }

        this.current = new Period(0, schedule);
        this.nextOf(this.current);
    }

    /**
     * Get the current period
     * @param date If provided, do a smart increment to match the date
     */
    public get(date: Date | undefined = undefined): Period
    {
        if (!date) // Return with no re-assignment
        {
            if (!this.current)
            {
                throw new Error("err_null_current_period");
            }
            return this.current;
        }

        while (this.current && this.current.next && this.current.next.start < date)
        {
            this.current = this.current.next;
            this.nextOf(this.current);
        }

        if (!this.current)
        {
            throw new Error("err_null_current_period");
        }
        return this.current;
    }

    /**
     * Get the period after the target period and assign it if necessary
     * @param period Target period
     */
    public nextOf(period: Period): Period
    {
        if (period.next !== undefined) // Already calculated
        {
            return period.next;
        }

        if (period.index < period.schedule.periods.length - 1) // Same day
        {
            return period.next = new Period(period.index + 1, period.schedule);
        }

        let schedule = this.getSchedule(tomorrowOf(period.schedule.date));
        while (schedule.periods.length <= 0) // Tomorrow(++)
        {
            schedule = this.getSchedule(tomorrowOf(schedule.date));
        }

        return period.next = new Period(0, schedule);
    }

    /**
     * Reads the calendar and returns the schedule for the given date
     * @param date Date to look for a schedule 
     * @returns The schedule for the given date & name override
     */
    private getSchedule(date: Date): Schedule & { name: string, date: Date, offset: number }
    {
        let id: string;
        let name: string;

        // Normal
        const weekday = getWeekday(date);
        id = this.calendar.normal[weekday];
        name = `${formalize(weekday)} Schedule`;

        // Scan Overrides
        this.calendar.overrides.some(i => {
            const dates = parseDates(i.date, '-');

            if (!dateInRange(dates[0], dates[dates.length], date)) { return false; }

            id = i.id;
            name = i.name;

            return true;
        });

        const found = this.schedules.find(a => a.id === id);
        if (!found)
        {
            alert(`Schedule "${id}" wasn't found!`);
            throw new Error("err_schedule_not_found");
        }
        return { id: found.id, periods: found.periods, name: name, date: date, offset: parseInt(this.calendar.offset) };
    }
}

/**
 * Wrapper for the calendar type in input JSON files
 */
export type Calendar = {
    offset: string,
    normal: { [key in Weekday]: string },
    overrides: { date: string, id: string, name: string }[]
};

/**
 * Wrapper for a schedule in input JSON files
 */
export type Schedule = {
    id: string,
    periods: { name: string, start: string, type: string }[]
};
