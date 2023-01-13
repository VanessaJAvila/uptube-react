import "./SideBar.scss";
import React, {useEffect, useState} from "react";
import {UserContext} from "../Providers/UserContext";
import {SearchContext} from "../Providers/SearchContext";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faClapperboard, faClockRotateLeft, faFire, faGear, faHouse, faPlay, faRightFromBracket, faVideo
} from "@fortawesome/free-solid-svg-icons";
import {Link, useHistory} from "react-router-dom";
import ReactSwitch from "react-switch";

//localhost port for api
const API = process.env.REACT_APP_API;

function SideBar() {
    const {user, setUser} = React.useContext(UserContext);
    const {handleTags, tags} = React.useContext(SearchContext);

    const history = useHistory();

    let handleSubmit = async (e) => {
        e.preventDefault();
        axios.post(`${API}/user/Logout`, true, {
            withCredentials: true
        })
            .then((res) => {
                setUser(null);
                history.replace("/Login");
            }).catch((error) => {
            //console.log(error)
            history.replace("/Home");
        });
    }

    return <div className={"SideBar"}>
        {user && <div className={"User"}><Link to={"/Profile/"}>
            <img className={"avatar"} src={user?.photo} alt={"user-photo"}/>
            <div className={"Name"}>
                {user?.name}
                <div className={"username"}>
                    {user?.username}
                </div>
            </div>
        </Link>
        </div>}

        <div className={"container-public-home"}>
            <div className={"Início"}>
                <Link to={"/Home"}><FontAwesomeIcon icon={faHouse}/>
                    <p>Início</p></Link>
            </div>
            {!user && <div className={"Canais"}>
                <Link to={"/Channels"}><FontAwesomeIcon icon={faClapperboard}/></Link>
                <p>Canais</p>
            </div>}
        </div>

        {user && <div className={"container-user"}>
            <div className={"Subscrições"}>
                <Link to={"/Channels"}><FontAwesomeIcon icon={faClapperboard}/>
                    <p>Subscrições</p>
                </Link>
            </div>
            <div className={"Histórico"}>
                <Link to={"/history"}><FontAwesomeIcon icon={faClockRotateLeft}/>
                    <p>Histórico</p>
                </Link>
            </div>
            <div className={"Playlists"}>
                <Link to={"/Playlists"}><FontAwesomeIcon icon={faPlay}/>
                    <p>Playlists</p>
                </Link>
            </div>
        </div>}

        <div className={"Tags"}>
            <h4>Tags</h4>
            <div className={"tag"}>
                { tags && Object.values(tags).map( (tag, idx) =>
                        idx < 12 && (
                    <div key={idx}>
                        <button onClick={() => handleTags(tag)} value={tag.name}>
                            {tag.name}
                        </button>
                    </div>))}
            </div>
        </div>

        {user && <div className={"container-home-2"}>
            <div className={"Estudio"}>
                <Link to={"/studio"}><FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                    <p>Estúdio</p>

                </Link>
            </div>
            <div className={"Definições"}>
                <Link to={"/Profile"}><FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                    <p>Definições</p></Link>
            </div>
            <div className={"Logout"} onClick={handleSubmit}>
                <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
                <p>Terminar sessão</p>
            </div>
        </div>}
    </div>
}

export default SideBar;