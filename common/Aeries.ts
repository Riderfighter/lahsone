import NodeRSA from 'node-rsa';
import {SHA256} from 'crypto-js';
import Base64 from "crypto-js/enc-base64";
import dateFormat from "dateformat";
import GradebookClass from "./Gradebook";

/**
 * Aeries Utilities a class to interface with Aeries.
 */
export default class AeriesUtilities {
    /**
     * Aeries Android pkcs8 RSA Private key
     */
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
    /**
     * Non-unique clientId for each release of the Aeries app
     */
    private readonly clientId = "q3C/7jHXNOSUKze1RfIgE4jOUpCxXqOQE7U8xfSbJED3Qbrl7aYd2DPldruo29YG6LgnO7AC83ktvqLryBGEdKc8zmmw2TrWCASkRcHxDlo=";
    /**
     * Non-unique Android app secret
     */
    private readonly androidRawSecret = "avP/Uv1WBE01Ki7UynbNDn5OtbBkLZdHfiWDQgb3O9eTpoRdzZoxnSCMDkEE74lS2r+aQnFVIq3wbNYMj/f02Ku6ZP2wt8LQFq+6LTi9au4=";
    /**
     * Platform of the app
     */
    private readonly platform = "android";
    /**
     * The type of app
     */
    private readonly appType = "PSP";
    /**
     * The type of user accessing the app
     */
    private readonly userType = "Student";
    /**
     * The format of the time to used in the hashing process
     * Aeries says its UTC but it's actually GMT
     */
    private readonly timeFormat = "GMT:yyyy-mm-dd hh:MM TT";
    public studentGradebook = new GradebookClass();
    private authToken = "";
    private authenticated = false;
    private email: string | null = window.localStorage.getItem("aeriesEmail");
    private password: string | null = window.localStorage.getItem("aeriesPassword");
    public hasCredentials = this.email !== null && this.password !== null;

    /**
     * Sets up Aeries.ts's RSA encryption scheme
     */
    constructor() {
        this.privKey.setOptions({encryptionScheme: "pkcs1", signingScheme: "pkcs1"});
    }

    /**
     * Generates the time unique secret key for authentication
     */
    public generateSecretKey() {
        let data = this.generateHash();
        return {
            secretKey: this.privKey.encryptPrivate(new Buffer(data.hash, "base64")).toString("base64"),
            date: data.date
        }
    }

    /**
     * Authenticates with Aeries to receive authentication data and authentication token
     * @param email The email of the user to be authenticated.
     * @param password The password of the user to be authenticated.
     */
    public authenticateAeries(email: string | null = this.email, password: string | null = this.password) {
        if (email == null || password == null)
            throw new Error("email or password MUST have a value.");
        const postBody = this.preparePostBody(email, password);
        return fetch("https://mvla.asp.aeries.net/student/mobileapi/v1/authentication", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: postBody
        }).then(r => r.json()).then(data => {
            if (data.hasOwnProperty("success")) {
                this.authenticated = false;
            } else {
                this.authToken = data.AccessToken;
                this.studentGradebook.setupStudent(data);
                this.authenticated = true;
                if (email !== this.email || password !== this.password) {
                    window.localStorage.setItem("aeriesEmail", email);
                    window.localStorage.setItem("aeriesPassword", password);
                }
                return this.getClassSummary();
            }
        });
    }

    /**
     * Generates the time unique sha256 hash via concatenating the Android secret and the current time.
     */
    private generateHash() {
        let currentData = dateFormat(new Date(), this.timeFormat);
        let sha256 = SHA256(this.androidRawSecret + currentData).toString(Base64);
        return {
            hash: sha256,
            date: currentData
        }
    }

    /**
     * Prepares the POST request's data.
     * @param email The email of the user to be authenticated.
     * @param password The password of the user to be authenticated.
     */
    private preparePostBody(email: string, password: string) {
        const secretHash = this.generateSecretKey();
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

    /**
     * Fetches the class summary JSON data
     */
    private getClassSummary() {
        if (this.authenticated) {
            return fetch(`https://mvla.asp.aeries.net/student/mobileapi/v1//student/${this.studentGradebook.currentStudent.studentid}/classsummary`, {
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${this.authToken}`
                }
            }).then(res =>
                res.json()
            ).then(data => {
                this.studentGradebook.setupClasses(data);
                return this.getGradebooks()
            })
        }
    }

    /**
     * Fetches gradebook information JSON data
     */
    private getGradebooks() {
        if (this.authenticated) {
            let listofpromises: Array<Promise<void>> = [];
            // @ts-ignore
            this.studentGradebook.currentStudent.classes.forEach(studentClass => {
                listofpromises.push(fetch(`https://mvla.asp.aeries.net/student/mobileapi/v1/20/student/${this.studentGradebook.currentStudent.studentid}/gradebooks/${studentClass.gradebooknumber}/${studentClass.termcode}`, {
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${this.authToken}`
                    }
                }).then(res => res.json()).then(data => {
                    this.studentGradebook.setupGradebook(data);
                }))
            });
            return Promise.all(listofpromises);
        }
    }
}
