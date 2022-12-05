import "./Header.scss";
import {UserContext} from "../Providers/UserContext";
import logo from "./logo.svg";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass,faSortDown} from "@fortawesome/free-solid-svg-icons";
import{faCircleUser,faBell} from "@fortawesome/free-regular-svg-icons"
import avatar from "../Assets/img1.jpg"
import {Link} from "react-router-dom";

function Header() {

    const [videos, setVideos] = useState([]);
    const {user, setUser, filter, setFilter} = React.useContext(UserContext);




    return <div className={"Header"}>
        <div className={"logo"}>
        <img src={logo} alt ="logo UpTube"/>
        </div>
            <div className={"searching"}>
                <FontAwesomeIcon type={"input"} onClick={setFilter} className={"s-icon"} icon={faMagnifyingGlass}/>
                <input className={"search"}
                       type="text"
                       placeholder={"Pesquisar"}
                       onChange={e => setFilter(e.target.value)}/>
            </div>
        {!user ? (  <div className={"login"}>
            <a href="/login">
            <input className={"button"} type="button" value="Iniciar Sessão"/>
                <FontAwesomeIcon className={"l-icon"} icon={faCircleUser}/></a>
        </div>) : (<div className={"user-logged"}>
            <FontAwesomeIcon className={"b-icon"} icon={faBell}/>
            <Link to={"./Pages/Profile/Profile"}><img className={"avatar"} src = {avatar}/>
            <FontAwesomeIcon className={"sort-icon"} icon={faSortDown}/></Link>
</div> )}
    </div>
}

export default Header;