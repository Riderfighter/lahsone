import React from "react";
import '../styles/Schedule.scss';
import Theme from "./Theme";
import SchedulePeriod from "../common/SchedulePeriod";
import { Strutil } from "../common/util";
import ScheduleDay from "../common/ScheduleDay";

export class Schedule extends React.Component
{
    private angle = 20;
    private periods = [
        new SchedulePeriod("Period 1", "8:10", "9:00"),
        new SchedulePeriod("Period 2", "9:05", "10:00"),
        new SchedulePeriod("Brunch", "10:00", "10:10"),
        new SchedulePeriod("Period 3", "10:15", "11:05"),
        new SchedulePeriod("Period 4", "11:10", "12:00"),
        new SchedulePeriod("Lunch", "12:00", "12:45"),
        new SchedulePeriod("Period 5", "12:50", "1:40"),
        new SchedulePeriod("Period 6", "1:45", "2:35"),
        new SchedulePeriod("Period 7", "2:40", "3:30")
    ];

    private day: ScheduleDay = new ScheduleDay("common/schedules/schedules.txt");

    private periodList(period: SchedulePeriod, index: number)
    {
        return (
            <li
                key={period.toString()}
                style={{background: index % 2 === 1 ? Theme.ScheduleHighlight : "inherit", display: 'flex'}}
            >
                {
                    /**Strutil.padEnd(period.time.start, 10, '\u00A0') + "→"
                    + Strutil.pad(period.name, 20, '\u00A0') + "→"
                    + Strutil.padStart(period.time.end, 10, '\u00A0')*/
                }
                <div style={{width: '20%', textAlign: 'center', color: Theme.Content}}>
                    {period.time.start}
                </div>
                <div style={{width: '60%', textAlign: 'center', color: Theme.Subtitle, fontWeight: 'bold'}}>
                    {period.name}
                </div>
                <div style={{width: '20%', textAlign: 'center', color: Theme.Content}}>
                    {period.time.end}
                </div>
            </li>
        );
    }

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
                        <circle r="10" cx="10" cy="10" fill={Theme.SchedulePie} filter="url(#SchedulePieShadow)"/>
                        <circle r="5.1" cx="10" cy="10" fill="transparent" stroke={Theme.Background} strokeWidth="10" strokeDasharray={(this.angle * Math.PI / 10) + " " + (Math.PI * 10)} transform="rotate(-90) translate(-20)" />
                    
                        {/** Time Left */}
                        <text x="10" y="10" fill={Theme.Title} fontFamily="Karla" fontWeight="bold" fontSize="3" textAnchor="middle">
                            00:30:24
                        </text>

                        {/** Current Period */}
                        <text x="3.5" y="10.5" fill={Theme.Subtitle} fontFamily="Karla" fontWeight="bold" fontSize="1.5" alignmentBaseline="hanging">
                            Lunch
                        </text>

                        {/** Schedule Name */}
                        <text x="3.5" y="11.5" fill={Theme.Content} fontFamily="Karla" fontSize="1" fontStyle="italic" alignmentBaseline="hanging">
                            Tutorial Schedule
                        </text>
                    </svg>  
                
                    <div className="schedule-periods">
                        {this.periods.map((p, i) => this.periodList(p, i))}
                    </div>
                </div>             
            </div>
        );
    }
}