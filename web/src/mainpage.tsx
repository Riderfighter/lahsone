import React, {Component} from 'react';
import Util from './common/util';

export default class Mainpage extends Component {
    private utilities = new Util();

    render() {
        return (
            <div className="app-body">
                <p className="app-message">
                    Welcome to lahs<sup className="app-one">one</sup>
                </p>
                <p className="app-description">
                    {this.utilities.selectGreeting()}
                </p>
            </div>)
    }
}
