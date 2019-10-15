import React from "react";
import "./styles/NavigationBar.css"

export class NavigationBar extends React.Component<React.SVGProps<SVGSVGElement>>
{
    render()
    {
        return (
            <svg version="1.1" width={window.innerWidth} height={window.innerWidth/8}>
                <rect width="100%" height="100%" fill="red"/>
            </svg>
        );
    }
}