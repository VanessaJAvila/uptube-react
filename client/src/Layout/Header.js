import "./Header.scss";
import {UserContext} from "../Providers/UserContext";
import logo from "./logo.svg";
import {Link, useHistory} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSortDown} from "@fortawesome/free-solid-svg-icons";
import {faCircleUser, faBell} from "@fortawesome/free-regular-svg-icons"
import axios from "axios";


function Header() {

    const {user} = React.useContext(UserContext);
    const [search,setSearch] =useState("");
    const [page, setPage] = useState(1);
    const [videos, setVideos] = useState([]);
    const history = useHistory();

    let handleSearch = async (e) => {
        setSearch(e.target.value)
        if(search) {
            history.push("/SearchResults")
        }}


    useEffect(() => {
        axios
            .get("http://localhost:5000/video/search", {
                params: { page, search},
                withCredentials: true,
            })
            .then((response) => {
                setVideos(page === 1 ? response.data : [...videos, ...response.data]);
            })
            .catch((error) => {
                console.log(error, "Error fetching search results");
            });
    }, [page, search]);


    return <div className={"Header"}>
        <div className={"logo"}>
            <img src={logo} alt="logo UpTube"/>
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