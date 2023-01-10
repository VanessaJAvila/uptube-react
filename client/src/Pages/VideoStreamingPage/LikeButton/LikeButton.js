import "./LikeButton.scss"
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsDown, faThumbsUp} from '@fortawesome/free-solid-svg-icons';

//localhost port for api
const API = process.env.REACT_APP_API;

async function likeVideo(videoId, setLikeColor) {
    console.log("videoId:", videoId)
    const response = await axios.post(`${API}/reaction/${videoId}/like`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }, {withCredentials: true});
    console.log(response.data)
    if(response.data.liked) setLikeColor("green")
    else setLikeColor("white")
    return response.data;
}

const LikeButton = ({ videoId, likeCount }) => {
    const [likeColor, setLikeColor] = useState("white")

    return (
        <div className="likes">
            <FontAwesomeIcon icon={faThumbsUp} color={likeColor} onClick={() => likeVideo(videoId, setLikeColor)} />
            <p className="likes-count">{likeCount}</p>
        </div>
    );
}

export default LikeButton;
