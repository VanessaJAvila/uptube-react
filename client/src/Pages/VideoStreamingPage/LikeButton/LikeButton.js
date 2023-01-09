import React, { useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import "./LikeButton.scss"

//localhost port for api
const API = process.env.REACT_APP_API;

const LikeButton = ({videoId }) => {
    const [like, setLike] = useState(null);

    const handleLike = (user_id, video_id) => {
        axios.get(`${API}/reaction/like/${video_id}/${user_id}`)
            .then((res) => {
                const liked = res.data.liked;
                if (liked === false) {
                    // The video is already liked, so we will send a DELETE request to remove the like
                    axios.delete(`${API}/reaction/${video_id}/delete`)
                        .then((res) => {
                            setLike(res.data);
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                } else {
                    // The video is not liked, so we will send a POST request to add the like
                    axios.post(`${API}/reaction/new`, {
                        user_id,
                        video_id,
                        reaction_type_id: 1,
                    })
                        .then((res) => {
                            setLike(res.data);
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <button onClick={() => handleLike(videoId)}>
            <FontAwesomeIcon icon={faThumbsUp} />
        </button>
    );
};

export default LikeButton;
