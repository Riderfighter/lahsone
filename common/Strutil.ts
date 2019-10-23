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

/**
 * Formats a string with format $i where i is the zero-based index in args
 * @param str String to format
 * @param args Arguments to use when formatting the string
 */
export function format(str: string, ...args: object[]): string
{
    for (let i = 0; i < args.length; i++)
    {
        str = replaceAll(str, `$${i}`, args[i].toString());
    }

    return str;
}

/**
 * A variation of the format function which takes a function rather than a replace argument
 * @param str String to format
 * @param replace Replace function which takes in i in $i, where i is a deci- integer
 */
export function format2(str: string, replace: (n: number) => string): string
{
    let i = 0;
    while (i < str.length)
    {
        if (str.charAt(i) === '$') // Find tokens
        {
            let numstr = '';
            for (let j = i + 1; j < str.length; j++) // Find the number
            {
                const c = str.charAt(j);
                if (c < '0' || c > '9') { break; }
                numstr += c;
            }

            const num = parseInt(numstr);
            const ret = replace(num); // Call return function with token num

            str = str.substring(0, i) + ret + str.substring(i + ret.length);
        }
        i++;
    }

    return str;
}