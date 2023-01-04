import "./Channels.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {faBookmark, faEyeSlash, faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {faPenToSquare, faPen, faGear, faX} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Channels() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const channelsPerPage = 8;
    const indexOfLastRecord = currentPage * channelsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - channelsPerPage;

    // Records to be displayed on the current page
    const currentChannels = data.slice(indexOfFirstRecord, indexOfLastRecord);

    useEffect(() => {
        axios.get(`http://localhost:5000/user`)
            .then(response => {
                setData(response.data);
            }).catch(e => console.log(e));
    }, []);

    if (!data) return null;

    return (
        <div className={'channels-container'}>
            <Header />
            <SideBar />
            <div className={'channels'}>
                {currentChannels.map((c, idx) => {
                    return (
                        <div className={"channel-card"}>
                            <Link to="/user" key={c + "_" + idx}>
                                <div className="channel-thumbnail">
                                    {/*<img src={`https://m9-frontend.upskill.appx.pt/uptube/user/video/${thumbnail}`}/>*/}
                                </div>
                                <div className={'channel-data'}>
                                    <div className={'channel-img'}><img src={c.photo} alt={"avatar"}/></div>
                                    <div className={'channel-id'}>{c.username}</div>
                                    <div className={'subscriptions'}>subscrições</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
            <div className={"results"}>
                {currentPage &&
                    <div className={"pagination"} onClick={() => setCurrentPage(currentPage + 1)}>
                        {data.length > 0 && <p>Mais resultados</p>}
                    </div>}
            </div>
        </div>
    )
}



