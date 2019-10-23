import React from "react";
import "../styles/Gradebook.scss";
import '../styles/Gradebook.scss';
import AeriesUtilities from "../common/Aeries";

export class Gradebook extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            showPopup: false
        };
    }

    togglePopup() {
        this.setState({
            showPopup: !(this.state as any).showPopup
        });
    }

    render()
    {
        return (
            <div className="app-body">
                <p className="app-message">
                    Soon to be the Gradebook
                </p>
                <a className="button1" onClick={this.togglePopup.bind(this)}>Login to Aeries</a>
                {(this.state as any).showPopup ?
                    <Popup
                    />
                    : null
                }
            </div>
        );
    }
}

class Popup extends React.Component {
    state = {
        email: '',
        password: ''
    }
    private AeriesUtil = new AeriesUtilities();
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.loginTest = this.loginTest.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }

    loginTest(event){
        alert((this.state as any).email);
        this.AeriesUtil.authenticateAeries((this.state as any).email, (this.state as any).password);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    {/*<h1>{(this.props as any).text}</h1>*/}
                    {/*<button onClick={(this.props as any).closePopup}>close me</button>*/}
                    {/*<h1>{(this.state as any).email}</h1>*/}
                    <form onSubmit={this.loginTest}>
                        <input placeholder={"email"} value={(this.state as any).email} onChange={(e) => (this.setState({email: e.target.value}))}/>
                        <input placeholder={"Password"} type={'password'} value={(this.state as any).password} onChange={(e) => (this.setState({password: e.target.value}))}/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}
