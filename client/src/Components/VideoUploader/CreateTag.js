import React, { useState } from 'react';
import axios from 'axios';
import AddTagInput from './AddTagInput';

//localhost port for api
const API = process.env.REACT_APP_API;

function SaveTag() {
    const [status, setStatus] = useState('');

    async function handleTagSave(tag) {
        try {
            const response = await axios.post(`${API}/tags/new`, {
                name: tag
            });
            setStatus(response.data.message);
        } catch (error) {
            setStatus('Error: Unable to save tag');
        }
    }

    return (
        <div>
            <AddTagInput onTagChange={handleTagSave} />
            {status && <p>{status}</p>}
        </div>
    );
}

export default SaveTag;
