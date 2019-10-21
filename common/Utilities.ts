export default class Utilities {
    private readonly possibleGreetings = [
        "A dashboard for all things lahs",
        "Made in two weeks!",
        "We're like bell.plus but better",
        "More creative than the Talon and New Media Lit",
        "Better than the school website",
        "Check your grades right in the app",
        "Powered by react",
        "import tensorflow",
        "We did not cost thousands of dollars to produce."
    ];

    selectGreeting() {
        return this.possibleGreetings[Math.floor(Math.random() * this.possibleGreetings.length)];
    };

    private Hi = () => {};
}
