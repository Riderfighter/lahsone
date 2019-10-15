import React from "react";
import "./styles/NavigationBar.css"

export class NavigationBar extends React.Component<React.SVGProps<SVGSVGElement>>
{
    private selectedTab = 2; // 0-3
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

        const tabSize = window.innerWidth / this.totalTabs;

        const baseheight = 0.5 * tabSize, topheight = 0;

        const ab = `M${(this.selectedTab - 0.5) * tabSize} ${baseheight} C${(this.selectedTab - 0.25) * tabSize} ${baseheight} ${this.selectedTab * tabSize} ${baseheight} ${this.selectedTab * tabSize} ${topheight}`;
        const bc = `L${(this.selectedTab + 1) * tabSize} ${topheight}`;
        const cd = `C${(this.selectedTab + 1) * tabSize} ${baseheight} ${(this.selectedTab+1.25) * tabSize} ${baseheight}  ${(this.selectedTab + 1.5) *  tabSize} ${baseheight}`;
        const da = 'Z';

        return ab + bc + cd + da;
    }

    render()
    {
        return (
            
            <svg version="1.1" width={window.innerWidth} height="10vh">
                <defs>
                    <linearGradient id="navBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stop-color="#F3F3F300"/>
                    <stop offset="100%" stop-color="#F305F3"/>
                    </linearGradient>
                </defs>
                <path d={this.generateNavBar()} fill="url(#navBarGradient)"/>
            </svg>
        );
    }
}
