import "./Channel.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import stalkerorange from "../../Assets/stalkerorange.svg";
import risingstar from "../../Assets/risingstar.svg";
import beloved from "../../Assets/beloved.svg";
import rocket from "../../Assets/rocket.svg";
import influencer from "../../Assets/influencer.svg";

import VideoCard from "../../Assets/Components/VideoCard/VideoCard"
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";
import {faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import PlaylistCard from "../../Assets/Components/PlaylistCard/PlaylistCard";

//localhost port for api
const API = process.env.REACT_APP_API;

export default function UserChannel() {

    const [achis, setAchis] = useState([]);
    const [videos, setVideos] = useState([]);
    const [stats, setStats] = useState({});
    const [channel, setChannel] = useState([]);
    const [playlists, setplaylists] = useState([]);
    const [criarPlaylist, setCriarPlaylist] = useState(false);
    const [title, setTitle]= useState("");
    const [gPlaylists,setGPlaylists] = useState([]);
    const[GuestPlaylists,  setGuestPlaylists] = useState([]);
    let gpf = [];
    const {user_id} = useParams();

    const history = useHistory();

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


    const getDateString = (date) => {
        return date.getDay() + " de " + months[date.getMonth()] + " de " + date.getFullYear()
    }


    useEffect(() => {
        axios.get(`${API}/user/channel/${user_id}`)
            .then(response => {
                setChannel(response.data[0]);
            }).catch(e => console.log(e));
    }, [user_id]);

    console.log("channel", channel)


    useEffect(() => {
        axios.get(` ${API}/video/user/${user_id}`)
            .then(response => {
                setVideos(response.data);
            }).catch(e => console.log(e));
    }, [user_id]);

    useEffect(() => {
        axios.get(`${API}/achievements/${user_id}`)
            .then(response => {
                setAchis(response.data);
            }).catch(e => console.log(e));
    }, [user_id]);


    useEffect(() => {
        axios.get(`${API}/user/stats/${user_id}`)
            .then(response => {
                setStats(response.data.user_report[0]);
            }).catch(e => console.log(e));
    }, [user_id]);

    useEffect(() => {
        axios.get(`${API}/playlist/user`,{withCredentials: true})
            .then(response => {
                setplaylists(response.data);
            })
            .catch(e => console.log(e, "erro playlistssssssssssss")) ;
        axios.get(`${API}/playlist/guest/playlists`,{withCredentials: true})
            .then(response => {
                console.log(response.data)
                setGPlaylists(response.data);
            }).catch(e => console.log(e, "No G playlists")) ;
    }, [user_id]);
if(!channel){
 return <Link to={"/Home/"}>
      <h1>Este user nao tem canal</h1>
  </Link>
}

    return <div className={'channel-container'}>
        <Header/>
        <SideBar/>
        <div className={"container-public-channel-wrapper"}>
        <div className={"channel-details"}>
                <div className={"channel-header"}
                     style={{backgroundImage: `url(${channel.header})`}}>
                </div>
            <div className={"channel-data"}>
                <img className={"channel-avatar"} src={channel.photo} alt={"channel-photo"}/>
                <div className={"channel-bio"}><h4 className={"channel-name"}>{channel.name}</h4>
                    <p>{channel.bio}</p></div>
                <div className={"stats-channel"}>
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
                </div>
            </div>
        </div>

            <div className={"achi-title"}><h2>Achievements</h2></div>
        <div className={"achievements"}>
            {achis.some(e => e.achievement === 'Só a começar') ?
                <div className={'starting'}><img className={"começar"} src={rocket}/><p>Just Starting</p></div> : null}
            {achis.some(e => e.achievement === 'Adoram-me' && e.ranking === '5 likes') ? <div className={'loved'}>
                <img className={"adoram-me bronze"} src={beloved}/><p>Adoram-me</p></div> : null}
            {achis.some(e => e.achievement === 'Adoram-me' && e.ranking === '20 likes') ? <div className={'loved'}>
                <img className={"adoram-me prata"} src={beloved}/><p>Adoram-me</p></div> : null}
            {achis.some(e => e.achievement === 'Adoram-me' && e.ranking === '100 likes') ? <div className={'loved'}>
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


        </div>
            <div className={"up-title"}>Uploads</div>
         <div className={"uploads"}>
                 {!videos && <p>Este canal não têm videos</p>}
                 {videos && <>
                     {videos.length === 0 && <p className={"no results"}>Partilha o teu 1º video?</p>}
                     {videos.slice(0, 4).map((v, idx) => (<div className={"channel-video"}><VideoCard type="channel"  {...v}/></div>))}
                 </>}
             </div>
            <div className={"playlist"}><h2>Playlists</h2></div>
          <div className={"container-playlists"}>
                {playlists.map((p) => {

                    let filteredGuest=  GuestPlaylists.filter(guestP => guestP.playlist_id === p.playlist_id)
                    gpf.push(filteredGuest);

                    return <div className={"channel-play"}><PlaylistCard  key={p.playlist_id+1500}
                                          id = {p.playlist_id}
                                          creator_id = {p.creator_id}
                                          thumbnail = {p.thumbnail}
                                          name = {channel.name}
                                          title ={p.title}
                                          duration = {p.duration}
                                          timestamp = {p.timestamp}
                                          guestPlaylists={filteredGuest}
                    /></div>}
                )}
            </div>
        <div className={"container-stats"}>
            <h4 className={"about-text"}>Acerca</h4>
            <div className={"stats"}>
                <p className={"date"}>Canal criado a {getDateString(new Date(channel.account_opening))}</p>
                <p className={"stats-st-data"}>{stats.videos} videos carregados</p>
                <p className={"stats-data"}>{stats.playlists} playlists criadas</p>
                <p className={"stats-data"}>{stats.views} visualizações no total</p>
                <p className={"stats-data"}>{stats.followers} subscritores</p>

            </div>
        </div>
        </div>
    </div>
}
