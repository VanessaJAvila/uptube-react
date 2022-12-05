import {getNumberOfDays} from "../../Utils/getDateXDaysAgo";
import React from "react";
import "./VideoCard.scss"

function VideoCard({title, date, duration, thumbnail, likes, comments, views, username, photo, type}){
    switch (type) {
        case "recommendation":
            return (<div className="video-card">
            <div className="title">{title}</div>
            <div className="days-posted">há {getNumberOfDays(date, Date.now())} dias</div>
            <div className="length">{duration}</div>
            <div className="thumbnail">thumbnail: {thumbnail}</div>
            <div className="likes">{likes} likes</div>
            <div className="comments">{comments} comments</div>
            <div className="views">{views} visualizações</div>
            <div className="username">{username}</div>
            <div className="user-photo">{photo}</div>
        </div>)
    }
}

export default VideoCard;