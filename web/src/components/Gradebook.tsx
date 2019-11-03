import React from "react";
import "../styles/Gradebook.scss";
import "../styles/AjaxSpinner.scss"
import AeriesUtilities from "../common/Aeries";
import update from 'immutability-helper';

export class Gradebook extends React.Component {
    private AeriesUtil = new AeriesUtilities();

    constructor(props: any) {
        super(props);
        this.loginToAeries = this.loginToAeries.bind(this);
        this.state = {
            showPopup: false,
            showtext: 'block',
            insideofgradebook: (
                <div className="lds-spinner">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>)
        };
    }

    componentDidMount(): void {
        if (this.AeriesUtil.hasCredentials) {
            this.AeriesUtil.authenticateAeries().then(() => {
                this.setState(update(this.state, {insideofgradebook: {$set: this.renderGradebook()}}));
            });
        } else if (!(this.state as any).showPopup) {
            this.setState(update(this.state, {insideofgradebook: {$set: this.renderWelcomeMenu()}}));
        }
    }


    changeToLogin() {
        this.setState(update(this.state, {
            showPopup: {$set: !(this.state as any).showPopup,},
            showtext: {$set: 'none'},
            insideofgradebook: {$set: this.renderLoginMenu()}
        }));
    }

    loginToAeries(event) {
        this.AeriesUtil.authenticateAeries((this.state as any).email, (this.state as any).password).then(() => {
                this.setState(update(this.state, {insideofgradebook: {$set: this.renderGradebook()}}));
            }
        );
        event.preventDefault();
    }

    renderLoginMenu() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <form onSubmit={this.loginToAeries}>
                        <input placeholder={"Email"}
                               onChange={(e) => (this.setState({email: e.target.value}))}/>
                        <input placeholder={"Password"} type={'password'}
                               onChange={(e) => (this.setState({password: e.target.value}))}/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        )
    }

    renderWelcomeMenu() {
        return (
            [
                <p className="app-message"> Welcome to the Gradebook </p>,
                <a className="button1" onClick={this.changeToLogin.bind(this)}>Login to Aeries</a>
            ]
        )
    }

    getColor(value) {
        //value from 0 to 1
        var hue = (value * 100).toString(10);
        return ["hsla(", hue, ",100%,50%, 0.3)"].join("");
    }

    calcPercentage(Class, withPercent: boolean = false) {
        if (Class.gradepercent == 0 && Class.grade != "") {
            let totalpoints = 0;
            let actualpoints = 0;
            Class.gradebook.forEach(category => {
                category.assignments.forEach(assignment => {
                    if (assignment.isgraded) {
                        totalpoints += assignment.maxscore;
                        actualpoints += assignment.score;
                    }
                })
            });
            if (!withPercent)
                return ((actualpoints / totalpoints) * 100).toFixed(1);
            return `${((actualpoints / totalpoints) * 100).toFixed(1)}%`
        }
        if (Class.grade == "") {
            if (!withPercent)
                return;
            return "N/A"
        }
        if (!withPercent)
            return Class.gradepercent.toFixed(1);
        return `${Class.gradepercent.toFixed(1)}%`
    }

    renderGradebook() {
        return [
            <ul className="gradebook-list">
                {this.AeriesUtil.studentGradebook.currentStudent.classes.map((Class) => <li className="gradebook-entry"
                                                                                            style={{
                                                                                                backgroundColor: this.getColor((this.calcPercentage(Class) / 100).toFixed(1)),
                                                                                                height: `calc(100%/${this.AeriesUtil.studentGradebook.currentStudent.classes.length})`,
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center"
                                                                                            }}>
                    <div style={{justifySelf: "left", width: "100%", padding: "5px"}}>{Class.classname}</div>
                    <div style={{justifySelf: "center", width: "100%", padding: "5px"}}>{Class.grade}</div>
                    <div style={{
                        justifySelf: "right",
                        width: "100%",
                        padding: "5px"
                    }}>{this.calcPercentage(Class, true)}</div>
                </li>)}
            </ul>
        ];
    }


    render() {
        return (
            <div className="app-body">
                {
                    (this.state as any).insideofgradebook
                }
            </div>
        );
    }
}
