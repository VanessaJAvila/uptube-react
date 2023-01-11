import React, { useState } from 'react';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

//localhost port for api
const API = process.env.REACT_APP_API;

function CreateNewTag(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [tagText, setTagText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a request to create the new tag
            await axios.post(`${API}/tags/new`, { name: tagText });
        } catch (err) {
            // handle error
        }
        setIsOpen(false);
        setTagText('');
    }


    return (
        <>
            <div className={'upload-video-details-tags-list-plus'} onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon icon={faPlus}/>
            </div>
            {isOpen && (
                <div className="modal">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={tagText}
                            onChange={(e) => setTagText(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                        <button onClick={() => setIsOpen(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default CreateNewTag;