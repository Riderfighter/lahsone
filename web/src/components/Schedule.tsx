import React from "react";
import '../styles/Schedule.scss';
import Theme from "./Theme";
import Gradebook from "../common/Gradebook";
import PeriodStream from "../common/PeriodStream";

import LAHSSchedules from '../common/fetched/lahs-schedules.json';
import LAHSCalendar from '../common/fetched/lahs-calendar.json';
import { Stream } from "stream";
import Period from "../common/Period";

export class Schedule extends React.Component
{
    private periods: PeriodStream = new PeriodStream(LAHSCalendar, LAHSSchedules, new Date());
    private gradebook: Gradebook = new Gradebook();

    private periodList(period: Period, index: number)
    {
        return (
            <li
                key={period.toString()}
                style={{background: index % 2 === 1 ? Theme.ScheduleHighlight : "inherit", display: 'flex'}}
            >
                <div style={{width: '20%', textAlign: 'center', color: Theme.Content}}>
                    {period.start}
                </div>
                <div style={{width: '60%', textAlign: 'center', color: Theme.Subtitle, fontWeight: 'bold'}}>
                    {period.name}
                </div>
                <div style={{width: '20%', textAlign: 'center', color: Theme.Content}}>
                    {period.schedule.name}
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
                        <circle r="5.1" cx="10" cy="10" fill="transparent" stroke={Theme.Background} strokeWidth="10" strokeDasharray={(34 * Math.PI / 10) + " " + (Math.PI * 10)} transform="rotate(-90) translate(-20)" />
                    
                        {/** Time Left */}
                        <text x="10" y="10" fill={Theme.Title} fontFamily="Karla" fontWeight="bold" fontSize="3" textAnchor="middle">
                            {this.periods.get(new Date()).timeLeft(new Date()).getHours()}
                            :
                            {this.periods.get().timeLeft(new Date()).getMinutes()}
                            :
                            {this.periods.get().timeLeft(new Date()).getSeconds()}
                        </text>

                        {/** Current Period */}
                        <text x="3.5" y="10.5" fill={Theme.Subtitle} fontFamily="Karla" fontWeight="bold" fontSize="1.5" alignmentBaseline="hanging">
                            {this.periods.get(new Date()).name}
                        </text>

                        {/** Schedule Name */}
                        <text x="3.5" y="11.5" fill={Theme.Content} fontFamily="Karla" fontSize="1" fontStyle="italic" alignmentBaseline="hanging">
                            {this.periods.get(new Date()).schedule.name}
                        </text>
                    </svg>

                    <div className="schedule-periods">
                        "Schedule here"
                    </div>
                </div>
            </div>
        );
    }
}
