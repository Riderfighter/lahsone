import React from "react";
import "../styles/NavigationBar.scss"
import {Link} from "react-router-dom";
import "./Theme";
import Theme from "./Theme";

export class NavigationBar extends React.Component
{
    private totalTabs = 3;

    private static instance: NavigationBar;

    // UNSAFE_componentWillMount()
    // {
    //     NavigationBar.instance = this;

    //     NavigationBar.setSelectedTab(-2);
    //     this.baseHeight = window.innerHeight / 15;
    // }

    constructor(props: Readonly<{}>)
    {
        super(props);
        NavigationBar.instance = this;
        this.state = {
            selectedTab: -2,
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    componentDidMount()
    {
        NavigationBar.instance = this;
        NavigationBar.setSelectedTab(-2);

        window.addEventListener('resize', () =>
        {
            this.setState(state =>
            {
                return {
                    selectedTab: (state as any).selectedTab,
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            })
        });
    }

    private baseHeight(): number
    {
        return (this.state as any).height / 15;
    }

    public static getSelectedTab(): number
    {
        var s:any = this.instance.state;

        return s.selectedTab;
    }

    public static setSelectedTab(i: number)
    {
        this.instance.setState(state =>
            {
                return { selectedTab: i }
            }
        );
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

        const baseheight = this.baseHeight() + 1/** Slightly more */, topheight = 0;

        const ab = `M${(NavigationBar.getSelectedTab() - 0.5) * this.getTabSize()} ${baseheight} C${(NavigationBar.getSelectedTab() - 0.25) * this.getTabSize()} ${baseheight} ${NavigationBar.getSelectedTab() * this.getTabSize()} ${baseheight} ${NavigationBar.getSelectedTab() * this.getTabSize()} ${topheight}`;
        const bc = `L${(NavigationBar.getSelectedTab() + 1) * this.getTabSize()} ${topheight}`;
        const cd = `C${(NavigationBar.getSelectedTab() + 1) * this.getTabSize()} ${baseheight} ${(NavigationBar.getSelectedTab()+1.25) * this.getTabSize()} ${baseheight}  ${(NavigationBar.getSelectedTab() + 1.5) *  this.getTabSize()} ${baseheight}`;
        const da = 'Z';

        return ab + bc + cd + da;
    }

    private getTabSize(): number
    {
        return window.innerWidth / this.totalTabs;
    }

    render()
    {
        if (NavigationBar.instance === undefined)
        {
            NavigationBar.instance = this;
            NavigationBar.setSelectedTab(-2);
        }

        return (
            <svg version="1.1" width={(this.state as any).width} height={(this.state as any).height * 0.2}
                 style={{position: "fixed", bottom: "-3px", background: Theme.Background}}>
                <defs>
                    {/** Selected tab gradient */}
                    <linearGradient id="NavBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={Theme.Background + "00"} opacity="0%"/>
                        <stop offset="50%" stopColor={Theme.Background}/>
                    </linearGradient>

                    {/** Unselected tab shadow */}
                    <filter id="NavBarUnselectedTab" x="0" y="-1.5vh" width={(this.state as any).width} height="300%">
                        {/** see https://www.desmos.com/calculator/x6gt6cuc8g */}
                        <feDropShadow stdDeviation={Math.sqrt(0.431506 * window.innerHeight) + 1.30962}
                                      floodOpacity="0.075"/>
                    </filter>
                </defs>

                <rect fill={Theme.Background} width={(this.state as any).width} height="25vh" y={this.baseHeight()}
                      filter="url(#NavBarUnselectedTab)"/>

                {/** Button 1 */}
                <Link to="/Announcements" onClick={() => NavigationBar.setSelectedTab(0)}>
                    <g>
                        <rect fill={Theme.Background} width={this.getTabSize()} height="25vh" y={this.baseHeight()}/>

                        {/** Announcements Icon */}
                        <circle cx={this.getTabSize() * 0.5} cy={this.baseHeight() * 2} r='3.75vh' fill='#7185C3'/>
                    </g>
                </Link>
                {/** Button 2 */}
                <Link to="/Schedule" onClick={() => NavigationBar.setSelectedTab(1)}>
                    <g>
                        <rect fill={Theme.Background} width={this.getTabSize()} height="25vh" y={this.baseHeight()}
                              x={this.getTabSize() * 1}/>

                        {/** Bell Schedule Icon */}
                        <circle cx={this.getTabSize() * 1.5} cy={this.baseHeight() * 2} r='3.75vh' fill='#74A863'/>
                    </g>
                </Link>

                {/** Button 3 */}
                <Link to="/Gradebook" onClick={() => NavigationBar.setSelectedTab(2)}>
                    <g>
                        <rect fill={Theme.Background} width={this.getTabSize()} height="25vh" y={this.baseHeight()}
                              x={this.getTabSize() * 2}/>

                        {/** Grades Icon */}
                        <circle cx={this.getTabSize() * 2.5} cy={this.baseHeight() * 2} r='3.75vh' fill='#ECC460'/>
                    </g>
                </Link>

                {/** Button 4 */}
                {/*<Link to="/Appointments" onClick={() => NavigationBar.setSelectedTab(3)}>*/}
                {/*    <g>*/}
                {/*        <rect fill={Theme.Background} width={this.getTabSize()} height="25vh" y={this.baseHeight()}*/}
                {/*              x={this.getTabSize() * 3}/>*/}

                {/*        /!** Appointments Icon *!/*/}
                {/*        <circle cx={this.getTabSize() * 3.5} cy={this.baseHeight() * 2} r='3.75vh' fill='#CB4B4D'/>*/}
                {/*    </g>*/}
                {/*</Link>*/}

                {/** Selected Tab */}
                <path d={this.generateNavBar()} fill="url(#NavBarGradient)"/>
            </svg>
        );
    }
}
