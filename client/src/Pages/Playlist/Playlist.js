import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Header from "../../Layout/Header";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import "./Playlist.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faGear} from "@fortawesome/free-solid-svg-icons";
import { createPopper } from '@popperjs/core';




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
    const [createDrop, setCreateDrop] = useState(false);
    const [moviePath, setMoviePath] = useState(null);
    const[visibility, setVisibility] =useState("public");
    const [title, setTitle]= useState("");
    const [thumb,setThumb]= useState("");
    const [videoadd,setvideoadd]= useState("");
    const[guestPlaylistDrop, setGuestPlaylistDrop] = useState(false);
    const[gPlaylist,setGPlaylist] = useState(null);
    const[gpmovies, setGPMovies] = useState([]);


    //todo  como dar background color no video selected
    // criar caixa para criar playlist e add video
    // linha 257


    let handleSubmit = async (e) => {

        e.preventDefault();

        let newPlaylist = {
            title: title,
            creator_id: user.user_id,
            visibility:visibility,
            thumbnail: `${API}`+thumb
        }

        console.log(newPlaylist,"newplaylist")

        axios.post(`${API}/playlist/create`, newPlaylist, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data,playlist_id,"playlist id");
                let addMusic = {
                    playlist_id: res.data.playlist_id,
                    video_id: videoadd
                }
                console.log(addMusic,"add music obj");

                axios.post(`${API}/playlist/addmusic`,addMusic, {
                    withCredentials: true
                })
                    .then((res) => {
                        alert("playlist created and video added to playlist successfully");
                        console.log(res.data);
                    }).catch((error) => {
                    console.log(error, "messagem erro");
                    alert("video wasnt added to playlist successfully");
                });
            }).catch((error) => {
            console.log(error, "erro playlist create");
            alert("error: Wrong Credentials!");
        });



    }





//pooper
    const popcorn = document.querySelector('#popcorn');
    const tooltip = document.querySelector('#tooltip');

    createPopper(popcorn, tooltip, {
        placement: 'bottom',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
                preventOverflow:
                    {
                        enabled: true,
                        escapeWithReference: true ,
                        boundariesElement: 'viewport'},
            },
        ],
    });



    const {playlist_id} = useParams();

    useEffect(() => {
        axios.get(`${API}/playlist/${playlist_id}`,{withCredentials: true})
            .then(response => {
                console.log('rsp playlist', response.data,`${API}${response.data[0].videoUrl}`);
                setplaylist(response.data);
                setMovie( `${API}${response.data[0].videoUrl}`)
                setMoviePath(`${API}${response.data[0].videoUrl}`)
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


    useEffect(() => {
        if(!user) return;
        axios.get(`${API}/playlist/guest/`+ user.user_id,{withCredentials: true})
            .then(response => {
                setGPlaylist(response.data);
                console.log(response.data, "setGplaylist")
            }).catch(e => console.log(e, "erro playlist")) ;
    }, [user]);






    if(!user){
        return <h2>Awaiting user....</h2>
    }


    if(!playlist){
        return <h2>THERE IS NO VIDEOS IN PLAYLIST</h2>
    }


    return <div className={"Playlist"}>
        <Header/>
        <SideBar/>
        <div className={"container-playlist"}>
            <h1>As musicas da playlist</h1>
            <div className={"box-playlist"}>
                <video src={movie} width="650" height="500" controls></video>
                <div className={"nextContainer"}>
                   <h1>{playlist[0].playlistTitle}</h1>
                    <div>
                        {playlist.map((p,idx) => {
                            return <div key={idx} className={"movieDiv"} >
                                    <div className={"imgContainer"}>
                                        <img onClick={()=>{
                                            setMovie(`${API}${p.videoUrl}`);
                                        }} src={`${API}${p.thumbnail}`} alt="no photo"/>
                                        <p>{p.duration}</p>
                                    </div>
                                        <div className={"videoInfo"}>
                                            <div className={"videoText"}>
                                                <h2 >{p.videoTitle}</h2>
                                                <h3>{p.videoCreator}</h3>
                                            </div>
                                            <FontAwesomeIcon onClick={()=>{
                                                setDropdownState(idx)
                                            }} className="dropbtn" icon={faGear}></FontAwesomeIcon>
                                            {dropdownState===idx&&<div id="tooltip" role="tooltip" className="dropdown-content">
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

                                                                        if(p.video_id===playlist[0].video_id) {
                                                                            //todo update imagem to 1st of line
                                                                        }

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
                                                        <div onClick={()=> {
                                                            setCreateDrop(true);
                                                            setThumb(p.thumbnail);
                                                            setvideoadd(p.video_id);
                                                        }}>Criar Nova playlist e add music</div>


                                                        { createDrop && <div>
                                                            <div id="tooltip" role="tooltip">
                                                                <form onSubmit={handleSubmit}>
                                                                    <div className="inputContainer">
                                                                        <input type="text" onChange={e => setTitle(e.target.value)} value={title} id="title"
                                                                               name="title" placeholder="title" required/>
                                                                        <FontAwesomeIcon className="icons" icon={faEnvelope}/>
                                                                    </div>

                                                                    <div>
                                                                        <select id="visibility" onChange={e => setVisibility(e.target.value)} name ="visibility">
                                                                            <option value="Public">Public</option>
                                                                            <option value="Private">Private</option>
                                                                        </select>
                                                                    </div>
                                                                    <button type="submit">Gravar Alterações</button>
                                                                </form>
                                                            </div>
                                                        </div>}
                                                    </div>
                                                }
                                                {
                                                    addMusicDropdown && !pmovies&& <div className={"addMusic"} >
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

                                                                        if(p.video_id===playlist[0].video_id) {
                                                                            //todo update imagem to 1st of line
                                                                        }

                                                                    }
                                                                }
                                                                let lists = [];
                                                                if(gpmovies.length > 0){
                                                                    if(pmovies.includes(play.playlist_id)){
                                                                        lists.push(<p  key={ix} onClick={handleChange}><strong>X</strong></p>)
                                                                    } else {
                                                                        lists.push(<p  key={ix} onClick={handleChange}><strong>+</strong></p>)
                                                                    }
                                                                } else {
                                                                    lists.push(<p  key={ix} onClick={handleChange}><strong>+</strong></p>)
                                                                }


                                                                return <div className={"musicAdded"}  key={play.playlist_id} id={play.playlist_id} >
                                                                    <p>{play.title}</p>
                                                                    {lists}
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                }


                                                <div onClick={async(e)=> {
                                                    e.preventDefault();
                                                    setGuestPlaylistDrop(true);
                                                    await axios.get(`${API}/playlist/gmoviesinplaylist/`+ p.video_id +'/' + user.user_id)
                                                        .then(response => {
                                                            setGPMovies(response.data);
                                                            console.log(gpmovies, "gpmovies",response.data, "gmovi data")
                                                        }).catch(e => console.log(e, "erro playlist")) ;
                                                }}>Playlists Guest</div>

                                                {
                                                    guestPlaylistDrop && gpmovies && <div>
                                                        {gPlaylist.map((gp,i)=>{
                                                            const handleGChange = (e) => {
                                                                e.preventDefault();
                                                                if(e.target.innerHTML==="+"){
                                                                    let addGMusicToPlaylist = {
                                                                        playlist_id: gp.playlist_id,
                                                                        video_id: p.video_id
                                                                    }

                                                                    axios.post(`${API}/playlist/guest/addmusic`,addGMusicToPlaylist, {
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
                                                                    let deleteGPlay = {
                                                                        user_id: user.user_id,
                                                                        creator_id: gp.creator_id,
                                                                        playlist_id: gp.playlist_id,
                                                                        video_id: p.video_id
                                                                    }

                                                                    axios.post(`${API}/playlist/guest/remove`,deleteGPlay, {
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
                                                            console.log(gpmovies,"gpmovies");
                                                            console.log(gp,"gp");
                                                            if(gpmovies.length > 0){
                                                                if(gpmovies.includes(gp.playlist_id)){
                                                                    lists.push(<p  key={i} onClick={handleGChange}><strong>X</strong></p>)
                                                                } else {

                                                                    lists.push(<p  key={i} onClick={handleGChange}><strong>+</strong></p>)
                                                                }
                                                            } else {

                                                                lists.push(<p  key={i} onClick={handleGChange}><strong>+</strong></p>)
                                                            }


                                                            return <div className={"musicGAdded"}  key={gp.playlist_id} id={gp.playlist_id} >
                                                                <p>{gp.title}</p>
                                                                {lists}
                                                            </div>
                                                        })
                                                        }
                                                    </div>
                                                }

                                                {
                                                    guestPlaylistDrop && !gpmovies && <div>
                                                        {
                                                            gPlaylist.map(((g,i)=>{
                                                                const handleGChange = (e) => {
                                                                    e.preventDefault();
                                                                    if(e.target.innerHTML==="+"){
                                                                        let addGMusicToPlaylist = {
                                                                            playlist_id: g.playlist_id,
                                                                            video_id: p.video_id
                                                                        }

                                                                        axios.post(`${API}/playlist/guest/addmusic`,addGMusicToPlaylist, {
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
                                                                        let deleteGPlay = {
                                                                            user_id: user.user_id,
                                                                            creator_id: g.creator_id,
                                                                            playlist_id: g.playlist_id,
                                                                            video_id: p.video_id
                                                                        }

                                                                        axios.post(`${API}/playlist/guest/remove`,deleteGPlay, {
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
                                                                lists.push(<p  key={i} onClick={handleGChange}><strong>+</strong></p>)
                                                                return <div className={"musicGAdded"}  key={g.playlist_id} id={g.playlist_id} >
                                                                    <p>{g.title}</p>
                                                                    {lists}
                                                                </div>
                                                            }))
                                                        }
                                                    </div>
                                                }

                                                <p onClick={async (e)=>{

                                                    console.log(e.target);
                                                    setDropdownState(null);
                                                    setAddMusicDropdown(false);
                                                    setGuestPlaylistDrop(false);
                                                    e.preventDefault();
                                                    await axios.get(`${API}/playlist/moviesinplaylist/`+ p.video_id +'/' + user.user_id)
                                                        .then(response => {
                                                            setPMovies(response.data);
                                                        }).catch(e => console.log(e, "erro playlist")) ;


                                                }
                                                }> close </p>
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