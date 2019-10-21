/**
 * Replaces all instances of a string with another
 * @param str Target value
 * @param find String to find
 * @param replace String to replace with
 */
export function replaceAll(str: string, find: string, replace: string): string
{
    return str.replace(new RegExp(find, 'g'), replace);
}

/**
 * Formalize a string
 * @param str Target value
 * @param trim Should it be trimmed?
 * @param capitalize Should the first letter be capitalized?
 * @param period Should the string end with a period?
 */
export function formalize(str: string, trim = true, capitalize = true, period = false): string
{
    if (trim)
    {
        str = str.trim();
    }

    if (capitalize)
    {
        str = str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (period && str.charAt(str.length - 1) !== '.')
    {
        str = str + '.';   
    }

    return str;
}