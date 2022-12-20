import "./Header.scss";
import {UserContext} from "../Providers/UserContext";
import logo from "./logo.svg";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSortDown} from "@fortawesome/free-solid-svg-icons";
import {faCircleUser, faBell} from "@fortawesome/free-regular-svg-icons"
import avatar from "../Assets/img1.jpg"
import {Link} from "react-router-dom";
import VideoCard from "../Components/VideoCard/VideoCard";
import Redirect from "react-router-dom/es/Redirect";

function Header() {

    const {user,setSearch,videos} = React.useContext(UserContext);

    return <div className={"Header"}>
        <div className={"logo"}>
            <img src={logo} alt="logo UpTube"/>
        </div>
        <div className={"searching"}>
            <FontAwesomeIcon className={"s-icon"} icon={faMagnifyingGlass}/>
            <input className={"search"}
                   type="text"
                   placeholder={"Pesquisar"}
                   onChange={e => setSearch(e.target.value) && <Redirect to="/SearchResults"/>}/>
             </div>

        {!user ? (<div className={"login"}>
            <a href="/login">
                <input className={"button"} type="button" value="Iniciar Sessão"/>
                <FontAwesomeIcon className={"l-icon"} icon={faCircleUser}/></a>
        </div>) : (<div className={"user-logged"}>
            <FontAwesomeIcon className={"b-icon"} icon={faBell}/>
            <Link to={"/Channel"}> <img className={"avatar"} src = {user?.photo} alt={"user-photo"}/></Link>
               <Link to={"/Profile"}><FontAwesomeIcon className={"sort-icon"} icon={faSortDown}/></Link>
        </div>)}
    </div>
}

export default Header;