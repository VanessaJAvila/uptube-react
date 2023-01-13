import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'moment/locale/pt'
import VideoCard from "../../Assets/Components/VideoCard/VideoCard";
import getDaySeen from "../../Utils/getDaySeen";
import "./WatchHistory.scss"
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import Header from "../../Layout/Header";

//localhost port for api
const API = process.env.REACT_APP_API;

const WatchHistory = () => {
    const [history, setHistory] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const {user} = React.useContext(UserContext);

    useEffect(() => {
        axios
            .get(`${API}/user/watchhistory/`)
            .then((response) => {
                // Update the videos state variable with the watch history data
                setHistory(response.data);
            })
            .catch((e) => {
                // Update the errorMessage state variable with the error message
                setErrorMessage('Unable to retrieve watch history data');
            });
    }, [user]);

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
        <div className={"wrapper-history"}>
            <Header/>
            <SideBar/>
            <div className={"history-container"}>
                <div className="history">
                    <div className={"history-title"}>
                        <h2>Histórico</h2>
                    </div>
                    <div className={"history-cards"}>
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
                </div>

            </div>

        </div>
    );
};



export default WatchHistory;