//export default defaultBackendURL = ´localhost:4000´
//export default videosURL = defaultBackendURL + ´video´
// fazer um file se possivel com todos os endpoints vindos da base de dados e chamar depois nos files necessarios
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Header from "../../Layout/Header";
import {Redirect, useHistory} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import "./Playlist.scss";
import VideoCard from "../../Components/VideoCard/VideoCard";
import {faEllipsis, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


/*
        "date": "2022-11-18T00:00:00.000Z",
        "description": "",
        "duration": "00:00:00",
        "popularity": 0,
        "thumbnail": "",
        "title": " A maria vai á fonte",
        "url_video": "",
        "user_id": 4,
        "video_id": 5,
        "likes": 0,
        "comments": 1,
        "views": 0,
        "username": "Sandra chan",
        "photo": "url/pastas/imagens/imagem3"
    },
 */

function Playlist() {
    const {user, setUser} = React.useContext(UserContext);
    const history = useHistory();
    const [videos, setVideos] = useState([]);
    const [playlists, setplaylists] = useState([]);
    //const[public, setPublic] =useState("");

    //console.log(user, "user Playlist");
    //console.log(user?.user_id);



    useEffect(() => {
        if(!user) return;
        axios.get('http://localhost:5000/playlist/user/'+user.user_id,{withCredentials: true})
            .then(response => {
                //console.log('rsp', response.data);
                setplaylists(response.data);
            }).catch(e => console.log(e, "erro playlist")) ;
    }, [user]);



    if(!user){
        return <h2>Awaiting user....</h2>
    }

/*
title, date, duration, thumbnail, likes, comments, views, username, photo, type
 */


    return <div className={"Playlist"}>
        <Header/>
        <SideBar/>
        <div className={"container-playlist"}>
            <h1>As suas Playlists</h1>
            <div className="geral">
                {playlists.map((playlist) => (<h1> {playlist.playlistTitle} {playlists.map((playlist,idx) => (<VideoCard type="geral" key={idx} {...playlist}/>))}</h1>))}
            </div>
        </div>
    </div>}

export default Playlist;
