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

function VideoCard(props) {
    switch (props.type) {

        case "geral":
            return (
                <div className={"suggestions-wrapper"}>
                    <div className="video-card-suggestions">
                        <div className={"thumbnail-container"}
                             style={{backgroundImage: `url(${img1}`}}>
                            <p className={"length"}>{props.duration}</p>

                        </div>
                        <div className={"video-details-wrapper"}>

                            <div>
                                <p className={"username"}>{props.username}</p>
                                <h3 className={"video-title"}>{props.title.length > 40 ? props.title.slice(0, 37) + "..." : props.title}</h3>
                                <div className={"details-container"}>
                                    <p>{props.views} visualizações | {getDaySeen(props.date)}</p>
                                </div>
                            </div>
                            <div className={"user-photo"}
                                 style={{backgroundImage: `url('${img2}')`}}>
                            </div>

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
                        <div className={"thumbnail-container"}
                             style={{backgroundImage: `url(${img1}`}}>
                            <p className={"length"}>{props.duration}</p>
                        </div>
                        <div className={"user-photo"}
                             style={{backgroundImage: `url('${img2}')`}}>
                        </div>
                        {["suggestion", "geral"].includes(props.type) && <p className={"username"}>{props.user}</p>}
                        <h3 className={"video-title"}>{props.title}</h3>
                        <div className={"details-container"}>
                            <p>{props.views} visualizações | {getNumberOfDays(props.date)}</p>
                            <p>{props.views} visualizações | {getNumberOfDays(props.date)}</p>
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
                                    <FontAwesomeIcon icon={faBookmark} className={""}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case "channel":
            return (
                <div className={"video-card " + props.type}>
                    <div className={"thumbnail-container"}
                         style={{backgroundImage: `url(${img1}`}}>
                        <p className={"length"}>{props.duration}</p>
                    </div>
                    <div className={"user-photo"}
                         style={{backgroundImage: `url('${img2}')`}}>
                    </div>
                    <p className={"username"}>{props.user}</p>
                    <h3 className={"video-title"}>{props.title}</h3>
                    <div className={"details-container"}>
                        <p>{props.views} visualizações | {getNumberOfDays(props.date)}</p>
                        <p>{props.views} visualizações | {getNumberOfDays(props.date)}</p>
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
                                <FontAwesomeIcon icon={faBookmark} className={""}/>
                            </div>
                        </div>
                    </div>
                </div>
            )

    }
}

export default VideoCard;