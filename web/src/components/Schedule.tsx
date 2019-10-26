import React from "react";
import '../styles/Schedule.scss';
import Theme from "./Theme";

import PeriodStream from "../common/PeriodStream";
import { setInterval } from "timers";
import Period from "../common/Period";
import Calendar from "../common/Calendar";

export class Schedule extends React.Component
{
    private stream: PeriodStream | undefined;

    private bellData: any = {};
    private interval: NodeJS.Timeout | undefined;
    private mounted: boolean = false;

    constructor(props: Readonly<{}>)
    {
        super(props);

        this.state = { period: undefined }
        this.loadBellData("schedules");
        this.loadBellData("calendar");
        this.loadBellData("correction");
    }

    private loadBellData(name: "schedules" | "calendar" | "correction")
    {
        fetch(`https://cors-anywhere.herokuapp.com/http://bell.plus/api/data/lahs/${name}`).then(r => r.text()).then(txt =>
        {
            console.log(txt);
            this.bellData[name] = txt;
            if (this.bellData.schedules !== undefined
                && this.bellData.calendar !== undefined
                && this.bellData.correction !== undefined)
            {
                this.stream = new PeriodStream(
                    new Calendar(this.bellData.schedules, this.bellData.calendar, this.bellData.correction),
                    new Date()
                );
                this.setState(({period: this.stream.get(new Date())}));
            }
        });
    }

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    componentDidMount() {
        this.mounted = true;
        this.timeout(new Date().getMilliseconds()).then(() => {
                this.interval = setInterval(() =>
                {
                    if (!this.mounted) return;
                    this.setState(_ =>
                    {
                        if (this.stream === undefined) return;
                        return {
                            period: this.stream.get(new Date())
                        };
                    });
                }, 1000);
            }
        );
    }

    componentWillUnmount()
    {
        this.mounted = false;
        if (!this.interval)
        {
            return;
        }
        clearInterval(this.interval);
    }

    private periodList()
    {
        if (!this.stream) { return null; }

        let i = -1;
        const s = this.stream.calendar.get(new Date());
        if (!s) { return null; }

        return s.periods.map((p, realIndex) => {
            if (p.passing) { return null; }
            i++;
            return (
                <li
                key={realIndex}
                style={{background: i % 2 === 1 ? Theme.ScheduleHighlight : "inherit", display: 'flex'}}
                >
                    <div style={{width: '20%', textAlign: 'center', color: Theme.Content}}>
                        {p.start}
                    </div>
                    <div style={{width: '60%', textAlign: 'center', color: Theme.Subtitle, fontWeight: 'bold'}}>
                        {Period.formatName(p)}
                    </div>
                    <div style={{width: '20%', textAlign: 'center', color: Theme.Content}}>
                        {
                            realIndex + 1 < (this.state as any).period.schedule.periods.length
                                ? (this.state as any).period.schedule.periods[realIndex + 1].start
                                : ""
                        }
                    </div>
                </li>
            );
        });
    }

    render()
    {
        if (!this.stream)
        {
            return null;
        }
        return (
            <div className="app-body">
                <div className="schedule-body">
                    <svg className="schedule-pie" height="100%" viewBox="-1 -1 22 22">
                        <filter id="SchedulePieShadow" width="180%" height="180%">
                            {/** see https://www.desmos.com/calculator/x6gt6cuc8g */}
                            <feDropShadow dx="0" dy="0" stdDeviation="1" floodOpacity="0.05"/>
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
                            {(this.state as any).period.formatName()}
                        </text>

                        {/** Schedule Name */}
                        <text x="3.5" y="11.5" fill={Theme.Content} fontFamily="Karla" fontSize="1" fontStyle="italic" alignmentBaseline="hanging">
                            {(this.state as any).period.schedule.name}
                        </text>
                    </svg>
                    { /** Schedule Periods List */}
                    <div className="schedule-periods">
                        {this.periodList()}
                    </div>
                </div>
            </div>
        );
    }
}
