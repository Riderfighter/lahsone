import React from "react";
import "../styles/NavigationBar.scss"

export class NavigationBar extends React.Component
{
    private selectedTab = 3; // 0-3
    private totalTabs = 4;

    private generateNavBar(): string {
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

        const baseheight = 80, topheight = 0;

        const ab = `M${(this.selectedTab - 0.5) * this.getTabSize()} ${baseheight} C${(this.selectedTab - 0.25) * this.getTabSize()} ${baseheight} ${this.selectedTab * this.getTabSize()} ${baseheight} ${this.selectedTab * this.getTabSize()} ${topheight}`;
        const bc = `L${(this.selectedTab + 1) * this.getTabSize()} ${topheight}`;
        const cd = `C${(this.selectedTab + 1) * this.getTabSize()} ${baseheight} ${(this.selectedTab+1.25) * this.getTabSize()} ${baseheight}  ${(this.selectedTab + 1.5) *  this.getTabSize()} ${baseheight}`;
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

                    {/** Button 1 */}
                    <rect fill="#F3F3F3" width={this.getTabSize()} height="25vh" y={80} filter="url(#NavBarUnselectedTab)"/>

                    {/** Button 2 */}
                    <rect fill="#F3F3F3" width={this.getTabSize()} height="25vh" y={80} x={this.getTabSize() * 1} filter="url(#NavBarUnselectedTab)"/>

                    {/** Button 3 */}
                    <rect fill="#F3F3F3" width={this.getTabSize()} height="25vh" y={80} x={this.getTabSize() * 2} filter="url(#NavBarUnselectedTab)"/>

                    {/** Button 4 */}
                    <rect fill="#F3F3F3" width={this.getTabSize()} height="25vh" y={80} x={this.getTabSize() * 3} filter="url(#NavBarUnselectedTab)"/>


                    {/** Selected Tab */}
                    <path d={this.generateNavBar()} fill="url(#NavBarGradient)"  onClick={() => console.log("Clicked!")}/>
                </svg>
            </div>
        );
    }
}
