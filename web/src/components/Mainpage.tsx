import React, {Component} from 'react';
import Util from '../common/Utilities';
import Theme from "./Theme";

export class Mainpage extends Component
{
    private utilities = new Util();

    render()
    {
        return (
            <div className="app-body">
                <p className="app-message" style={{color: Theme.LogoSuperscript}}>
                    Welcome to <span className="logo-lahs" style={{color: Theme.Logo}}>lahs</span><sup className="logo-one" style={{color: Theme.LogoSuperscript}}>one</sup>

                </p>
                <p className="app-description" style={{color: Theme.Subtitle}}>
                    {this.utilities.selectGreeting()}
                </p>
            </div>
        );
    }
}
