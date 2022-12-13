import "./SideBar.scss";
import React, {useEffect, useState} from "react";
import {UserContext} from "../Providers/UserContext";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faFire,
    faClapperboard,
    faClockRotateLeft,
    faPlay,
    faVideo,
    faGear, faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import {Link, useHistory} from "react-router-dom";
import avatar from "../Assets/img1.jpg";


function SideBar() {

    const {user, setUser} = React.useContext(UserContext);
    const [tags, setTags] = useState([])
    const history = useHistory();


    useEffect(() => {
        axios.get('http://localhost:5000/tags')
            .then(response => {
                setTags(response.data)
            });
    }, []);

    console.log(tags)


    let handleSubmit = async (e) => {
        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();
        axios.post('http://localhost:5000/user/Logout', true, {
            withCredentials: true
        })
            .then((res) => {
                setUser(null);
                history.replace("/Login");
            }).catch((error) => {
            console.log(error)
            history.replace("/Home");
        });
    }

    return <div className={"SideBar"}>
        {user &&  <div className={"User"}><Link to={"/Profile/"}>
            <img className={"avatar"} src = {avatar} alt={"user-photo"}/>
                <div className={"Name"}>
                    {user?.name}
                    <div className={"username"}>
                    {user?.username}
                </div>
            </div></Link>
        </div>}

        <div className={"container-public-home"}>
            <div className={"Início"}>
            <Link to={"/Home"}><FontAwesomeIcon icon={faHouse}/>
                <p>Início</p></Link>
            </div>
        <div className={"Tendências"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faFire}/></Link>
            <p>Tendências</p>
        </div>
        <div className={"Canais"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faClapperboard}/></Link>
            <p>Canais</p>
        </div>
        </div>

        {user && <div className={"container-user"}>
            <div className={"Histórico"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faClockRotateLeft}/></Link>
                <p>Histórico</p>
        </div>
        <div className={"Playlists"}>
            <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faPlay}/></Link>
            <p>Playlists</p>
        </div>
        </div>}
        <div className={"Tags"}>
            <h4>Tags</h4>
            <div className={"tag"}>
                    {tags.map (tag => {
                     return <Link to="/video">
                    <button>{tag.name}</button>
                        </Link>
                    })}
            </div>
        </div>
        {user &&  <div className={"container-home-2"}>
        <div className={"Estudio"}>
        <Link to={"./Pages/Home"}><FontAwesomeIcon icon={faVideo}></FontAwesomeIcon></Link>
        <p>Estúdio</p>
            </div>
        <div className={"Definições"}>
            <Link to={"/Profile"}><FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
            <p>Definições</p></Link>
            </div>
        <div className={"Logout"} onClick={handleSubmit}>
            <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
            <p>Terminar sessão</p>
            </div>
    </div>}
    </div>

}

export default SideBar;