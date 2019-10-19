export default class Util {
    private readonly possibleGreetings = [
        "A dashboard for all things lahs",
        "We're like bell.plus but better",
        "More creative than the Talon and New Media Lit",
        "Better than the school website",
        "Superior to LACoin",
        "Powered by react",
        "Something something machine learning",
        "import tensorflow",
        "Ad astra per aspera",
        "Downloading your personal information...",
        "Zucc is coming for your data!!",
        "We did not cost thousands of dollars to produce."
    ];

    selectGreeting() {
        return this.possibleGreetings[Math.floor(Math.random() * this.possibleGreetings.length)];
    };

    private Hi = () => {};
}

export class Strutil
{
    public static replaceAll(str: string, find: string, replace: string): string
    {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    public static pad(str: string, spaces: number, char: string): string
    {
        return Strutil.replaceAll(str.padStart((str.length + spaces) / 2, '`').padEnd(spaces, '`'), '`', char);
    }

    public static padStart(str: string, spaces: number, char: string): string
    {
        return Strutil.replaceAll(str.padStart(spaces, '`'), '`', char);
    }

    public static padEnd(str: string, spaces: number, char: string): string
    {
        return Strutil.replaceAll(str.padEnd(spaces, '`'), '`', char);
    }
}
