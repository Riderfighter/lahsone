/* Dependencies */
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
/* Styles */
import '../styles/App.scss';
/* Components */
import {Mainpage} from "./Mainpage";
import {Logo} from './Logo';
import {NavigationBar} from './NavigationBar';
import {Announcements} from './Announcements';
import {Schedule} from './Schedule';
import {Gradebook} from './Gradebook';
import {Appointments} from './Appointments';
import Theme from './Theme';

const App: React.FC = () => {
    return (
        <div style={{background: Theme.Background, margin: "0 0 0 0"}}>
            <Router>
                <Logo/>
                <section>
                    <Switch>
                        <Route exact path="/">
                            <Mainpage/>
                        </Route>
                        <Route path="/Announcements">
                            <Announcements/>
                        </Route>
                        <Route path="/Schedule">
                            <Schedule/>
                        </Route>
                        <Route path="/Gradebook">
                            <Gradebook/>
                        </Route>
                        <Route path="/Appointments">
                            <Appointments/>
                        </Route>
                    </Switch>
                </section>
                <NavigationBar/>
            </Router>
        </div>
    );
};

export default App;
