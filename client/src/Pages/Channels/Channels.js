import "./Channels.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {faBookmark, faEyeSlash, faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {faPenToSquare, faPen, faGear, faX} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";

//localhost port for api
const  API  = process.env.REACT_APP_API;

export default function Channels() {

    const {user} = React.useContext(UserContext);

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const channelsPerPage = 6;
    const indexOfLastRecord = currentPage * channelsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - channelsPerPage;

    // Records to be displayed on the current page
    const currentChannels = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const history = useHistory();

    useEffect(() => {
        axios.get(`${API}/user`)
            .then(response => {
                setData(response.data);
            }).catch(e => console.log(e));
    }, []);


    console.log(data);
    if (!data) return null;

    return (
        <div className={'channels-container'}>
            <Header/>
            <SideBar/>
            <div className={'channels'}>
                {currentChannels.map((c, idx) => {
                    return (
                        <div className={"channel-card"} key={c + "_" + idx}  onClick={() => {
                                      history.push(`/Channel/${c.user_id}`)
                                  }}>
                                <div className="channel-header">
                                    <img className={'img-header'} src={c.header}/>
                                </div>
                                <div className={'channel-data'}>
                                    <div className={'channel-img'}><img src={c.photo} alt={"avatar"}/></div>
                                    <div className={'channel-id'}>{c.username}</div>
                                    <div className={'subscriptions'}>{c.subscriptions}
                                        <p className={'subscription-text'}>subscritores</p></div>
                                </div>
                                {user && <div class={'follow'}><button>Subscrever</button></div>}
                        </div>
                    );
                })}
            </div>
            <div className={"results"}>
                {(data.length > 0) &&
                    <div className={"pagination-goback"} onClick={() => setCurrentPage(currentPage - 1)}>
                        <p className={"back"}>Menos resultados</p>
                    </div>}
                {(data.length > 0) &&
                    <div className={"pagination-next"} onClick={() => setCurrentPage(currentPage + 1)}>
                        <p className={"next"}>Mais resultados</p>
                    </div>}
            </div>
        </div>
    )
}



