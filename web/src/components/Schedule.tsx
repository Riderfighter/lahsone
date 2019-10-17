import React from "react";

export class Schedule extends React.Component
{
    private angle = 10;

    render()
    {
        return (
            <div className="app-body">
                <svg height="100%" viewBox="-1 -1 22 22">
                    <filter id="SchedulePieShadow" width="180%" height="180%">
                        {/** see https://www.desmos.com/calculator/x6gt6cuc8g */}
                        <feDropShadow dx="0" dy="0" stdDeviation="1" floodOpacity="0.04"/>
                    </filter>

                    <circle r="10" cx="10" cy="10" fill="#74A863" filter="url(#SchedulePieShadow)"/>
                    <circle r="5.1" cx="10" cy="10" fill="transparent" stroke="#F3F3F3" strokeWidth="10" strokeDasharray={(this.angle * Math.PI / 10) + " " + (Math.PI * 10)} transform="rotate(-90) translate(-20)" />
                </svg>
            </div>
        );
    }
}