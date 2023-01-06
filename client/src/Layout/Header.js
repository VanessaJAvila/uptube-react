import "./Header.scss";
import {UserContext} from "../Providers/UserContext";
import {SearchContext} from "../Providers/SearchContext";
import logo from "./logo.svg";
import {Link, useHistory} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSortDown} from "@fortawesome/free-solid-svg-icons";
import {faCircleUser, faBell} from "@fortawesome/free-regular-svg-icons"
import axios from "axios";



function Header() {

    const {user} = React.useContext(UserContext);
    const [newNotification, setNewNotification] = useState(false);
    const [viewed, setViewed] = useState();
    const {handleSearch,videos,setVideos,search,setSearch} = React.useContext(SearchContext);



        useEffect(() => {
            axios.get(`http://localhost:5000/user/${user?.user_id}/notifications`)
                .then(response => {
                    setViewed(response.data);
                })
        }, []);



        useEffect(() => {
            axios.get(`http://localhost:5000/user/${user?.user_id}/notification`)
                .then(response => {
                    setNewNotification(true);
                })
        }, []);


    return <div className={"Header"}>
        <div className={"logo"}>
            <Link to={"/Home"}>
            <img src={logo} alt="logo UpTube"/>
            </Link>
        </div>
        <div className={"searching"}>
            <FontAwesomeIcon className={"s-icon"} icon={faMagnifyingGlass}/>
            <input className={"search"}
                   type="text"
                   placeholder={"Pesquisar"}
                   onChange={handleSearch}/>

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