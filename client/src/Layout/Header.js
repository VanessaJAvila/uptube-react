import "./Header.scss";
import logo from "./logo.svg";
import {useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import{faCircleUser} from "@fortawesome/free-regular-svg-icons"
function Header() {

    const [filter, setFilter] = useState("");

    return <div className={"Header"}>
        <div className={"logo"}>
        <img src={logo} alt ="logo UpTube"/>
        </div>
            <div className={"searching"}>
                <FontAwesomeIcon className={"s-icon"} icon={faMagnifyingGlass}/>
                <input className={"search"}
                       type="text"
                       placeholder={"Pesquisar"}
                       onChange={e => setFilter(e.target.value)}/>
            </div>
        // If public homepage---->Login button

        <div className={"login"}>
            <input className={"button"} type="button" value="Iniciar Sessão" onClick="msg()"/>
            <FontAwesomeIcon className={"l-icon"} icon={faCircleUser}/>
        </div>

        //If user homepage


        //If mobile homepage
    </div>
}

export default Header;