import React from "react";

export class Schedule extends React.Component
{
    private angle = 20;

    render()
    {
        return (
            <div className="app-body">
                <svg height="100%" viewBox="-1 -1 22 22">
                    <filter id="SchedulePieShadow" width="180%" height="180%">
                        {/** see https://www.desmos.com/calculator/x6gt6cuc8g */}
                        <feDropShadow dx="0" dy="0" stdDeviation="1" floodOpacity="0.075"/>
                    </filter>
                    

                    {/** Percentage Pie */}
                    <circle r="10" cx="10" cy="10" fill="#9CC884" filter="url(#SchedulePieShadow)"/>
                    <circle r="5.1" cx="10" cy="10" fill="transparent" stroke="#F3F3F3" strokeWidth="10" strokeDasharray={(this.angle * Math.PI / 10) + " " + (Math.PI * 10)} transform="rotate(-90) translate(-20)" />
                
                    {/** Time Left */}
                    <text x="10" y="10" fill="#111111" fontFamily="Karla" fontWeight="bold" fontSize="3" textAnchor="middle">
                        30:00:00
                    </text>

                    {/** Current Period */}
                    <text x="3.5" y="10.5" fill="#222222" fontFamily="Karla" fontWeight="bold" fontSize="1.5" alignmentBaseline="hanging">
                        Period -1
                    </text>

                    {/** Schedule Name */}
                    <text x="3.5" y="11.5" fill="#424242" fontFamily="Karla" fontSize="1" fontStyle="italic" alignmentBaseline="hanging">
                        Normal Schedule
                    </text>
                </svg>               
            </div>
        );
    }
}