import "./SideBar.scss";
import React, {useEffect, useState} from "react";
import {UserContext} from "../Providers/UserContext";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faFire, faClapperboard, faClockRotateLeft, faPlay} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


function SideBar(props) {

    {/*  const {user, setUser} = React.useContext(UserContext);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tags')
            .then(response => {
                setTags(response.data.tags)
            });
    }, []);

    console.log(setTags);*/}

    return <div className={"SideBar"}>
        <div className={"container-public-home"}>
            <div className={"Início"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faHouse}/><>Início</></Link>
            </div>
        <div className={"Tendências"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faFire}/>Têndencias</Link>
        </div>
        <div className={"Canais"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faClapperboard}/>Canais</Link>
        </div>
        </div>

        <div className={"container-home"}>
            <div className={"Histórico"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faClockRotateLeft}/><>Histórico</></Link>
        </div>
        <div className={"Playlists"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faPlay}/>Playlists</Link>
        </div>
        </div>
        <div className={"Tags"}>
            <h4>Tags</h4>
            <div className={"tag"}>
                {/*verificar endpoint correspondente
                <Link to={"/videos/" + props.tag_id}>
                    <button type="button">${props.name}</button>
                </Link>*/}
            </div>

            <button type="button">animais</button>
            <button type="button">gastronomia</button>
            <button type="button">programação</button>
        </div>
    </div>
}

export default SideBar;