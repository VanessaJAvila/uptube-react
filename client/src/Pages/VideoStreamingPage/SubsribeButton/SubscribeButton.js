import React, { useState, useEffect } from 'react';
import axios from 'axios';

//localhost port for api
const API = process.env.REACT_APP_API;



const SubscribeButton = ({ userFollowedId }) => {
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post(`${API}/subscriptions/follow/${userFollowedId}`, [], {withCredentials: true});
            setSubscribed(response.data.subscribed);
        };
        fetchData();
    }, [userFollowedId]);

    const handleClick = async () => {
        console.log(userFollowedId)
        const response = await axios.post(`${API}/subscriptions/follow/${userFollowedId}`, [], {withCredentials: true});
        setSubscribed(response.data.subscribed);
    };

    return (
        <button id="subscribe-button" onClick={handleClick}>
            {subscribed ? 'Stop subscribing' : 'Subscribe'}
        </button>
    );
};

export default SubscribeButton;
