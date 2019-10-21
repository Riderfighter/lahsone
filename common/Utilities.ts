export default class Utilities {
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
