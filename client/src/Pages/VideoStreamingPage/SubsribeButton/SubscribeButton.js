import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {UserContext} from "../../../Providers/UserContext";

//localhost port for api
const API = process.env.REACT_APP_API;

const SubscribeButton = ({ userFollowedId }) => {
    const [subscribed, setSubscribed] = useState(false);

    const [isUserFollowing, setIsUserFollowing] = useState(false);


    useEffect(async () => {
        await axios.get(`${API}/subscriptions/check/${userFollowedId}`)
            .then(r => {
                setIsUserFollowing(r.data);
            }).catch(e => console.log(e));
        if(isUserFollowing === false)
        {
            await axios.post(`${API}/subscriptions/follow/${userFollowedId}`, {}, {withCredentials: true})
                .then(response => {
                    setSubscribed(response.data.subscribed)

                })
        }
        else
            setSubscribed(true)
    }, [userFollowedId]);

    const handleSubscriptionButton = async () => {
        if (!isUserFollowing) {
            await axios.post(`${API}/subscriptions/follow/${userFollowedId}`, {}, {withCredentials: true})
                .then(response => {
                    setSubscribed(response.data.subscribed);
                }).catch(e => console.log(e));
        }
    };

    console.log(`SubscribeButton: ${React.useContext(UserContext).user_id} ${subscribed}`)
    return (
        <button id="subscribe-button" onClick={handleSubscriptionButton}>
            {subscribed ? 'Stop subscribing' : 'Subscribe'}
        </button>
    );
};

export default SubscribeButton;
