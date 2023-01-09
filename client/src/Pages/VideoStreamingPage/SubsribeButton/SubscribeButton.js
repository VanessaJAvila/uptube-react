import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {UserContext} from "../../../Providers/UserContext";
import "./SubscribeButton.scss"

//localhost port for api
const API = process.env.REACT_APP_API;
const SubscribeButton = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        // Fetch the subscribe status of the user
        // and update the state accordingly
        async function fetchSubscribeStatus() {
            const response = await axios.get(`${API}/subscriptions/check/:user_followed_id`);
            setIsSubscribed(response.data.subscribed);
        }
        fetchSubscribeStatus();
    }, []);

    const handleSubscribe = async () => {
        if (!user) {
            alert('Please log in to subscribe');
            return;
        }
        if (isSubscribed) {
            // Send a DELETE request to the server to unsubscribe
            await axios.delete(`${API}/subscriptions/delete/:user_followed_id`);
            setIsSubscribed(false);
        } else {
            // Send a POST request to the server to subscribe
            await axios.post(`${API}/subscriptions/add`, { user_followed_id: ':user_followed_id' });
            setIsSubscribed(true);
        }
    };

    return (
        <div className="subscribe-button" onClick={handleSubscribe}>
            {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </div>
    );
};

export default SubscribeButton;