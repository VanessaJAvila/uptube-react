import "./SideBar.scss";
import React, {useEffect, useState} from "react";
import {UserContext} from "../Providers/UserContext";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faFire,
    faClapperboard,
    faClockRotateLeft,
    faPlay,
    faVideo,
    faGear, faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


function SideBar(props) {


    const [user,setUser] = useState();
    {/*const {user, setUser} = React.useContext(UserContext);
  const [tags, setTags] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5000/user', {withCredentials: true})
            .then(r => {
                setUser(r.data.user)
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/tags')
            .then(response => {
                setTags(response.data.tags)
            });
    }, []);

    console.log(setTags);*/}

    return <div className={"SideBar"}>
        <div className={"User"}>
                <div className={"Name"}>
                <div className={"username"}>
                </div>
            </div>
        </div>

        <div className={"container-public-home"}>
            <div className={"Início"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faHouse}/></Link>
                <p>Playlists</p>
            </div>
        <div className={"Tendências"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faFire}/></Link>
            <p>Tendências</p>
        </div>
        <div className={"Canais"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faClapperboard}/></Link>
            <p>Canais</p>
        </div>
        </div>

        <div className={"container-home"}>
            <div className={"Histórico"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faClockRotateLeft}/></Link>
                <p>Histórico</p>
        </div>
        <div className={"Playlists"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faPlay}/></Link>
            <p>Playlists</p>
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
    <div className={"container-home-2"}>
        <div className={"Estudio"}>
        <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faVideo}></FontAwesomeIcon></Link>
        <p>Estúdio</p>
            </div>
        <div className={"Definições"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faGear}></FontAwesomeIcon></Link>
            <p>Definições</p>
            </div>
        <div className={"Logout"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon></Link>
            <p>Terminar sessão</p>
            </div>
    </div>
    </div>

}

export default SideBar;