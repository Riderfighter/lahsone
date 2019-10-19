import NodeRSA from 'node-rsa';
import Crypto from 'crypto';
import dateFormat from "dateformat";

export default class AeriesUtilities {
    private privKey = new NodeRSA('-----BEGIN PRIVATE KEY-----\n' +
        'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKb3cylU/ZHrAG7+\n' +
        'OI8d/ja9rAWycnkmPf9XDio1xEsbVaMLeNn7Znck1mb3h2VKino5mP9yulKgX/VW\n' +
        'nQ67R1OfAESZEa8xq3papy5h6D63he9nnhDmeAXVh8Ls/W9KLBzni3oOHKAbKAue\n' +
        'T/E+/pyRx1Iyl5kbG7wYopfuEUAZAgMBAAECgYBlRbwVOtbe1eKacBpQPIoAHAWm\n' +
        'IvmqIBcEtIID+j7Iq5jC32d7GDCrXa2qIMOAHblmr17sumLnUR1DCzkSQWfeBnkB\n' +
        'TBIQr0kL3qpT3VsPIdOTtjqETdq2TpqJwvrT+KT62868nS9bI9UG8fEY+q90ftxU\n' +
        '6AuXqXS5tw5TuSoHbQJBAMSULt09U+hKDI5GmG6P9Kx0r1DXpx4cz/qxZwhJqXm7\n' +
        'HxCeiNT+0neZoaJOPipO7nen8Y5mj9nPkPa0KD1pu58CQQDZb8oYKKO96Md9x/pc\n' +
        'K7OLpu8S6ny20DnLTGP8N7ezcSST+8IZ+pFErglJYlBzxXjhDTYlsS0vG7SpfRKj\n' +
        '9mlHAkBEwHLXi+BxyJw1knkzigOP4UuDobjgLkGLM0qOunych5Zo0JmYrPrdO40t\n' +
        'X+IcF/kNPl6caEB9dDwGHKJKQFWPAkEA1vR58Po0LelzVjidnAMkA5prXOLtmfku\n' +
        'OXnymoQmmkHvLFDGKdKZTDFVQvPrnxgIkUvzTL3kcl7McoYQKIHQvwJAZlcPXFfo\n' +
        '3BfMRITnIlo1E3CWprW62TT8+zwaBLk+9Wo/VznkKYM6BTBiic0V17DiHXwD9ZZb\n' +
        '1tN3QE+jLVyztA==\n' +
        '-----END PRIVATE KEY-----', 'pkcs8-private-pem');
    private readonly clientId = "q3C/7jHXNOSUKze1RfIgE4jOUpCxXqOQE7U8xfSbJED3Qbrl7aYd2DPldruo29YG6LgnO7AC83ktvqLryBGEdKc8zmmw2TrWCASkRcHxDlo=";
    private readonly androidRawSecret = "avP/Uv1WBE01Ki7UynbNDn5OtbBkLZdHfiWDQgb3O9eTpoRdzZoxnSCMDkEE74lS2r+aQnFVIq3wbNYMj/f02Ku6ZP2wt8LQFq+6LTi9au4=";
    private readonly platform = "android";
    private readonly appType = "PSP";
    private readonly userType = "Student";
    private readonly timeFormat = "GMT:yyyy-mm-dd hh:MM TT";

    constructor() {
        this.privKey.setOptions({encryptionScheme: "pkcs1", signingScheme: "pkcs1"})
    }

    public getNewSecret() {
        let data = this.getSecretHash();
        return {
            secretKey: this.privKey.encryptPrivate(new Buffer(data.hash, "base64")).toString("base64"),
            date: data.date
        }
    }

    private getSecretHash() {
        let sha256 = Crypto.createHash("sha256");
        let currentData = dateFormat(new Date(), this.timeFormat);
        sha256.update(this.androidRawSecret + currentData);
        return {
            hash: sha256.digest().toString("base64"),
            date: currentData
        }
    }

    public authenticateAeries(email: string, password: string) {
        const postBody = this.preparePostBody(email, password);
        fetch("https://mvla.asp.aeries.net/student/mobileapi/v1/authentication", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: postBody
        }).then(r => console.log(r.text()));
    }

    private preparePostBody(email: string, password: string) {
        const secretHash = this.getNewSecret();
        let details = {
            "AppType": this.appType,
            "ClientId": this.clientId,
            "DateTimeStamp": secretHash.date,
            "Password": password,
            "Platform": this.platform,
            "SecretKey": secretHash.secretKey,
            "UserName": email,
            "UserType": this.userType
        };
        return new URLSearchParams(details);
    }
}
