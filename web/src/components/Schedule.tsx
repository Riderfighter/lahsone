import React from "react";
import '../styles/Schedule.scss';

export class Schedule extends React.Component
{
    private angle = 20;
    private periods = ["Period 1", "Period 2", "Period 3"]

    render()
    {
        return (
            <div className="app-body">
                <div className="schedule-body">
                    <svg className="schedule-pie" height="100%" viewBox="-1 -1 22 22">
                        <filter id="SchedulePieShadow" width="180%" height="180%">
                            {/** see https://www.desmos.com/calculator/x6gt6cuc8g */}
                            <feDropShadow dx="0" dy="0" stdDeviation="1" floodOpacity="0.075"/>
                        </filter>
                        

                        {/** Percentage Pie */}
                        <circle r="10" cx="10" cy="10" fill="#9CC884" filter="url(#SchedulePieShadow)"/>
                        <circle r="5.1" cx="10" cy="10" fill="transparent" stroke="#F3F3F3" strokeWidth="10" strokeDasharray={(this.angle * Math.PI / 10) + " " + (Math.PI * 10)} transform="rotate(-90) translate(-20)" />
                    
                        {/** Time Left */}
                        <text x="10" y="10" fill="#111111" fontFamily="Karla" fontWeight="bold" fontSize="3" textAnchor="middle">
                            00:30:24
                        </text>

                        {/** Current Period */}
                        <text x="3.5" y="10.5" fill="#222222" fontFamily="Karla" fontWeight="bold" fontSize="1.5" alignmentBaseline="hanging">
                            Lunch
                        </text>

                        {/** Schedule Name */}
                        <text x="3.5" y="11.5" fill="#424242" fontFamily="Karla" fontSize="1" fontStyle="italic" alignmentBaseline="hanging">
                            Tutorial Schedule
                        </text>
                    </svg>  
                
                    <div className="schedule-periods">
                        {this.periods.map(p => <li key={p.toString()}>{p}</li>)}
                    </div>
                </div>             
            </div>
        );
    }
}