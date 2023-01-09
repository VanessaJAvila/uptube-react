import "./Channel.scss";
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
import socialite from "../../Assets/socialite.svg";
import VideoCard from "../../Assets/Components/VideoCard/VideoCard"
import {faBookmark, faEyeSlash, faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {faPenToSquare, faPen, faUser, faGear, faX} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";

//localhost port for api
const  API  = process.env.REACT_APP_API;

export default function Channel() {
    const {user, setUser} = React.useContext(UserContext);
    const [achis, setAchis] = useState([]);
    const [subs, setSubs] = useState([]);
    const [videos, setVideos] = useState([]);
    const [stats, setStats] = useState({});
    const [channel, setChannel] = useState([]);
    const [edit, setEdit] = useState(false);
    const [showElement, setShowElement] = useState(false)
    const [updateUserUsername, setUpdateUserUsername] = useState(user?.username);
    const [updateUserPhoto, setUpdateUserPhoto] = useState();
    const [updateUserBio, setUpdateUserBio] = useState(user?.bio);
    const [updateUserHeader, setUpdateUserHeader] = useState(user?.header);

    const showOrHide = () => setShowElement(true)

    const history = useHistory();

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


    const getDateString = (date) => {
        return date.getDay() + " de " + months[date.getMonth()] + " de " + date.getFullYear()
    }


    const {user_id} = useParams();

    useEffect(() => {
        axios.get(`${API}/user/${user_id}`)
            .then(response => {
                setChannel(response.data);
            }).catch(e => console.log(e));
    }, []);

    console.log("channel" + channel)

    {/*  let updateUserInfo = {
        username: updateUserUsername,
        bio: updateUserBio,
    }

    axios.post('http://localhost:5000/user/' + user.user_id + '/edit', updateUserInfo, {
        withCredentials: true
    })
        .then((res) => {
            setUser(updateUserInfo);
        }).catch((error) => {
        //console.log(error.response.data, "nao fizeste edit profile");
        alert("error: " + error.response.data)
        //  history.replace("/Register")
    });

    const formData = new FormData();
    formData.append("photo", updateUserPhoto);*/}


    {/*Axios.post('http://localhost:5000/user/' + user.user_id + '/edit/upload/avatar', formData, {
        withCredentials: true
    })
        .then((res) => {
            //console.log(res, "upload res");
        }).catch((error) => {
        //console.log(error.response.data, "nao editaste a photo");
        alert("error: " + error.response.data)
        //  history.replace("/Register")
    });


    {/*const formDataHead = new FormData();
    formDataHead.append("photo", updateUserHeader);

    axios.post('http://localhost:5000/user/'+user.user_id+'/edit/upload/header',formDataHead, {
        withCredentials: true
    })
        .then((res) => {
            //console.log(res, "upload res");
        }).catch((error) => {
        //console.log(error.response.data, "nao editaste a photo");
        alert("error: "+ error.response.data)
        //  history.replace("/Register")
    });
}*/}

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


    if (!videos || !achis || !stats || !subs || !channel) return null;

    return <div className={'channel-container'}>
        <Header/>
        <div className={"Sidebar"}><SideBar/></div>
        <div className={"user-details"}>

            <div className={"layer-bg"}>
                <div className={"channel-bg"}
                     style={{backgroundImage: `url(${user?.header})`}}>
                    {setEdit &&
                        <Link to={"/Profile"}><FontAwesomeIcon className={"edit-bg-icon"} icon={faPenToSquare}/></Link>}
                </div>
            </div>
            <div className={'edit-user-details'}>
                    <div className={"edit"} onClick={() => setEdit(true)}>
                        <p className={"edit-text"}>Editar Canal</p>
                        <Link to={"/Profile"}><FontAwesomeIcon className={"icon"} icon={faPenToSquare}/></Link>
                    </div>
                <div className={"user-data"}>
                    {setEdit && <Link to={"/Profile"}><FontAwesomeIcon className={"edit-avatar-icon"}
                                                                       icon={faPenToSquare}/></Link>}
                    <img className={"avatar"} src={user?.photo} alt={"user-photo"}/>
                    {setEdit &&
                        <Link to={"/Profile"}><FontAwesomeIcon className={"edit-user-data-icon"} icon={faPen}/></Link>}
                    <h4 className={"username"}>{user?.name}</h4>
                    <p className={"bio"}>{user?.bio}</p>
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
                    </div>
                </div>
            </div>
        </div>

             <h2>Achievements {setEdit && <FontAwesomeIcon className={"hide-icon"} icon={faEyeSlash}/>}</h2>
             <div className={"achievements"}>
                  {achis.some(e => e.achievement === 'Adoram-me'&& e.ranking === '5 likes') ? <div className={'loved'}>
                     <img className={"adoram-me bronze"} src={beloved}/><p>Adoram-me</p></div>: null}
                 {achis.some(e => e.achievement === 'Adoram-me'&& e.ranking === '20 likes') ? <div className={'loved'}>
                     <img className={"adoram-me prata"} src={beloved}/><p>Adoram-me</p></div>: null}
                 {achis.some(e => e.achievement === 'Adoram-me'&& e.ranking === '100 likes') ? <div className={'loved'}>
                     <img className={"adoram-me ouro"} src={beloved}/><p>Adoram-me</p></div>: null}
                 {achis.some(e => e.achievement === 'Influencer' && e.ranking === '50 views') ? <div className={'bronzeInflu'}>
                     <img className={"Influencer bronze"} src={influencer}/><p>Influencer</p></div>: null}
                 {achis.some(e => e.achievement === 'Influencer'&& e.ranking === '200 views') ? <div className={'silverInflu'}>
                     <img className={"Influencer prata"} src={influencer}/><p>Influencer</p></div>: null}
                 {achis.some(e => e.achievement === 'Influencer'&& e.ranking === '1000 views') ? <div className={'goldInflu'}>
                     <img className={"Influencer ouro"} src={influencer}/><p>Influencer</p></div>: null}
                 {achis.some(e => e.achievement === 'Rising star'&& e.ranking === '20 followers') ? <div className={'goldRising'}>
                     <img className={"Rising ouro"} src={risingstar}/><p>Rising Star</p></div>: null}
                 {achis.some(e => e.achievement === 'Rising star'&& e.ranking === '5 followers') ? <div className={'silverRising'}>
                     <img className={"Rising prata"} src={risingstar}/><p>Rising Star</p></div>: null}
                 {achis.some(e => e.achievement === 'Rising star'&& e.ranking === '1 followers') ? <div className={'bronzeRising'}>
                     <img className={"Rising bronze"} src={risingstar}/><p>Rising Star</p></div>: null}
                 {achis.some(e => e.achievement === 'Socielate'&& e.ranking === '200 comments') ? <div>
                     <img className={"Socielate ouro"} src={beloved}/></div>: null}
                 {achis.some(e => e.achievement === 'Socielate'&& e.ranking === '50 comments') ? <div>
                     <img className={"Socielate prata"} src={beloved}/></div>: null}
                 {achis.some(e => e.achievement === 'Socielate'&& e.ranking === '10 comments') ? <div>
                     <img className={"Socielate bronze"} src={beloved}/></div>: null}
                 {achis.some(e => e.achievement === 'Stalker'&& e.ranking === '20 subscriptions') ? <div className={'goldStalker'}>
                     <img className={"Stalker ouro"} src={stalkerorange}/><p>Stalker</p></div>: null}
                 {achis.some(e => e.achievement === 'Stalker'&& e.ranking === '10 subscriptions') ? <div className={'silverStalker'}>
                     <img className={"Stalker prata"} src={stalkerorange}/></div>: null}
                 {achis.some(e => e.achievement === 'Stalker'&& e.ranking === '5 subscriptions') ? <div className={'bronzeStalker'}>
                     <img className={"Stalker bronze"} src={stalkerorange}/></div>: null}
                 {achis.some(e => e.achievement === 'Só a começar') ? <div className={'starting'}><img className={"começar"} src={rocket}/><p>Just Starting</p></div>: null}

             </div>
             <h2 className={"upload"}>Uploads  {setEdit && <FontAwesomeIcon className={"hide-icon"} icon={faEyeSlash}/>}</h2>
        {/*  <div className={"geral"}>
                 {!videos && <p>A carregar...</p>}
                 {videos && <>
                     {videos.length === 0 && <p className={"no results"}>Partilha o teu 1º video?</p>}
                     {videos.map((v, idx) => (<VideoCard type="geral"  {...v}/>))}
                 </>}
             </div>*/}
             <h2 className={"playlist"}>Playlists  {setEdit && <FontAwesomeIcon className={"hide-icon"} icon={faEyeSlash}/>}</h2>
             <div className={"container-playlists"}>
                 <VideoCard></VideoCard>
             </div>
        <div className={"container-subs-stats"}>
            <h4 className={"subs-text"}>Subscrições</h4>
            <div className={"subs"}>
                {subs.map((s, idx) => {
                    return (
                        <div className="list"  key={s + idx} onClick={() => {
                            channel.map((c, idx) => {
                                history.push(`/user/${c.user_id}`)
                            })}}>
                            <img className="photo-chan" src={s.avatar} alt="channel" />
                            <p className="channel">{s.username}</p>
                        </div>
                    )
                })}
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
         </div>}
