/**
 * Parses a date
 * @param str String representation of the date
 * @param european Is the date in dd/mm/yyyy(european) or mm/dd/yyyy(American)
 */
export function parseDate(str: string, european: boolean = true): Date
{
    const parts = str.split("/");
    const year = parseInt(parts[2], 10);
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1;
    return european ? new Date(year, day, month) : new Date(year, month, day);
}

/**
 * Parses multiple dates separated by a given splitter
 * @param str String representation of the dates
 * @param splitter String which splits different dates
 * @param european Are the date(s) in dd/mm/yyyy(european) or mm/dd/yyyy(American)
 */
export function parseDates(str: string, splitter: string, european = true): Date[]
{
    return str.split(splitter).map(i => parseDate(i.trim(), european));
}

/**
 * Parse a date range
 * @param str String representation of the date range
 * @param splitter String which splits different dates
 * @param european Are the date(s) in dd/mm/yyyy(european) or mm/dd/yyyy(American)
 */
export function parseDateRange(str: string, splitter: string, european = true): DateRange
{
    const dates = parseDates(str, splitter, european);
    if (dates.length === 1)
    {
        dates[1] = new Date(dates[0]);
    }
    dates[0].setHours(0, 0, 0, 0);
    dates[dates.length - 1].setHours(23, 59, 59, 999);

    return {start: dates[0], end: dates[dates.length - 1]};
}

/**
 * Parses time in hh:mm format and assigns it to the given date
 * @param str Time to parse in hh:mm format
 * @param date Date to assign time to
 */
export function parseTime(str: string, date: Date | undefined): Date
{
    date = date !== undefined ? new Date(date) : new Date();

    const colon = str.indexOf(':');

    const hh = parseInt(str.substring(0, colon));
    const mm = parseInt(str.substring(colon + 1));

    date.setHours(hh, mm, 0, 0);

    return date;
}

/**
 * Textual representation of a weekday
 */
export type Weekday = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

/**
 * Get the weekday of a date
 * @param date The target date
 */
export function getWeekday(date: Date): Weekday
{
    const id: Weekday[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return id[date.getDay()];
}

/**
 * Is the given date in between or is the other two dates?
 * @param min Start of date range
 * @param max End of date range
 * @param value Date to check for range
 */
export function dateInRange(min: Date, max: Date, value: Date): boolean
{
    return value >= min && value <= max; 
}

/**
 * A range of time
 */
export type DateRange = { start: Date, end: Date };

/**
 * Get tomorrow's date
 * @param date Target date
 */
export function tomorrowOf(date: Date)
{
    date = new Date(date);
    date.setDate(date.getDate() +  1);

    return date;
}

/**
 * Get yesterday's date
 * @param date Target date
 */
export function yesterdayOf(date: Date)
{
    date = new Date(date);
    date.setDate(date.getDate() -  1);

    return date;
}

/**
 * Are two dates on the same day?
 * @param a First date
 * @param b Second date
 */
export function sameDay(a: Date, b: Date): boolean
{
    return a.getDate() === b.getDate()
        && a.getMonth() === b.getMonth()
        && a.getFullYear() === b.getFullYear();
}

/**
 * Subtracts b from a
 * @param a +Date
 * @param b -Date
 */
export function subtract(a: Date, b: Date): TimeSpan
{
    let ab = (a.getTime() - b.getTime()) / 1000;
    
    const hh = Math.floor(ab / 3600);
    ab = ab % 3600;

    const mm = Math.floor(ab / 60);
    ab = ab % 60;

    const ss = Math.round(ab);

    return new TimeSpan(hh, mm, ss);
}

/**
 * A span of time with second precision
 */
export class TimeSpan
{
    public h: number;
    public m: number;
    public s: number;

    constructor(h: number, m: number ,s: number)
    {
        this.h = h;
        this.m = m;
        this.s = s;
    }

    /**
     * Converts the time span to seconds
     */
    public toSeconds(): number
    {
        return this.h * 3600 + this.m * 60 + this.s;
    }

    toString()
    {
        return (this.h <= 0 ? "" : this.h + ":")
            + Math.max(this.m % 60, 0).toString().padStart(2, '0') + ":"
            + Math.max(this.s % 60, 0).toString().padStart(2, '0');
    }
}
