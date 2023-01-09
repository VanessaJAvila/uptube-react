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


//localhost port for api
const API = process.env.REACT_APP_API;

function Header() {

    const {user} = React.useContext(UserContext);
    const [newNotification, setNewNotification] = useState(false);
    const [viewed, setViewed] = useState();
    const [popup, setPopUp] = useState(false);
    const {handleSearch, videos, setVideos, search, setSearch} = React.useContext(SearchContext);

    const togglePopUp = () => {
        setPopUp(!popup)
        console.log(popup)
    }

    {/*}  useEffect(() => {
        axios.get(`${API}/video/user/${user?.user_id}/notifications`)
            .then(response => {
                setViewed(response.data);
            })
    }, []);


    useEffect(() => {
        axios.get(`${API}/video/user/${user?.user_id}/notification`)
            .then(response => {
                setNewNotification(true);
            })
    }, []);*/}


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
            <Link to="/login">
                <input className={"button"} type="button" value="Iniciar Sessão"/>
                <FontAwesomeIcon className={"l-icon"} icon={faCircleUser}/></Link>
        </div>) : (<div className={"user-logged"}>
            <FontAwesomeIcon className={"b-icon"} icon={faBell}/>
            <Link to={"/UserChannel"}> <img className={"avatar"} src={user?.photo} alt={"user-photo"}/></Link>
            <div className={"dropdown"}>
                <Link onClick={togglePopUp}><FontAwesomeIcon className={"sort-icon"} icon={faSortDown}/></Link>
                {popup && <div className={"dropdown-content"}>
                    <div className={"menu-item"}><Link to="/UserChannel">Canal</Link></div>
                    <div className={"menu-item"}><Link to="/studio">Estúdio</Link></div>
                    <div className={"menu-item"}><button>Dark/Light Mode</button></div>
                    <div className={"menu-last-item"} ><Link to="">Enviar Feedback</Link></div>
                </div>}
            </div>
        </div>)}
    </div>
}


export default Header;