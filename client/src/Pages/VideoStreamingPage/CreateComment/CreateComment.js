import React, { useState } from 'react';
import axios from 'axios';

//localhost port for api
const API = process.env.REACT_APP_API;

function CreateComment(props) {
    const [inputCommentValue, setInputCommentValue] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/video/${props.videoId}/comment/new`, {
                comment: inputCommentValue
            }, {withCredentials: true});
            if (res.data.success) {
                // Clear the input field and do something with the new comment
                setInputCommentValue("");
                // You can access the new comment with res.data.new_comment
            } else {
                // There was an error creating the comment
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Comentar"
                className="new-comment-input"
                value={inputCommentValue}
                onChange={(e) => setInputCommentValue(e.target.value)}
            />
            {inputCommentValue && (
                <button type="submit" className="new-comment-button">
                    Publicar
                </button>
            )}
        </form>
    );
}

export default CreateComment;