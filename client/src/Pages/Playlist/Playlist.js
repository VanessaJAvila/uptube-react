import React, {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import Header from "../../Layout/Header";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import "./Playlist.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";


//localhost port for api
const  API  = process.env.REACT_APP_API;

function Playlist() {
    const {user} = React.useContext(UserContext);
    const history = useHistory();
    const [playlist, setplaylist] = useState(null);
    const [playlists, setplaylists] = useState(null);
    const [movie,setMovie] = useState(null);
    const [dropdownState, setDropdownState] = useState(null);
    const [addMusicDropdown, setAddMusicDropdown] = useState(false);
    const [pmovies,setPMovies] = useState(null);
    const closeDrop = useRef(null)



    const closeOpenMenus = (e)=>{
        if(closeDrop.current && dropdownState && !closeDrop.current.contains(e.target)){
            console.log(e.target);
            setDropdownState(null);
            setAddMusicDropdown(false);
            setPMovies(null);
        }
    }



    document.addEventListener('mousedown',closeOpenMenus)




    const {playlist_id} = useParams();

    useEffect(() => {
        axios.get(`${API}/playlist/${playlist_id}`,{withCredentials: true})
            .then(response => {
                console.log('rsp playlist', response.data,`${API}${response.data[0].videoUrl}`);
                setplaylist(response.data);
                setMovie( `${API}${response.data[0].videoUrl}`)
            }).catch(e => console.log(e, "erro playlist")) ;
    }, []);


    useEffect(() => {
        if(!user) return;
        axios.get(`${API}/playlist/user/`+user.user_id,{withCredentials: true})
            .then(response => {
                console.log('setplaylists', response.data);
                setplaylists(response.data);
            }).catch(e => console.log(e, "erro playlist")) ;
    }, [user]);




    if(!user){
        return <h2>Awaiting user....</h2>
    }
    if(!playlist){
        return <h2>Awaiting playlist....</h2>
    }



    return <div className={"Playlist"}>
        <Header/>
        <SideBar/>
        <div className={"container-playlist"}>
            <h1>As musicas da playlist</h1>
            <div className={"box-playlist"}>
                <video src={movie} width="650" height="500" controls></video>
                <div className={"nextContainer"} ref={closeDrop}>
                   <h1>{playlist[0].playlistTitle}</h1>
                    <div>
                        {playlist.map((p,idx) => {
                            return <div key={idx} className={"movieDiv"} >
                                    <div>
                                        <img onClick={()=>setMovie(`${API}${p.videoUrl}`)} src={p.thumbnail} alt="no photo"/>
                                        <p>{p.duration}</p>
                                    </div>
                                        <div  className={"videoInfo"}>
                                            <h2 >{p.videoTitle}</h2>
                                            <h3>{p.username}</h3>
                                            <FontAwesomeIcon onClick={()=>setDropdownState(idx)} className="dropbtn" icon={faGear}></FontAwesomeIcon>
                                            {dropdownState===idx&&<div className="dropdown-content">
                                                <p onClick={
                                                    async (e) => {
                                                        e.preventDefault();
                                                        setAddMusicDropdown(true);
                                                     await axios.get(`${API}/playlist/moviesinplaylist/`+ p.video_id +'/' + user.user_id)
                                                            .then(response => {
                                                                setPMovies(response.data);
                                                            }).catch(e => console.log(e, "erro playlist")) ;

                                                    }
                                                }>adicionar/remover da(s) playlist(s)</p>

                                                {
                                                    addMusicDropdown && pmovies&& <div className={"addMusic"} >
                                                        {
                                                            playlists.map((play,ix) => {
                                                                const handleChange = (e) => {
                                                                    e.preventDefault();
                                                                    if(e.target.innerHTML==="+"){
                                                                        let addMusicToPlaylist = {
                                                                            playlist_id: play.playlist_id,
                                                                            video_id: p.video_id
                                                                        }

                                                                        axios.post(`${API}/playlist/addmusic`,addMusicToPlaylist, {
                                                                            withCredentials: true
                                                                        })
                                                                            .then((res) => {
                                                                                alert("video added to playlist successfully");
                                                                                console.log(res.data);
                                                                            }).catch((error) => {
                                                                            console.log(error, "messagem erro");
                                                                        });
                                                                    }
                                                                    if(e.target.innerHTML ==="X"){
                                                                        let deletePlay = {
                                                                            user_id: user.user_id,
                                                                            creator_id: p.creator_id,
                                                                            playlist_id: p.playlist_id,
                                                                            video_id: p.video_id
                                                                        }

                                                                        axios.post(`${API}/playlist/remove`,deletePlay, {
                                                                            withCredentials: true
                                                                        })
                                                                            .then((res) => {
                                                                                alert("video removed successfully");
                                                                                console.log(res.data);
                                                                            }).catch((error) => {
                                                                            console.log(error, "messagem erro");
                                                                        });

                                                                    }


                                                                }
                                                                let lists = [];
                                                               if(pmovies.includes(play.playlist_id)){
                                                                   lists.push(<p  key={ix} onClick={handleChange}><strong>X</strong></p>)
                                                               } else {

                                                                   lists.push(<p  key={ix} onClick={handleChange}><strong>+</strong></p>)
                                                               }
                                                               return <div className={"musicAdded"}  key={play.playlist_id} id={play.playlist_id} >
                                                                        <p>{play.title}</p>
                                                                        {lists}
                                                                    </div>
                                                            })
                                                        }
                                                        <div>Criar Nova playlist e add music</div>
                                                    </div>
                                                }
                                            </div>
                                            }
                                        </div>

                            </div>}
                        )}
                    </div>
                </div>
            </div>

        </div>
    </div>}

export default Playlist;