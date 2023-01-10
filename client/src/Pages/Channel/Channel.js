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
import socialite from "../../Assets/socialite.svg";
import VideoCard from "../../Assets/Components/VideoCard/VideoCard"
import {faBookmark, faEyeSlash, faTrashCan} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";

//localhost port for api
const API = process.env.REACT_APP_API;

export default function UserChannel() {

    const [achis, setAchis] = useState([]);
    const [subs, setSubs] = useState([]);
    const [videos, setVideos] = useState([]);
    const [stats, setStats] = useState({});
    const [channel, setChannel] = useState([]);

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


    if (!videos || !achis || !stats || !channel) return null;


    return <div className={'channel-container'}>
        <Header/>
        <SideBar/>
        <div className={"channel-details"}>
            <div className={"channel-layer-bg"}>
                <div className={"channel-header"}
                     style={{backgroundImage: `url(${channel.header})`}}>
                </div>
            </div>
            <div className={"channel-data"}>
                <img className={"channel-avatar"} src={channel.photo} alt={"channel-photo"}/>
                <h4 className={"channel-name"}>{channel.name}</h4>
                <p className={"channel-bio"}>{channel.bio}</p>
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

        <h2>Achievements</h2>
        <div className={"achievements"}>
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
            {achis.some(e => e.achievement === 'Só a começar') ?
                <div className={'starting'}><img className={"começar"} src={rocket}/><p>Just Starting</p></div> : null}

        </div>
        <h2 className={"upload"}>Uploads </h2>
        {/*  <div className={"geral"}>
                 {!videos && <p>A carregar...</p>}
                 {videos && <>
                     {videos.length === 0 && <p className={"no results"}>Partilha o teu 1º video?</p>}
                     {videos.map((v, idx) => (<VideoCard type="geral"  {...v}/>))}
                 </>}
             </div>*/}
        <h2 className={"playlist"}>Playlists</h2>
        <div className={"container-playlists"}>
            <VideoCard></VideoCard>
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
}
