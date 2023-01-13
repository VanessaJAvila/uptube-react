import "./UserChannel.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {UserContext} from "../../Providers/UserContext";
import stalkerorange from "../../Assets/stalkerorange.svg";
import risingstar from "../../Assets/risingstar.svg";
import beloved from "../../Assets/beloved.svg";
import rocket from "../../Assets/rocket.svg";
import influencer from "../../Assets/influencer.svg";
import VideoCard from "../../Assets/Components/VideoCard/VideoCard"
import { faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import {faPenToSquare, faPen, faXmark} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";
import PlaylistCard from "../../Assets/Components/PlaylistCard/PlaylistCard";

//localhost port for api
const  API  = process.env.REACT_APP_API;

export default function UserChannel() {
    const {user} = React.useContext(UserContext);
    const [achis, setAchis] = useState([]);
    const [subs, setSubs] = useState([]);
    const [videos, setVideos] = useState([]);
    const [stats, setStats] = useState({});
    const [userChannel, setUserChannel] = useState();
    const [edit, setEdit] = useState(false);
    const [showAchis, setShowAchis] = useState(true)
    const [showUp, setShowUp] = useState(true)
    const [showPlay, setShowPlay] = useState(true)
    const [showAchievement,setShowAchievement] = useState(true)
    const [playlists, setplaylists] = useState([]);
    const [criarPlaylist, setCriarPlaylist] = useState(false);
    const [title, setTitle]= useState("");
    const [gPlaylists,setGPlaylists] = useState([]);
    const[GuestPlaylists,  setGuestPlaylists] = useState([]);

    let gpf = [];


    let userId = 0;
    if (user && user.user_id) {
        userId = user.user_id;
    }

    const HideAchiv = () => {
        setShowAchievement(!showAchievement)
        console.log(showAchievement)
    }


    const HideOrShowAchis = () => {
        setShowAchis(!showAchis)
    }

    const HideOrShowUploads = () => {
        setShowUp(!showUp)
    }

    const HideOrShowPlay = () => {
        setShowPlay(!showPlay)
    }

    const toggleEdit = () => {
        setEdit(!edit)

    }

    const history = useHistory();

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const getDateString = (date) => {
        return date.getDay() + " de " + months[date.getMonth()] + " de " + date.getFullYear()
    }

    useEffect(() => {
        axios.get(`${API}/user/${user?.user_id}`)
            .then(response => {
                setUserChannel(response.data);
            }).catch(e => console.log(e));
    }, [user]);

    useEffect(() => {
        if(!user) return;
        axios.get(`${API}/playlist/user/`,{withCredentials: true})
            .then(response => {
                setplaylists(response.data);
            })
            .catch(e => console.log(e, "erro playlistssssssssssss")) ;
        axios.get(`${API}/playlist/guest/playlists`,{withCredentials: true})
            .then(response => {
                console.log(response.data)
                setGPlaylists(response.data);
            }).catch(e => console.log(e, "No G playlists")) ;
    }, [user]);

    useEffect(() => {
        axios.get(` ${API}/video/user/${user?.user_id}`)
            .then(response => {
                setVideos(response.data);
            }).catch(e => console.log(e));
    }, [user]);

    useEffect(() => {
        axios.get(`${API}/user/stats/${user?.user_id}`)
            .then(response => {
                setStats(response.data.user_report[0]);
            }).catch(e => console.log(e));
    }, [user]);


    useEffect(() => {
        axios.get(`${API}/subscriptions/${user?.user_id}`)
            .then(response => {
                setSubs(response.data);
            }).catch(e => console.log(e));
    }, [user]);

    useEffect(() => {
        axios.get(`${API}/achievements/${user?.user_id}`)
            .then(response => {
                setAchis(response.data);
            }).catch(e => console.log(e));
    }, [user]);

    if(!user) return null
console.log("videos", videos)

    return <div className={'user-channel-container'}>
        <Header/>
        <SideBar/>
        <div className={"container-channel-wrapper"}>
        <div className={"user-details"}>
                <div className={"channel-bg"}
                     style={{backgroundImage: `url(${user?.header})`}}>
                    {edit && <Link to={"/Profile"}><FontAwesomeIcon className={"edit-bg-icon"} icon={faPenToSquare}/></Link>}
            </div>
            <div className={'edit-user-details'}>
                    <div className={"edit"} onClick={toggleEdit}>
                        <p className={"edit-text"}>Editar canal</p>
                        <FontAwesomeIcon className={"icon"} icon={faPenToSquare}/>
                    </div>
                <div className={"user-bio"}><h4>{user?.name}</h4>
                    <p className={"bio"}>{user?.bio}</p>
                    {edit &&
                        <Link to={"/Profile"}><FontAwesomeIcon className={"edit-user-data-icon"} icon={faPen}/></Link>}
                </div>
                <div className={"stats-user"}>
                    <div className={"followers"}>
                        <p> Subscritores</p>
                        <p>{stats.followers}</p>
                    </div>
                    <div className={"views"}>
                        <p>Visualizações</p>
                        <p>{stats.views}</p>
                    </div>
                    <div className={"videos"}>
                        <p>Videos</p>
                        <p>{stats.videos}</p>
                    </div>
                <div className={"user-data"}>
                    {edit && <Link to={"/Profile"}><FontAwesomeIcon className={"edit-avatar-icon"}
                                                                       icon={faPenToSquare}/></Link>}
                    <img className={"avatar"} src={user?.photo} alt={"user-photo"}/>


                    </div>
                </div>
            </div>
        </div>

            <div className={"achi-title"}><h2>Achievements {setEdit &&
                <FontAwesomeIcon className={"hide-icon"} icon={faEyeSlash} onClick={HideOrShowAchis}/>}</h2></div>
            {showAchis && <div className={"achievements"}>
                {achis.some(e => e.achievement === 'Só a começar') ? <div className={'starting'}>
                    <img className={"começar"} src={rocket}/><p>Just Starting</p></div> : null}
                {achis.some(e => e.achievement === 'Adoram-me' && e.ranking === '5 likes') && showAchievement ?
                    <div className={'loved'}>
                        <div>
                            <img className={"adoram-me bronze"} src={beloved}/>
                            <p>Adoram-me</p>
                        </div>
                    </div>
                    : null
                }
                {achis.some(e => e.achievement === 'Adoram-me' && e.ranking === '20 likes') ? <div className={'loved'}>
                    <img className={"adoram-me prata"} src={beloved}/><p>Adoram-me</p></div> : null}
                {achis.some(e => e.achievement === 'Adoram-me' && e.ranking === '100 likes') ?
                    <div className={'goldLoved'}>
                        <img className={"adoram-me ouro"} src={beloved}/><p>Adoram-me</p></div> : null}
                {achis.some(e => e.achievement === 'Influencer' && e.ranking === '50 views') ?
                    <div className={'bronzeInflu'}>
                        <img className={"Influencer bronze"} src={influencer}/><p>Influencer</p></div> : null}
                {achis.some(e => e.achievement === 'Influencer' && e.ranking === '200 views') ?
                    <div className={'silverInflu'}>
                        <img className={"Influencer prata"} src={influencer}/><p>Influencer</p></div> : null}
                {achis.some(e => e.achievement === 'Influencer' && e.ranking === '1000 views') ?
                    <div className={'goldInflu'}>
                        <img className={"Influencer ouro"} src={influencer}/><p>Influencer</p></div> : null}
                {achis.some(e => e.achievement === 'Rising star' && e.ranking === '20 followers') ?
                    <div className={'goldRising'}>
                        <img className={"Rising ouro"} src={risingstar}/><p>Rising Star</p></div> : null}
                {achis.some(e => e.achievement === 'Rising star' && e.ranking === '5 followers') ?
                    <div className={'silverRising'}>
                        <img className={"Rising prata"} src={risingstar}/><p>Rising Star</p></div> : null}
                {achis.some(e => e.achievement === 'Rising star' && e.ranking === '1 followers') ?
                    <div className={'bronzeRising'}>
                        <img className={"Rising bronze"} src={risingstar}/><p>Rising Star</p></div> : null}
                {achis.some(e => e.achievement === 'Socielate' && e.ranking === '200 comments') ? <div>
                    <img className={"Socielate ouro"} src={beloved}/></div> : null}
                {achis.some(e => e.achievement === 'Socielate' && e.ranking === '50 comments') ? <div>
                    <img className={"Socielate prata"} src={beloved}/></div> : null}
                {achis.some(e => e.achievement === 'Socielate' && e.ranking === '10 comments') ? <div>
                    <img className={"Socielate bronze"} src={beloved}/></div> : null}
                {achis.some(e => e.achievement === 'Stalker' && e.ranking === '20 subscriptions') ?
                    <div className={'goldStalker'}>
                        <img className={"Stalker ouro"} src={stalkerorange}/><p>Stalker</p></div> : null}
                {achis.some(e => e.achievement === 'Stalker' && e.ranking === '10 subscriptions') ?
                    <div className={'silverStalker'}>
                        <img className={"Stalker prata"} src={stalkerorange}/></div> : null}
                {achis.some(e => e.achievement === 'Stalker' && e.ranking === '5 subscriptions') ?
                    <div className={'bronzeStalker'}>
                        <img className={"Stalker bronze"} src={stalkerorange}/></div> : null}
            </div>}

            <div className={"upload-title"}><h2>Uploads  {setEdit && <FontAwesomeIcon className={"hide-icon"} icon={faEyeSlash} onClick={HideOrShowUploads}/>}</h2></div>
               {showUp &&  <div className={"container-uploads"}>
                 {!videos && <p>A carregar...</p>}
                 {videos && <>
                     {videos.length === 0 && <p className={"no results"}>Partilha o teu 1º video?</p>}
                     {videos.slice(0, 4).map((v, idx) => (<div className={"user-video"}><VideoCard type="channel" key={idx} {...v}/></div>))}
                 </>}
             </div>}

            <div className={"play"}><h2 >Playlists  {setEdit && <FontAwesomeIcon className={"hide-icon"} icon={faEyeSlash} onClick={HideOrShowPlay}/>}</h2></div>
        { showPlay && <div className={"container-playlists"}>
            {playlists.map((p) => {

                let filteredGuest=  GuestPlaylists.filter(guestP => guestP.playlist_id === p.playlist_id)
                gpf.push(filteredGuest);
                //   console.log(filteredGuest,gpf,"gpf")

                return <div className={"user-play"}><PlaylistCard  key={p.playlist_id+1500}
                                      id = {p.playlist_id}
                                      creator_id = {p.creator_id}
                                      thumbnail = {p.thumbnail}
                                      name = {user.name}
                                      title ={p.title}
                                      duration = {p.duration}
                                      timestamp = {p.timestamp}
                                      guestPlaylists={filteredGuest}
                /></div>}
            )}



        </div>}
             <div className={"container-subs-stats"}>
                 <h4 className={"subs-text"}>Subscrições</h4>
                 <div className={"subs"}>
                     {subs && subs.slice(0, 4).map((s, idx) => (
                         <div className="list" key={idx} onClick={() => {
                             history.push(`/Channel/${s.channel}`)}}>
                             <img className={"photo-chan"} src={s.avatar} alt="channel"/>
                             <p className={"channel"}>{s.username}</p>
                         </div>
                     ))}
                 </div>
                 <h4 className={"about-text"}>Acerca</h4>
                 <div className={"stats"}>
                     <p className={"date"}>Canal criado a {getDateString(new Date(user?.account_opening))}</p>
                     <p className={"stats-st-data"}>{stats.videos} videos carregados</p>
                     <p className={"stats-data"}>{stats.playlists} playlists criadas</p>
                     <p className={"stats-data"}>{stats.views} visualizações no total</p>
                     <p className={"stats-data"}>{stats.followers} subscritores</p>

                 </div>

             </div>
         </div>
    </div>}
