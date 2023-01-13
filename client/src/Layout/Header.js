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
import FeedbackForm from "../Pages/Feedback Form/FeedbackForm";

//localhost port for api
const API = process.env.REACT_APP_API;

function Header() {

    const {user} = React.useContext(UserContext);
    const [alert, setAlert] = useState(false);
    const [form, setForm] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [notification, setNotification] = useState();
    const [viewed, setViewed] = useState(false);
    const [unSeenNot, setUnSeenNot] = useState([]);
    const [popup, setPopUp] = useState(false);
    const {handleSearch} = React.useContext(SearchContext);
    const [close, setClose] = useState(true);


    useEffect(() => {
        axios.get(`${API}/user/${user?.user_id}/notifications`, {withCredentials: true})
            .then(response => {
                setNotification(response.data.notifications);
                setUnSeenNot(response.data.unseenNot);
            })
    }, []);

    const handleOpenNotifications = async () => {
        setOpenPopUp(!openPopUp);
        try {
            await axios.post(`${API}/user/readNotifications`, {withCredentials: true});
            setUnSeenNot([]);
        } catch (e) {
            console.error("erro a ler notificacoes")
        }
    }

    const togglePopUp = () => {
        setPopUp(!popup)
    }
    const toggleForm = () => {
        setForm(!form)
    }


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
            {unSeenNot.length > 0 && <div className="redDot"/>}
            <FontAwesomeIcon className={"b-icon"} icon={faBell} onClick={handleOpenNotifications}/>

            { openPopUp &&
                 <div className="menu-notification" >
                    {notification && notification.map((n, idx) => (
                        <Link to = {`/player/${n.video_id}`}><div className={"menu-item"} key={idx}>
                            Tens um {n.notification} de {n.sender}
                        </div></Link>
                    ))}
                </div>
            }


            <Link to={"/UserChannel"}><img className={"avatar"} src={user?.photo} alt={"user-photo"}/></Link>
            <div className={"dropdown"}>
                <Link onClick={togglePopUp}><FontAwesomeIcon className={"sort-icon"} icon={faSortDown}/></Link>
                {popup && <div className={"dropdown-content"}>
                    <div className={"menu-item"}><Link to="/UserChannel">Canal</Link></div>
                    <div className={"menu-item"}><Link to="/studio">Estúdio</Link></div>
                    <div className={"menu-last-item"} onClick={toggleForm}>Enviar Feedback</div>
                        { form && <FeedbackForm/>}
                </div>}
            </div>
        </div>)}
    </div>
}


export default Header;