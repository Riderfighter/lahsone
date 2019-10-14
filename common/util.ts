export default class Util {
    private readonly possibleGreetings = [
        "A dashboard for all things lahs",
        "We're like bell.plus but better",
        "More creative than the Talon and New Media Lit",
        "Better than the school website",
        "Superior to LACoin",
        "Powered by react",
        "Something something machine learning",
        "import tensorflow"
    ];

    selectGreeting() {
        return this.possibleGreetings[Math.floor(Math.random() * this.possibleGreetings.length)];
    };
}
