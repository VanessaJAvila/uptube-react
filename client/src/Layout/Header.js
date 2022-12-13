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

function Header() {

    const {user, setUser,page,setPage,search,setSearch,videos,setVideos} = React.useContext(UserContext);

    return <div className={"Header"}>
        <div className={"logo"}>
            <img src={logo} alt="logo UpTube"/>
        </div>
        <div className={"searching"}>
            <FontAwesomeIcon className={"s-icon"} icon={faMagnifyingGlass}/>
            <input className={"search"}
                   type="text"
                   placeholder={"Pesquisar"}
                   onChange={e => setSearch(e.target.value)}/>
             </div>
        {/* <div className={"search-results"}>
            {!videos && <p>A carregar...</p>}
            {videos && <>
                {videos.length === 0 && <p> Sem Resultados</p>}
                {videos.map((v, idx) => (<VideoCard type="geral" key={idx} {...v}/>))}
            </>}
        </div>*/}

        {!user ? (<div className={"login"}>
            <a href="/login">
                <input className={"button"} type="button" value="Iniciar Sessão"/>
                <FontAwesomeIcon className={"l-icon"} icon={faCircleUser}/></a>
        </div>) : (<div className={"user-logged"}>
            <FontAwesomeIcon className={"b-icon"} icon={faBell}/>
            <Link to={"/Channel"}><img className={"avatar"} src={avatar} alt={"user-photo"}/></Link>
               <Link to={"/Profile"}><FontAwesomeIcon className={"sort-icon"} icon={faSortDown}/></Link>
        </div>)}
    </div>
}

export default Header;