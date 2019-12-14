export default class LAHSAnnouncements {
    private authToken = "6bb587c76da746b8b8950082c114a17f";

    private static getDate() {
        let padStr = (i) => {
            return (i < 10) ? "0" + i : "" + i;
        };
        let temp = new Date();
        return padStr(temp.getFullYear()) +
            padStr(1 + temp.getMonth()) +
            padStr(temp.getDate()) +
            padStr(temp.getHours()) +
            padStr(temp.getMinutes()) +
            padStr(temp.getSeconds())
    }

    private static getDay() {
        const monthArray: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let temp = new Date();
        return encodeURI(`${monthArray[temp.getMonth() - 1]} ${temp.getDay()}, ${temp.getFullYear()}`);
    }

    public getAnnouncements() {
        return fetch(`https://announcements.catapultcms.com/Connector/Post/PagedSearch/1/!!blank!!/!!blank!!/!!all!!/!!all!!/802/!!all!!/!!all!!/!!all!!/${LAHSAnnouncements.getDay()}/10/false/false?timestamp=${LAHSAnnouncements.getDate()}`, {
            headers: {
                "CatapultHeaderAuthToken": this.authToken
            }
        }).then(data => data.json())
    }
}
