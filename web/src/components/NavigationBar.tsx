import React from "react";
import "../styles/NavigationBar.scss"

export class NavigationBar extends React.Component
{
    private totalTabs = 4;

    componentWillMount()
    {
        this.setSelectedTab(0);

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

        const baseheight = 80 + 1/** Slightly more */, topheight = 0;

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
                <svg version="1.1" width={window.innerWidth} height="30vh">
                    <defs>
                        {/** Selected tab gradient */}
                        <linearGradient id="NavBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%"   stopColor="#F3F3F300"/>
                            <stop offset="100%" stopColor="#F3F3F3"/>
                        </linearGradient>
                        
                        {/** Unselected tab shadow */}
                        <filter id="NavBarUnselectedTab" x="0" y="-1.4vh" width="100%" height="200%">
                            <feDropShadow stdDeviation="20" floodOpacity="0.4"/>
                        </filter>
                    </defs>

                    <rect width="100%" height="25vh" y={80} filter="url(#NavBarUnselectedTab)"/>

                    {/** Button 1 */}
                    <rect onClick={() => this.setSelectedTab(0)} fill="#F3F3F3" width={this.getTabSize()} height="25vh" y={80}/>

                    {/** Button 2 */}
                    <rect onClick={() => this.setSelectedTab(1)} fill="#F3F3F3" width={this.getTabSize()} height="25vh" y={80} x={this.getTabSize() * 1}/>

                    {/** Button 3 */}
                    <rect onClick={() => this.setSelectedTab(2)} fill="#F3F3F3" width={this.getTabSize()} height="25vh" y={80} x={this.getTabSize() * 2}/>

                    {/** Button 4 */}
                    <rect onClick={() => this.setSelectedTab(3)} fill="#F3F3F3" width={this.getTabSize()} height="25vh" y={80} x={this.getTabSize() * 3}/>


                    {/** Selected Tab */}
                    <path d={this.generateNavBar()} fill="url(#NavBarGradient)"/>
                </svg>
            </div>
        );
    }
}
