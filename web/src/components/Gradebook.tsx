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
            insideofgradebook: (<div style={{display: "flex", alignItems: "center", flexFlow: "column"}}>
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
                </div>
                <h1>Please Patient Yourself.</h1></div>)
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

    renderGradebook() {
        return (
            <h1>
                Welcome {this.AeriesUtil.studentGradebook.currentStudent.name}.
            </h1>
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
