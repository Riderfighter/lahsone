import React from "react";
import "../styles/Gradebook.scss";
import "../styles/AjaxSpinner.scss"
import AeriesUtilities from "../common/Aeries";
import update from 'immutability-helper';

export class Gradebook extends React.Component {
    private AeriesUtil = new AeriesUtilities();
    private spinner = (
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
        </div>);
    constructor(props: any) {
        super(props);
        this.loginToAeries = this.loginToAeries.bind(this);
        this.state = {
            showPopup: false,
            showtext: 'block',
            insideofgradebook: this.spinner
        };
    }

    componentDidMount(): void {
        if (this.AeriesUtil.hasCredentials) {
            this.AeriesUtil.authenticateAeries().then(() => {
                this.setState(update(this.state, {insideofgradebook: {$set: this.renderGradebook()}}));
            }).catch((e) => {
                console.log(e);
                this.setState(update(this.state, {
                    insideofgradebook: {
                        $set: <div className="app-message">School gradebook is currently closed.</div>
                    }
                }))
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
        this.setState(update(this.state, {insideofgradebook: {$set: this.spinner}}));
        try {
            this.AeriesUtil.authenticateAeries((this.state as any).email, (this.state as any).password).then(() => {
                    this.setState(update(this.state, {insideofgradebook: {$set: this.renderGradebook()}}));
                }
            ).catch((e) => {
                this.changeToLogin()
            });
        } catch (e) {
            this.changeToLogin()
        }
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
                        <input className="button1" type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        )
    }

    renderWelcomeMenu() {
        return (
            [
                <a className="button1" onClick={this.changeToLogin.bind(this)}>Login to Aeries</a>
            ]
        )
    }

    getColor(value) {
        let percentColors = [
            {pct: 0.5, color: {r: 0xff, g: 0x00, b: 0}},
            // {pct: 0.5, color: {r: 0xff, g: 0xff, b: 0}},
            {pct: 1.0, color: {r: 0x00, g: 0xff, b: 0}}
        ];
        let i = 1;
        for (i; i < percentColors.length - 1; i++) {
            if (value < percentColors[i].pct) {
                break;
            }
        }
        let lower = percentColors[i - 1];
        let upper = percentColors[i];
        let range = upper.pct - lower.pct;
        let rangePct = (value - lower.pct) / range;
        let pctLower = 1 - rangePct;
        let pctUpper = rangePct;
        let color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        let output = `rgba(${[color.r, color.g, color.b].join(',')}, 0.3)`;
        return output;
        // or output as hex if preferred
    }

    calcPercentage(Period, withPercent: boolean = false) {
        if (Period.Percent === 0 && Period.CurrentMark !== "") {
            let totalpoints = 0;
            let actualpoints = 0;
            Period.Assignments.forEach(assignment => {
                if (assignment.IsGraded) {
                    totalpoints += assignment.MaxScore;
                    actualpoints += assignment.Score;
                }
            });
            return !withPercent ? ((actualpoints / totalpoints) * 100).toFixed(1) : `${((actualpoints / totalpoints) * 100).toFixed(1)}%`;
        }
        if (Period.CurrentMark === "")
            return !withPercent ? undefined : "N/A";
        return !withPercent ? Period.Percent.toFixed(1) : `${Period.Percent.toFixed(1)}%`;
    }

    renderGradebook() {
        let gradelist: JSX.Element[] = [];
        for (let period of this.AeriesUtil.studentGradebook.currentStudent.ClassSummaryData!.ClassSummary) {
            // let color = () => {
            //     let percent = this.calcPercentage(period) / 100;
            //     if (percent !== undefined) {
            //         return this.getColor((this.calcPercentage(period) / 100).toFixed(1));
            //     }
            //     return "#FFF";
            // }
            gradelist.push(
                <li className="gradebook-entry"
                    style={{
                        // backgroundColor: color(),
                        backgroundColor: this.getColor((this.calcPercentage(period) / 100).toFixed(1)),
                        height: `calc(100%/${this.AeriesUtil.studentGradebook.currentStudent.ClassSummaryData!.ClassSummary.length})`,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <div style={{
                        justifySelf: "left",
                        width: "100%",
                        padding: "5px",
                        textAlign: "center"
                    }}>{period.GradeBookName}</div>
                    <div style={{
                        justifySelf: "center",
                        width: "100%",
                        padding: "5px",
                        textAlign: "center"
                    }}>{period.CurrentMark}</div>
                    <div style={{
                        justifySelf: "right",
                        width: "100%",
                        padding: "5px",
                        textAlign: "center"
                    }}>{this.calcPercentage(period, true)}</div>
                </li>
            )
        }
        return (
            <ul className="gradebook-list">
                {gradelist}
            </ul>
        );
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
