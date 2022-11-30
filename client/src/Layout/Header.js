import "./Header.scss";
import {UserContext} from "../Providers/UserContext";
import logo from "./logo.svg";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import{faCircleUser} from "@fortawesome/free-regular-svg-icons"

function Header() {

    const [filter, setFilter] = useState("");
    const [search,setSearch] =  useState("");
    const [page, setPage] = useState(1);
    const {user, setUser} = React.useContext(UserContext);


    useEffect(() => {
        axios.get('http://localhost:3000/video', {params: {search}, withCredentials: true})
            .then(response => {
                setSearch(response.data)
            });
    }, []);

    useEffect(() => {
        setPage(1);
    }, [filter])


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
        <div className={"login"}>
            <a href="/login">
            <input className={"button"} type="button" value="Iniciar Sessão"/>
                <FontAwesomeIcon className={"l-icon"} icon={faCircleUser}/></a>
        </div>

    </div>
}

export default Header;