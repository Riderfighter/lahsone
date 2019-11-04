export default class LAHSAnnouncements {
    private authToken = "6bb587c76da746b8b8950082c114a17f";

    public getAnnouncements() {
        return fetch(`https://announcements.catapultcms.com/Connector/Post/Search/!!blank!!/!!blank!!/!!all!!/!!all!!/797/!!all!!/!!all!!/!!all!!/!!current!!/5/false/false?timestamp=${this.getDate()}`, {
            headers: {
                "CatapultHeaderAuthToken": this.authToken
            }
        }).then(data => data.json())
    }

    private getDate() {
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
}
