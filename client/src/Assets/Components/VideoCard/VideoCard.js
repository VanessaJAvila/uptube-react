import {getNumberOfDays} from "../../../Utils/getDateXDaysAgo";
import React from "react";
import "./VideoCard.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMessage, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";

function VideoCard(props) {
    switch (props.type) {

        case "geral":
            return (
                <div className={"suggestions-wrapper"}>
                    <div className="video-card-suggestions">
                        <div className={"thumbnail-container"}
                             style={{backgroundImage: `url('${props.thumbnail}')`}}>
                            <p className={"length"}>{props.duration}</p>
                        </div>
                        <div className={"user-photo"}
                             style={{backgroundImage: `url('${props.avatar}')`}}>
                        </div>
                        <p className={"username"}>{props.user}</p>
                        <h3 className={"video-title"}>{props.title}</h3>
                        <div className={"details-container"}>
                            <p>{props.views} visualizações | {getNumberOfDays(props.date)}</p>
                            <p>{props.views} visualizações | {getNumberOfDays(props.date)}</p>}
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
    }
}

export default VideoCard;