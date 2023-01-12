import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {UserContext} from "../../../Providers/UserContext";

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

    const handleSubscriptionButton = async () => {
        const response = await axios.post(`${API}/subscriptions/follow/${userFollowedId}`, [], {withCredentials: true});
        setSubscribed(response.data.subscribed);
    };

    console.log(`SubscribeButton: ${React.useContext(UserContext).user_id} ${subscribed}`)
    return (
        <button id="subscribe-button" onClick={handleSubscriptionButton}>
            {subscribed ? 'Stop subscribing' : 'Subscribe'}
        </button>
    );
};

export default SubscribeButton;
