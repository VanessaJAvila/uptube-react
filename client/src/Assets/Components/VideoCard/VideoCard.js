import {getNumberOfDays} from "../../../Utils/getDateXDaysAgo";
import React from "react";
import "./VideoCard.scss"

function VideoCard({title, date, duration, thumbnail, likes, comments, views, username, photo, type, daySeen}){
    switch (type) {
        case "geral":
            return (<div className="video-card">
            <div className="title">{title}</div>
            <div className="days-posted">há {getNumberOfDays(date, Date.now())} dias</div>
            <div className="length">{duration}</div>
            <div className="thumbnail">
                {/*<img src={`https://github.com/upskill-frontend-react-2022/uptube-grupo-5-react/${thumbnail}`}/>*/}
            </div>
            <div className="likes">{likes} likes</div>
            <div className="comments">{comments} comments</div>
            <div className="views">{views} visualizações</div>
            <div className="username">{username}</div>
            <div className="user-photo">{photo}</div>
        </div>)
        case "history":
            return (
                <div className="video-card">
                    <div className="title">{title}</div>
                    <div className="days-posted">
                        {daySeen < 1 ? "seen today" : `seen ${daySeen} days ago`}
                    </div>
                    <div className="length">{duration}</div>
                    <div className="thumbnail">
                        {/*<img src={`https://github.com/upskill-frontend-react-2022/uptube-grupo-5-react/${thumbnail}`}/>*/}
                    </div>
                    <div className="likes">{likes} likes</div>
                    <div className="comments">{comments} comments</div>
                    <div className="views">{views} visualizações</div>
                    <div className="username">{username}</div>
                    <div className="user-photo">{photo}</div>
                </div>
            );
    }
}

export default VideoCard;