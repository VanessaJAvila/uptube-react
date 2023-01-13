import {getNumberOfDays} from "../../../Utils/getDateXDaysAgo";
import React from "react";
import "./VideoCard.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMessage, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import thumbnail from "../../../Assets/sample-thumbnails/ssh_1.png"
import img1 from "../../sample-thumbnails/ssh_1.png";
import img2 from "../../sample-thumbnails/ssh_2.png";
import getDaySeen from "../../../Utils/getDaySeen";
import {Link} from "react-router-dom";

//localhost port for api
const API = process.env.REACT_APP_API;

function VideoCard(props) {
    switch (props.type) {

        case "geral":
            return (
                <div className={"suggestions-wrapper"}>
                    <div className="video-card-suggestions">
                        <Link to={`/player/${props.video_id}`}>
                            <div className={"thumbnail-container"}
                                 style={{backgroundImage: `url(${API}${props.thumbnail})`}}>

                                <p className={"length"}>{props.duration}</p>
                            </div>
                        </Link>
                        <div className={"video-details-wrapper"}>
                            <div>
                                <Link to={`/channel/${props.user_id}`}>
                                <p className={"username"}>{props.username}</p>
                                </Link>
                                <Link to={`/player/${props.video_id}`}>
                                <h3 className={"video-title"}>{props.title.length > 40 ? props.title.slice(0, 37) + "..." : props.title}</h3>

                                    <div className={"details-container"}>
                                    <p>{props.views} visualizações | {getDaySeen(props.date)}</p>
                                </div>
                                </Link>
                            </div>
                            <Link to={`/channel/${props.user_id}`}>
                            <div className={"user-photo"}
                                 style={{backgroundImage: `url(${API}${props.photo}`}}>
                            </div>
                            </Link>
                        </div>
                        <div className={"reactions-container"}>
                            <div className={"graph"}/>
                            <div className={"reactions"}>
                                <div className={"comments"}>
                                    <FontAwesomeIcon icon={faMessage} className={"icon"}/>
                                    {props.comments === 1 ?
                                        <p> {props.comments} comentário</p> :
                                        <p> {props.comments} comentários</p>
                                    }
                                </div>
                                <div className={"likes"}>
                                    <FontAwesomeIcon icon={faThumbsUp} className={"icon"}/>
                                    {props.likes === 1 ?
                                        <p> {props.likes} like</p> :
                                        <p> {props.likes} likes</p>
                                    }
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faBookmark} className={"save"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case "history":
            return (
                <div className={"suggestions-wrapper"}>
                    <div className="video-card-suggestions">
                        <div className={"container-1-hist"}>
                            <div className={"thumbnail-container"}
                                 style={{backgroundImage: `url(${API}${props.thumbnail})`}}>
                            </div>
                        </div>
                        <div className={"container-2-hist"}>
                            <Link to={`/channel/${props.user_id}`}>
                                <p className={"username"}>{props.channel}</p>
                            </Link>
                            <h3 className={"video-title"}>{props.title}</h3>
                            <p className={"history-description-text"}>{props.description.length > 100 ? props.description.slice(0, 97) + "..." : props.description}</p>

                        </div>

                            </div>
                </div>




            )
        case "channel":
            return (
                <div className={"video-card " + props.type}>
                    <div className={"thumbnail-container"}
                         style={{backgroundImage: `url(${API}${props.thumbnail})`}}>
                        <p className={"length"}>{props.duration}</p>
                    </div>
                    <div className={"user-photo"}
                         style={{backgroundImage: `url(${props.photo})`}}>
                    </div>
                    <p className={"username"}>{props.username}</p>
                    <h3 className={"video-title"}>{props.title}</h3>

                </div>
            )

    }
}

export default VideoCard;