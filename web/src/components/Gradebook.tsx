import React from "react";
import "../styles/Gradebook.scss";
import AeriesUtilities from "../common/Aeries";

export class Gradebook extends React.Component {
    private AeriesUtil = new AeriesUtilities();
    constructor(props: any) {
        super(props);
        this.loginTest = this.loginTest.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            show: false,
            showPopup: false,
            showGradebook: false,
            showtext: 'block',
            name: '',
            email: '',
            password: ''
        };
    }

    callbackFunction = (childData) => {
        this.setState({name: childData})
    };


    togglePopup() {
        if ((this.state as any).showtext == 'none') {
            console.log((this.state as any).showtext);
            this.setState({
                showPopup: !(this.state as any).showPopup,
                showtext: 'block'
            });
        } else {
            this.setState({
                showPopup: !(this.state as any).showPopup,
                showtext: 'none'
            });
        }

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    loginTest(event) {
        if (this.AeriesUtil.hasCredentials) {
            this.AeriesUtil.authenticateAeries().then(() => {
                console.log(this.AeriesUtil.studentGradebook.currentStudent);
            })
        } else {
            this.AeriesUtil.authenticateAeries((this.state as any).email, (this.state as any).password).then(() => {
                    console.log(this.AeriesUtil.studentGradebook.currentStudent);
                }
            );
        }
        event.preventDefault();
    }

    loginMenu() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <form onSubmit={this.loginTest}>
                        <input placeholder={"Email"} value={(this.state as any).email}
                               onChange={(e) => (this.setState({email: e.target.value}))}/>
                        <input placeholder={"Password"} type={'password'} value={(this.state as any).password}
                               onChange={(e) => (this.setState({password: e.target.value}))}/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        )
    }

    welcomeMenu() {
        return [
            <p className="app-message"> Welcome to the Gradebook </p>,
            <a className="button1" onClick={this.togglePopup.bind(this)}>Login to Aeries</a>
        ]
    }


    render() {
        return (
            <div className="app-body">
                {(this.state as any).showPopup ?
                    this.loginMenu() : this.welcomeMenu()
                }
            </div>
        );
    }
}
