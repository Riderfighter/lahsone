/**
 * Parses a dd/mm/yyyy date
 * @param str String representation of the date in dd/mm/yyyy format
 */
export function parseDate(str: string): Date
{
    const slash1 = str.indexOf('/');
    const slash2 = str.indexOf('/', slash1 + 1);

    const dd = parseInt(str.substring(0, slash1));
    const mm = parseInt(str.substring(slash1 + 1, slash2));
    const yyyy = parseInt(str.substring(slash2 + 1));

    return new Date(yyyy, mm, dd);
}

/**
 * Parses multiple dates of format dd/mm/yyyy separated by a given splitter
 * @param str String representation of the dates in dd/mm/yyyy {separator} dd/mm/yyyy...
 * @param splitter String which splits different dates
 */
export function parseDates(str: string, splitter: string): Date[]
{
    return str.split(splitter).map(i => parseDate(i.trim()));
}

/**
 * Parses time in hh:mm format and assigns it to the given date
 * @param str Time to parse in hh:mm format
 * @param date Date to assign time to
 */
export function parseTime(str: string, date: Date | undefined): Date
{
    date = date !== undefined ? new Date(date) : new Date();

    const colon = str.indexOf(':');

    const hh = parseInt(str.substring(0, colon));
    const mm = parseInt(str.substring(colon + 1));

    date.setHours(hh, mm, 0, 0);

    return date;
}

/**
 * Textual representation of a weekday
 */
export type Weekday = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

/**
 * Get the weekday of a date
 * @param date The target date
 */
export function getWeekday(date: Date): Weekday
{
    const id: Weekday[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return id[date.getDay()];
}

/**
 * Is the given date in between or is the other two dates?
 * @param min Start of date range
 * @param max End of date range
 * @param value Date to check for range
 */
export function dateInRange(min: Date, max: Date, value: Date): boolean
{
    return value >= min && value <= max; 
}

/**
 * Get tomorrow's date
 * @param date Target date
 */
export function tomorrowOf(date: Date)
{
    date = new Date(date);
    date.setDate(date.getDate() +  1);

    return date;
}

/**
 * Get yesterday's date
 * @param date Target date
 */
export function yesterdayOf(date: Date)
{
    date = new Date(date);
    date.setDate(date.getDate() -  1);

    return date;
}