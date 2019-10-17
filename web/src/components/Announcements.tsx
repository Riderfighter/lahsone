import React from "react";
import '../styles/Announcements.scss';


export class Announcements extends React.Component
{
    render()
    {
        return (
            <div className="app-body">
                <div className="announcement-body">
                    <h1 className="announcement-title">
                        THIS WEEK'S ANNOUNCEMENTS
                    </h1>
                    <p className="announcement-message">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        );
    }
}
