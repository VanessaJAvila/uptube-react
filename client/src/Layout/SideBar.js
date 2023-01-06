import "./SideBar.scss";
import React, {useEffect, useState} from "react";
import {UserContext} from "../Providers/UserContext";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faClapperboard,
    faClockRotateLeft,
    faFire,
    faGear,
    faHouse,
    faPlay,
    faRightFromBracket,
    faVideo
} from "@fortawesome/free-solid-svg-icons";
import {Link, useHistory} from "react-router-dom";

function SideBar() {

    const {user, setUser} = React.useContext(UserContext);
    const [tags, setTags] = useState([]);
    const [page, setPage] = useState(1);

    const history = useHistory();

    let handleTags = (tag) => {
        console.log(tag)
        if (tags) {
            history.push("/SearchResults?tag="+tag.name);
        }
    }
    console.log(tags)

    useEffect(() => {
        axios
            .get("http://localhost:5000/tags")
            .then((response) => {
                setTags(response.data);
            })
            .catch((error) => {
                console.log(error, "Error fetching tags");
            });
    }, []);

    useEffect(() => {
        setPage(1);
    }, [tags])


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
            //console.log(error)
            history.replace("/Home");
        });
    }

    return <div className={"SideBar"}>
                {user && <div className={"User"}><Link to={"/Profile/"}>
                    <img className={"avatar"} src = {user?.photo} alt={"user-photo"}/>
            <div className={"Name"}>
                {user?.name}
                <div className={"username"}>
                    {user?.username}
                </div>
            </div>
        </Link>
        </div>}

        <div className={"container-public-home"}>
            <div className={"Início"}>
            <Link to={"/Home"}><FontAwesomeIcon icon={faHouse}/>
                <p>Início</p></Link>
            </div>
            <div className={"Tendências"}>
                <Link to={"./Home"}><FontAwesomeIcon icon={faFire}/></Link>
                <p>Tendências</p>
            </div>
            {!user && <div className={"Canais"}>
                <Link to={"/Channels"}><FontAwesomeIcon icon={faClapperboard}/></Link>
                <p>Canais</p>
            </div>}
        </div>

        {user && <div className={"container-user"}>
            <div className={"Histórico"}>
                <Link to={"./Home"}><FontAwesomeIcon icon={faClockRotateLeft}/></Link>
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
                {Object.values(tags).map((tag, idx) => (
                    <div key={idx}>
                        <button onClick={() => handleTags(tag)} value={tag.name}>
                            {tag.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
        {user && <div className={"container-home-2"}>
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