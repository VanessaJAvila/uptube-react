import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

//localhost port for api
const API = process.env.REACT_APP_API;

async function dislikeVideo(videoId) {
    const response = await axios.post(`${API}/reaction/${videoId}/dislike`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }, {withCredentials: true});
    console.log(response.data)
    return response.data;
}

const DislikeButton = ({ videoId, dislikeCount }) => {
    return (
        <div className="dislikes">
            <FontAwesomeIcon icon={faThumbsDown} onClick={() => dislikeVideo(videoId)} />
            <p className="dislikes-count">{dislikeCount}</p>
        </div>
    );
}

export default DislikeButton;
