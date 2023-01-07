import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'moment/locale/pt'
import VideoCard from "../../Assets/Components/VideoCard/VideoCard";
import getDaySeen from "../../Utils/getDaySeen";

//localhost port for api
const API = process.env.REACT_APP_API;

const WatchHistory = () => {
    const [history, setHistory] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const user_id = '9'; //todo: user logado

    useEffect(() => {
        axios
            .get(`${API}/user/watchhistory/${user_id}`)
            .then((response) => {
                // Update the videos state variable with the watch history data
                setHistory(response.data);
            })
            .catch((e) => {
                // Update the errorMessage state variable with the error message
                setErrorMessage('Unable to retrieve watch history data');
            });
    }, [user_id]);

    // Group the history array by the daySeen field
    const groupedHistory = history.reduce((acc, video) => {
        const daySeen = getDaySeen(video.date);
        if (acc[daySeen]) {
            acc[daySeen].push(video);
        } else {
            acc[daySeen] = [video];
        }
        return acc;
    }, {});

    return (
        <div className="history">
            {Object.keys(groupedHistory).reverse().map((daySeen) => (
                <div key={daySeen}>
                    <h2>{daySeen === "0" ? "Hoje" : `${daySeen}`}</h2>
                    {groupedHistory[daySeen]
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((video, idx) => (
                            <VideoCard
                                type="history"
                                key={idx}
                                {...video}
                                daySeen={daySeen}
                            />
                        ))}
                </div>
            ))}
        </div>
    );
};



export default WatchHistory;