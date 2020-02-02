import React from "react";
import '../styles/Announcements.scss';
import Theme from "./Theme";
import LAHSAnnouncements from "../common/LAHSAnnouncements";
import update from 'immutability-helper';


export class Announcements extends React.Component
{
    private announcements = new LAHSAnnouncements();

    constructor(props: any) {
        super(props);
        this.state = {
            announcementbody: (
                <div className="lds-spinner">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>)
        };
    }

    componentDidMount(): void {
        let announcementOnClick = (event) => {
            event.preventDefault();
            let messageBody = event.target.parentNode.childNodes[1];
            if (messageBody.style.maxHeight || messageBody.style.margin) {
                messageBody.style.maxHeight = null;
                messageBody.style.padding = "0 4%";
            } else {
                messageBody.style.maxHeight = `${messageBody.scrollHeight}px`;
                messageBody.style.padding = "2% 4%";
            }
        };

        this.announcements.getAnnouncements().then(data => {
            let newannouncementbody: JSX.Element[] = [];
            data["PostList"].forEach(json => {
                newannouncementbody.push(<div className="announcement-body">
                    <h1 className="announcement-title" style={{color: "#ffffff"}} onClick={announcementOnClick}>
                        {json.HRMarkAsPriority ? json.HRPriorityStartDate : json.HRPostDate}
                    </h1>
                    <p className="announcement-message" style={{color: Theme.Content}}
                       dangerouslySetInnerHTML={{__html: json.Description}}/>
                </div>)
            });
            this.setState(update(this.state, {
                announcementbody: {
                    $set: <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        overflowY: "scroll"
                    }}>{newannouncementbody}</div>
                }
            }))
        })
    }

    render()
    {
        return (
            <div className="app-body">
                {
                    (this.state as any).announcementbody
                }
            </div>
        );
    }
}
