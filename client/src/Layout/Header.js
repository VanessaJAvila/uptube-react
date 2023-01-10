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
    const [alert, setAlert] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [notification, setNotification] = useState();
    const [unSeenNot, setUnSeenNot] = useState();
    const [popup, setPopUp] = useState(false);
    const {handleSearch} = React.useContext(SearchContext);

    const togglePopUp = () => {
        setPopUp(!popup)
        console.log(popup)
    }

    const toggleNot = () => {
        setOpenPopUp(!openPopUp)
        console.log(openPopUp)
    }

     useEffect(() => {
        axios.get(`${API}/user/${user?.user_id}/notifications`)
            .then(response => {
                setNotification(response.data.notifications);
                setUnSeenNot(response.data.unseenNot)
                if (response.data.unseenNot[0] > 0) {
                  setAlert(true)
                }
                })
            }, []);

    console.log("notification", notification)
    console.log ("unseeNot", unSeenNot)


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
            <FontAwesomeIcon className={"b-icon"} icon={faBell} onClick={toggleNot}/>
            {alert && <div className="redDot"/>}
            {notification && openPopUp &&
                 <div className="menu-notification" >
                    {notification.map((notification, idx) => (
                            <div className={"menu-item"}  key={idx}>
                                Tens um {notification.notification} de {notification.sender}
                            </div>
                        ))}
                </div>}


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