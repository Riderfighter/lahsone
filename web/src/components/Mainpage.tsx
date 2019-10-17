import React, {Component} from 'react';
import Util from '../common/util';
import './styles/App.scss';


export class Mainpage extends Component
{
    private utilities = new Util();

    render()
    {
        return (
            <div className="app-body">
                <p className="app-message">
                    Welcome to <span className="logo-lahs">lahs</span><sup className="logo-one">one</sup>

                </p>
                <p className="app-description">
                    {this.utilities.selectGreeting()}
                </p>
            </div>
        );
    }
}
