import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Header from "../../Layout/Header";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import "./Playlist.scss";

import {faEllipsis, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

//localhost port for api
const  API  = process.env.REACT_APP_API;

function Playlist() {
    const {user} = React.useContext(UserContext);
    const history = useHistory();
    const [playlist, setplaylist] = useState(null);


    //console.log(user, "user Playlists");
    //console.log(user?.user_id);


    const {playlist_id} = useParams();

    useEffect(() => {
        axios.get(`${API}/playlist/${playlist_id}`,{withCredentials: true})
            .then(response => {
                console.log('rsp playlist', response.data[0]);
                setplaylist(response.data[0]);
            }).catch(e => console.log(e, "erro playlist")) ;
    }, []);



    if(!user){
        return <h2>Awaiting user....</h2>
    }
    if(!playlist){
        return <h2>Awaiting playlist....</h2>
    }


    //


    return <div className={"Playlist"}>
        <Header/>
        <SideBar/>
        <div className={"container-playlist"}>
            <h1>As musicas da playlist</h1>
            <div className={"box-playlist"}>
                <h1>{playlist.title}</h1>
            </div>

        </div>
    </div>}

export default Playlist;