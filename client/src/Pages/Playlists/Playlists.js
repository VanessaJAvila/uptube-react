//export default defaultBackendURL = ´localhost:4000´
//export default videosURL = defaultBackendURL + ´video´
// fazer um file se possivel com todos os endpoints vindos da base de dados e chamar depois nos files necessarios
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Header from "../../Layout/Header";
import {Redirect, useHistory} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import "./Playlists.scss";
import {faEllipsis, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PlaylistCard from "../../components/PlaylistCard/PlaylistCard.js"



function Playlists() {
    const {user} = React.useContext(UserContext);
    const history = useHistory();
    const [playlists, setplaylists] = useState([]);
    const [eachVideoDuration, setEachVideoDuration] = useState([]);
    const [playlistDuration, setPlaylistDuration] = useState(0);
    const [videoDuration, setVideoDuration]= useState(0);
    //const[public, setPublic] =useState("");

    //console.log(user, "user Playlists");
    //console.log(user?.user_id);



    useEffect(() => {
        if(!user) return;
        axios.get('http://localhost:5000/playlist/user/'+user.user_id,{withCredentials: true})
            .then(response => {
                console.log('rsp', response.data);
                setplaylists(response.data);
            }).catch(e => console.log(e, "erro playlist")) ;
    }, [user]);

    //todo adicionar o a duração da playlist, de momento não consigo fazer
    useEffect(() => {
        if(!user) return;
        axios.get('http://localhost:5000/playlist/user/'+user.user_id+`/duration/`,{withCredentials: true})
            .then(response => {
                console.log('rsp each video duration', response.data);

                response.data.map(d =>{


                    return d.duration
                });
            }).catch(e => console.log(e, "erro playlist")) ;
    }, [user]);



    if(!user){
        return <h2>Awaiting user....</h2>
    }

/*
playlist title, playlist owner, count videos in playlist, duração da , dias desde a criação

    function toSeconds(s) {
        let p = s.split(':');
        return parseInt(p[0], 10) * 3600 + parseInt(p[1], 10) * 60 + parseInt(p[2], 10);
    }

    eachVideoDuration.map((d)=>  {

        setVideoDuration(videoDuration + toSeconds(d.duration))

    } )

 */




    return <div className={"Playlists"}>
        <Header/>
        <SideBar/>
        <div className={"container-playlist"}>
            <h1>As suas Playlists</h1>
            <div className={"box-playlist"}>

                {playlists.map(p => {
                    return <PlaylistCard  key={p.playlist_id}
                                              id = {p.playlist_id}
                                              thumbnail = {p.thumbnail}
                                              photo = {user.photo}
                                              name = {user.name}
                                              title ={p.title}
                                              duration = {playlistDuration}
                                              timestamp = {p.timestamp}
                    />}
                )}


            </div>



        </div>
    </div>}

export default Playlists;
