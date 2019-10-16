import React from "react";
import "../styles/NavigationBar.scss"
import { Link } from "react-router-dom";

export class NavigationBar extends React.Component
{
    private totalTabs = 4;
    private baseHeight = window.innerHeight / 15; // 53 on h: 800

    componentWillMount()
    {
        this.setSelectedTab(-2);
        console.log(window.innerHeight / 15)
    }

    public getSelectedTab(): number
    {
        var s:any = this.state;

        return s.selectedTab;
    }

    public setSelectedTab(i: number)
    {
        this.setState({ selectedTab: i});
    }

    private generateNavBar(): string
    {
        /*
              B-------C
              |       |
            A/         \D

            Move to: [a]
            Smooth to: [a->b, c->d]
            Line to: [b->c]
            Close path:  [d]

            This only generates the top bit, the rest is actual html buttons
        */

        const baseheight = this.baseHeight + 1/** Slightly more */, topheight = 0;

        const ab = `M${(this.getSelectedTab() - 0.5) * this.getTabSize()} ${baseheight} C${(this.getSelectedTab() - 0.25) * this.getTabSize()} ${baseheight} ${this.getSelectedTab() * this.getTabSize()} ${baseheight} ${this.getSelectedTab() * this.getTabSize()} ${topheight}`;
        const bc = `L${(this.getSelectedTab() + 1) * this.getTabSize()} ${topheight}`;
        const cd = `C${(this.getSelectedTab() + 1) * this.getTabSize()} ${baseheight} ${(this.getSelectedTab()+1.25) * this.getTabSize()} ${baseheight}  ${(this.getSelectedTab() + 1.5) *  this.getTabSize()} ${baseheight}`;
        const da = 'Z';

        return ab + bc + cd + da;
    }

    private getTabSize(): number
    {
        return window.innerWidth / this.totalTabs;
    }

    render()
    {
        return (
            <div>
                <svg version="1.1" width={window.innerWidth} height="20vh">
                    <defs>
                        {/** Selected tab gradient */}
                        <linearGradient id="NavBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%"   stopColor="#F3F3F300"/>
                            <stop offset="50%" stopColor="#F3F3F3"/>
                        </linearGradient>
                        
                        {/** Unselected tab shadow */}
                        <filter id="NavBarUnselectedTab" x="0" y="-1.4vh" width="100%" height="200%">
                            <feDropShadow stdDeviation="20" floodOpacity="0.2"/>
                        </filter>
                    </defs>

                    <rect width="100%" height="25vh" y={this.baseHeight} filter="url(#NavBarUnselectedTab)"/>

                    {/** Button 1 */}
                    <Link to="/Announcements" onClick={() => this.setSelectedTab(0)}>
                        <g>
                            <rect fill="#F3F3F3" width={this.getTabSize()} height="25vh" y={this.baseHeight}/>
                            
                            {/** Announcements Icon */}
                            <circle cx={this.getTabSize() * 0.5} cy={this.baseHeight * 2} r='3.75vh' fill='#7185C3' />
                        </g>
                    </Link>
                    {/** Button 2 */}
                    <Link to="/Schedule" onClick={() => this.setSelectedTab(1)}>
                        <g>
                            <rect fill="#F3F3F3" width={this.getTabSize()} height="25vh" y={this.baseHeight} x={this.getTabSize() * 1}/>
                        
                            {/** Bell Schedule Icon */}
                            <circle cx={this.getTabSize() * 1.5} cy={this.baseHeight * 2} r='3.75vh' fill='#74A863'/>
                        </g>
                    </Link>

                    {/** Button 3 */}
                    <Link to="/Gradebook" onClick={() => this.setSelectedTab(2)}>
                        <g>
                            <rect fill="#F3F3F3" width={this.getTabSize()} height="25vh" y={this.baseHeight} x={this.getTabSize() * 2}/>
                            
                            {/** Grades Icon */}
                            <circle cx={this.getTabSize() * 2.5} cy={this.baseHeight * 2} r='3.75vh' fill='#ECC460'/>
                        </g>
                    </Link>

                    {/** Button 4 */}
                    <Link to="/Appointments" onClick={() => this.setSelectedTab(3)}>
                        <g>
                            <rect fill="#F3F3F3" width={this.getTabSize()} height="25vh" y={this.baseHeight} x={this.getTabSize() * 3}/>
                            
                            {/** Appointments Icon */}
                            <circle cx={this.getTabSize() * 3.5} cy={this.baseHeight * 2} r='3.75vh' fill='#CB4B4D'/>
                        </g>
                    </Link>

                    {/** Selected Tab */}
                    <path d={this.generateNavBar()} fill="url(#NavBarGradient)"/>
                </svg>
            </div>
        );
    }
}
