import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Header from "../../Layout/Header";
import {Link, Redirect, useHistory, useParams} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import "./Playlist.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faGear,faCheck} from "@fortawesome/free-solid-svg-icons";
import { createPopper } from '@popperjs/core';
import VideoStreamingPage from "../VideoStreamingPage/VideoStreamingPage";
import ReportVideo from "../VideoStreamingPage/Report/Report";
import getDaySeen from "../../Utils/getDaySeen";
import LikeButton from "../VideoStreamingPage/LikeButton/LikeButton";
import DislikeButton from "../VideoStreamingPage/DislikeButton/DislikeButton";
import Description from "../VideoStreamingPage/Description/Description";
import CreateComment from "../VideoStreamingPage/CreateComment/CreateComment";




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
    const[visibility, setVisibility] =useState("public");
    const [title, setTitle]= useState("");
    const [thumb,setThumb]= useState("");
    const [videoadd,setvideoadd]= useState("");
    const[guestPlaylistDrop, setGuestPlaylistDrop] = useState(false);
    const[gPlaylist,setGPlaylist] = useState(null);
    const[gpmovies, setGPMovies] = useState([]);
    const [tags, setTags] = useState([]);
    const [videoId, setVideoId] = useState(null);
    const [comments, setComments] = useState([])
    const [videos, setVideos] = useState([]);
    const [mensagem,setMensagem] = useState("");

/*
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


 */


    let handleSubmit = async (e) => {
        e.preventDefault();
        let newPlaylist = {
            title: title,
            creator_id: user.user_id,
            visibility:visibility,
            thumbnail: `${API}`+thumb
        }
        axios.post(`${API}/playlist/create`, newPlaylist, {
            withCredentials: true
        })
            .then((res) => {
                let addMusic = {
                    playlist_id: res.data.playlist_id,
                    video_id: videoadd
                }
                axios.post(`${API}/playlist/addmusic`,addMusic, {
                    withCredentials: true
                })
                    .then((res) => {
                        setMensagem("Playlist Created and music added")
                        setTitle("");
                    }).catch((error) => {
                    console.log(error, "messagem erro");
                    setMensagem("video não foi adicionado");
                });
            }).catch((error) => {
           setMensagem("ERRO");
        });
    }



    const {playlist_id} = useParams();

    useEffect(() => {
        axios.get(`${API}/playlist/${playlist_id}`,{withCredentials: true})
            .then(response => {
                setplaylist(response.data);
                console.log(response.data[0].video_id,"ajfbkjdsnfkjdsnfkjdsnfkjn")
                setMovie( `${API}${response.data[0].videoUrl}`)
                setVideoId(response.data[0].video_id);
                if(!videoId)return;
                axios.get(`${API}/video/${videoId}/tags`)
                    .then((response) => {
                        // Update the tags state variable with the video tags data
                        setTags(response.data);
                        //console.log(tags,videoId)
                    })
                axios
                    .get(`${API}/video/videoinfocomment/${videoId}`)
                    .then(async(response) => {
                        // Update thevideoInfo state variable with the video data, !important data[0] so that it retrieves the array
                        setVideos(response.data.video_info[0]);
                        setComments(response.data.video_comments);
                        //setUserFollowedId(response.data[0].user_id)
                        console.log(videos,response.data.video_info[0])
                    })
            }).catch(e => console.log(e)) ;
    }, [dropdownState,videoId,user]);



    const handleNewComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };



    useEffect(() => {
        axios.get(`${API}/playlist/user/`,{withCredentials: true})
            .then(response => {
                setplaylists(response.data);
            }).catch(e => console.log(e, "erro playlist")) ;
    }, [user,dropdownState]);





    useEffect(() => {
        axios.get(`${API}/playlist/guest/`,{withCredentials: true})
            .then(response => {
                setGPlaylist(response.data);
            }).catch(e => console.log(e, "erro playlist")) ;
    }, [user]);






    if(!user){
        return <h2>Awaiting user....</h2>
    }


    if(!playlist||!videoId){
        return     <Link to={"/playlists"}>
            <h1>Esta playlist está vazia carrega aqui para voltar ás playlists</h1>
        </Link>
    }



    return <div className={"Playlist"}>
        <Header/>
        <SideBar/>

        <div className={"container-playlist"}>
            <h1>As musicas da playlist</h1>
            <div className={"box-playlist"}>
                <div className={"movieAndInfoContainer"}>
                    <video src={movie} width="650" height="500" controls></video>
                    <div className={"video-tags"}>
                        {tags && tags.map((tag, idx) => {
                            return <p key={tag + "_" + idx} className={'tag'}>#{tag.name}</p>
                        })}
                        {!tags &&  <p>Sem tags</p>}
                    </div>
                    <div className={"video-info"}>
                        <div className={"video-info-1"}>
                            <div className="video-title">
                                {videos ? videos.title : 'Loading...'}
                            </div>
                            <div className={"report"}>
                                <ReportVideo videoId={videoId} reporterId={user.user_id}/>                                </div>
                        </div>
                        <div className={"channel-info-1"}>

                            <div className="channel-info-1-a">
                                <Link to={"/Channel"}>
                                    <div className={"avatar"}>
                                        <img src={API+videos.photo} alt=""/>
                                    </div>
                                </Link>
                            </div>
                            <div className="video-info-container">

                                    <div className="video-info-container-row-1">
                                        <Link to={"/canal"}>
                                            <p className={"video-channel-username"}>{videos.username}</p>
                                        </Link>

                                    </div>
                                    <div className="video-info-container-row-2">
                                        <p className={"views-days-posted"}>
                                            {videos.views} visualizações | {getDaySeen(videos.date)}
                                        </p>
                                    </div>

                            </div>
                            <div className={"reactions"}>
                                <LikeButton videoId={videoId} likeCount={videos.likes}/>
                                <DislikeButton videoId={videoId} dislikeCount={videos.dislikes}/>
                            </div>
                        </div>
                    </div>
                    <Description id={videoId} description={videos.description} />
                    <div className={"comments-container"}>
                        {user && (
                            <div className={"new-comment"}>
                                <div
                                    className={"new-comment-user-photo"}
                                    style={{backgroundImage: `url(${user.photo})`}}>
                                </div>
                                <CreateComment videoId={videoId} handleNewComment={handleNewComment}/>
                            </div>
                        )}
                        {!user && "login para comentar"}
                        {comments && <div className={"video-comments"}>
                            {comments.map((comment, idx) => {
                                return  <div key={idx} className={'video-comment'}>
                                    <div className={'user-comment-photo'} style={{backgroundImage: `url(${comment.photo})`}}></div>
                                    <div className={'user-comment-inner-container'}>
                                        <div className={'user-comment-content'}>
                                            <p className={'user-comment-username'}>{comment.name}</p>
                                            <p className={'comment-time-from-now'}>{getDaySeen(comment.timestamp)}</p>
                                        </div>
                                        <div className={'comment-text'}>
                                            <p>{comment.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>}
                    </div>
                </div>
                <div className={"nextContainer"}>
                   <h1>{playlist[0].playlistTitle}</h1>
                    <div>
                        {playlist.map((p,idx) => {
                            return <div key={idx} className={"movieDiv"} >
                                    <div className={"imgContainer"}>
                                        <img onClick={()=>{
                                            setMovie(`${API}${p.videoUrl}`);
                                            setVideoId(p.video_id);
                                        }} src={`${API}${p.thumbnail}`} alt="no photo"/>
                                        <p>{p.duration}</p>
                                    </div>

                                            <div className={"videoText"}>
                                                <p >{p.videoTitle}</p>
                                                <h5>{p.videoCreator}</h5>
                                            </div>
                                            <FontAwesomeIcon onClick={()=>{
                                                setDropdownState(idx)
                                            }} className="dropbtn" icon={faGear}></FontAwesomeIcon>
                                            {dropdownState===idx&&<div id="tooltip" role="tooltip" className="dropdown-content">
                                                {mensagem && <div id={"comms"} onClick={()=>{
                                                    setDropdownState(null);
                                                    setAddMusicDropdown(!addMusicDropdown);
                                                    setMensagem("");
                                                }}> <p>{mensagem} </p>
                                                    <p className={"okaydiv"}>OK</p>
                                                </div>}
                                                <p onClick={
                                                    async (e) => {
                                                        e.preventDefault();
                                                        setAddMusicDropdown(true);
                                                     await axios.get(`${API}/playlist/moviesinplaylist/`+ p.video_id)
                                                            .then(response => {
                                                                setPMovies(response.data);
                                                            }).catch(e => {
                                                                setPMovies(null);
                                                             console.log(e, "erro playlist") ;
                                                         })

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
                                                                                setMensagem("video added to playlist successfully");
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
                                                                                setMensagem("video removed successfully");
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
                                                        }} className={"criarNovaplaylist"}>Criar Nova playlist e add music</div>



                                                        { createDrop && <div className={"inputCreatePlaylist"}>

                                                                <form onSubmit={handleSubmit}>
                                                                    <div className="inputContainer">
                                                                        <input type="text" onChange={e => setTitle(e.target.value)} value={title} id="title"
                                                                               name="title" placeholder="title" required/>
                                                                    </div>

                                                                    <div>
                                                                        <select id="visibility" onChange={e => setVisibility(e.target.value)} name ="visibility">
                                                                            <option value="Public">Public</option>
                                                                            <option value="Private">Private</option>
                                                                        </select>
                                                                    </div>
                                                                    <button type="submit">Gravar Alterações</button>
                                                                </form>
                                                        </div>}

                                                    </div>
                                                }
                                                {
                                                    addMusicDropdown && !pmovies&& <div className={"addMusic"} >
                                                        {
                                                         playlists &&   playlists.map((play,ix) => {
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
                                                                                setMensagem("video adicionado com sucesso!");
                                                                            }).catch((error) => {
                                                                            setMensagem("video falhou a adicionar á playlist")
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
                                                                                setMensagem("video removed successfully");
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
                                                                if(gpmovies.length > 0 && pmovies){
                                                                    if(pmovies.includes(play.playlist_id)){
                                                                        lists.push(<p  key={ix} onClick={handleChange}><strong>X</strong></p>)
                                                                    } else {
                                                                        lists.push(<p  key={ix} onClick={handleChange}><strong>+</strong></p>)
                                                                    }
                                                                } else {
                                                                    setDropdownState(null);
                                                                    setAddMusicDropdown(false);
                                                                    setGuestPlaylistDrop(false);
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
                                                        }} className={"criarNovaplaylist"}>Criar Nova playlist e add music</div>
                                                        { createDrop && <div className={"inputCreatePlaylist"}>

                                                            <form onSubmit={handleSubmit}>
                                                                <div className="inputContainer">
                                                                    <input type="text" onChange={e => setTitle(e.target.value)} value={title} id="title"
                                                                           name="title" placeholder="title" required/>
                                                                </div>

                                                                <div>
                                                                    <select id="visibility" onChange={e => setVisibility(e.target.value)} name ="visibility">
                                                                        <option value="Public">Public</option>
                                                                        <option value="Private">Private</option>
                                                                    </select>
                                                                </div>
                                                                <button type="submit">Gravar Alterações</button>
                                                            </form>
                                                        </div>}

                                                    </div>
                                                }


                                                <div className={"playlistGuest"} onClick={async(e)=> {
                                                    e.preventDefault();
                                                    setGuestPlaylistDrop(true);
                                                    await axios.get(`${API}/playlist/gmoviesinplaylist/`+ p.video_id)
                                                        .then(response => {
                                                            setGPMovies(response.data);
                                                        }).catch(e => console.log(e, "erro playlist")) ;
                                                }}>Playlists Guest</div>
                                                {
                                                    guestPlaylistDrop && gpmovies && <div>
                                                        {gPlaylist && gPlaylist.map((gp,i)=>{
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
                                                                            setMensagem("video adicionado com sucesso á playlist!");
                                                                        }).catch((error) => {
                                                                      setMensagem("Video não foi adicionado");
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
                                                                           setMensagem("video removed successfully");
                                                                        }).catch((error) => {
                                                                        console.log(error, "messagem erro");
                                                                    });
                                                                }
                                                            }
                                                            let lists = [];
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
                                                                                setMensagem("video added to playlist successfully");
                                                                                console.log(res.data);
                                                                            }).catch((error) => {
                                                                            setMensagem(error, "messagem erro");
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
                                                                                setMensagem("video removido com sucesso");
                                                                            }).catch((error) => {
                                                                            setMensagem("Não foi possivel remover o video");
                                                                        });
                                                                    }
                                                                }

                                                                let lists = [];
                                                                lists.push(<p  key={i} onClick={handleGChange}><strong>X</strong></p>)
                                                                return <div className={"musicGAdded"}  key={g.playlist_id} id={g.playlist_id} >
                                                                    <p>{g.title}</p>
                                                                    {lists}
                                                                </div>
                                                            }))
                                                        }
                                                    </div>
                                                }

                                                <p onClick={async (e)=>{


                                                    setDropdownState(null);
                                                    setAddMusicDropdown(false);
                                                    setGuestPlaylistDrop(false);
                                                    e.preventDefault();
                                                    await axios.get(`${API}/playlist/moviesinplaylist/`+ p.video_id +'/' + user.user_id)
                                                        .then(response => {
                                                            setPMovies(response.data);
                                                        }).catch(e => console.log(e, "erro playlist")) ;


                                                }
                                                } className={"close"} > close </p>
                                            </div>
                                            }


                            </div>}
                        )}
                    </div>
                </div>
            </div>

        </div>

    </div>}

export default Playlist;