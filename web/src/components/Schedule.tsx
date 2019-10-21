import React from "react";
import '../styles/Schedule.scss';
import Theme from "./Theme";
import SchedulePeriod from "../common/SchedulePeriod";
import ScheduleDay from "../common/ScheduleDay";
import Gradebook from "../common/Gradebook";

export class Schedule extends React.Component
{
    private today: ScheduleDay = new ScheduleDay("regular", "regular", new Date());
    private gradebook: Gradebook = new Gradebook();

    private periodList(period: SchedulePeriod, index: number)
    {
        if (period.type === 'passing')
        {
            return; // Skip passing
        }

        return (
            <li
                key={period.toString()}
                style={{background: index % 2 === 1 ? Theme.ScheduleHighlight : "inherit", display: 'flex'}}
            >
                <div style={{width: '20%', textAlign: 'center', color: Theme.Content}}>
                    {period.start.str}
                </div>
                <div style={{width: '60%', textAlign: 'center', color: Theme.Subtitle, fontWeight: 'bold'}}>
                    {period.getName(this.gradebook)}
                </div>
                <div style={{width: '20%', textAlign: 'center', color: Theme.Content}}>
                    {period.end.str}
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
                        <circle r="5.1" cx="10" cy="10" fill="transparent" stroke={Theme.Background} strokeWidth="10" strokeDasharray={(this.today.getPercentage(new Date()).percentage * Math.PI / 10) + " " + (Math.PI * 10)} transform="rotate(-90) translate(-20)" />
                    
                        {/** Time Left */}
                        <text x="10" y="10" fill={Theme.Title} fontFamily="Karla" fontWeight="bold" fontSize="3" textAnchor="middle">
                            {this.today.getPercentage(new Date()).left.getHours().toString().padStart(2, '0')}
                            :
                            {this.today.getPercentage(new Date()).left.getMinutes().toString().padStart(2, '0')}
                            :
                            {this.today.getPercentage(new Date()).left.getSeconds().toString().padStart(2, '0')}
                        </text>

                        {/** Current Period */}
                        <text x="3.5" y="10.5" fill={Theme.Subtitle} fontFamily="Karla" fontWeight="bold" fontSize="1.5" alignmentBaseline="hanging">
                            {this.today.getPercentage(new Date()).period.getName(this.gradebook)}
                        </text>

                        {/** Schedule Name */}
                        <text x="3.5" y="11.5" fill={Theme.Content} fontFamily="Karla" fontSize="1" fontStyle="italic" alignmentBaseline="hanging">
                            Tutorial Schedule
                        </text>
                    </svg>

                    <div className="schedule-periods">
                        {this.today.periods.filter(p => p.type !== 'passing').map((p, i) => this.periodList(p, i))}
                    </div>
                </div>
            </div>
        );
    }
}
