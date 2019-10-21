import React from "react";
import '../styles/Schedule.scss';
import Theme from "./Theme";
import Gradebook from "../common/Gradebook";
import PeriodStream from "../common/PeriodStream";

import LAHSSchedules from '../common/fetched/lahs-schedules.json';
import LAHSCalendar from '../common/fetched/lahs-calendar.json';
import { Stream } from "stream";
import Period from "../common/Period";
import { setInterval } from "timers";

export class Schedule extends React.Component
{
    private periods: PeriodStream = new PeriodStream(LAHSCalendar, LAHSSchedules, new Date());
    private gradebook: Gradebook = new Gradebook();

    constructor(props: Readonly<{}>)
    {
        super(props);
        
        this.state = { period: this.periods.get(new Date()) };
    }

    componentDidMount()
    {
        setInterval(() => {
            this.setState(state =>
                ({
                    period: this.periods.get(new Date())
                }));
        }, 1000);
    }

    private periodList(period: {name: string, start: string }, index: number)
    {
        return (
            <li
                key={index}
                style={{background: index % 2 === 1 ? Theme.ScheduleHighlight : "inherit", display: 'flex'}}
            >
                <div style={{width: '20%', textAlign: 'center', color: Theme.Content}}>
                    {period.start}
                </div>
                <div style={{width: '60%', textAlign: 'center', color: Theme.Subtitle, fontWeight: 'bold'}}>
                    {period.name}
                </div>
                <div style={{width: '20%', textAlign: 'center', color: Theme.Content}}>
                    {period.start}
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
                        <circle r="5.1" cx="10" cy="10" fill="transparent" stroke={Theme.Background} strokeWidth="10" strokeDasharray={((this.state as any).period.percent(new Date()) * Math.PI / 10) + " " + (Math.PI * 10)} transform="rotate(-90) translate(-20)" />
                    
                        {/** Time Left */}
                        <text x="10" y="10" fill={Theme.Title} fontFamily="Karla" fontWeight="bold" fontSize="3" textAnchor="middle">
                            {(this.state as any).period.timeLeft(new Date()).toString()}
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
                    { /** */}
                    <div className="schedule-periods">
                        {
                            this.periods.get(new Date()).schedule.periods
                                .filter(p => p.type !== 'passing')
                                .map((p, i) => this.periodList(p, i))
                        }
                    </div>
                </div>
            </div>
        );
    }
}
