import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import './App.css';
import Mainpage from "./mainpage";

const App: React.FC = () => {
    return (
        <Router>
            <section className="flex-section">
                <Switch>
                    <Route exact path="/">
                        <Mainpage/>
                    </Route>
                    <Route path="/Announcements">
                        <div className="app-body">
                            <p className="app-message">
                                Soon to be Announcements
                            </p>
                        </div>
                    </Route>
                    <Route path="/Schedule">
                        <div className="app-body">
                            <p className="app-message">
                                Soon to be the Schedule
                            </p>
                        </div>
                    </Route>
                    <Route path="/Gradebook">
                        <div className="app-body">
                            <p className="app-message">
                                Soon to be the Gradebook
                            </p>
                        </div>
                    </Route>
                    <Route path="/Appointments">
                        <div className="app-body">
                            <p className="app-message">
                                Soon to be the Tutorial Appointments
                            </p>
                        </div>
                    </Route>
                </Switch>
                <ul className="nav-bar">
                    <li>
                        <Link to="/Announcements">
                            Announcements
                        </Link>
                    </li>
                    <div className="navbar-scroll-divider"/>
                    <li>
                        <Link to="/Schedule">
                            Bell Schedule
                        </Link>
                    </li>
                    <div className="navbar-scroll-divider"/>
                    <li>
                        <Link to="/Gradebook">
                            Gradebook
                        </Link>
                    </li>
                    <div className="navbar-scroll-divider"/>
                    <li>
                        <Link to="/Appointments">
                            Tutorial appointment
                        </Link>
                    </li>
                </ul>
            </section>
        </Router>
    );
};

export default App;
