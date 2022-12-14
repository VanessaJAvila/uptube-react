import "./Channel.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import React, {useEffect, useState} from "react";
import {UserContext} from "../../Providers/UserContext";
import {useHistory} from "react-router-dom";
import avatar from "../../Assets/img1.jpg";
import Follower from "../../Assets/Follower.png";
import RisingStar from "../../Assets/RisingStar_Silver.png";
import VideoCard from "../../components/VideoCard/VideoCard"
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";



 export default function Channel() {
     const {user,search} = React.useContext(UserContext);
     const history = useHistory()

     const[achis,setAchis] =useState([]);
     const[subs,setSubss] =useState([]);
     const[stats,setStats] =useState({});


     useEffect(() => {
         axios.get(`http://localhost:5000/user/stats/${user?.user_id}`)
             .then(response => {
                 setStats(response.data.user_report[0]);
                 console.log("Stats", response.data.user_report[0]);
             }).catch(e => console.log(e)) ;
     }, []);


//todo fazer novo endpoint que retorne avatar e username dos canais seguidos
     /*useEffect(() => {
         axios.get(`http://localhost:5000/subscriptions/${user}`)
             .then(response => {
                 setStats(response.data);
             }).catch(e => console.log(e)) ;
     }, []);*/



     useEffect(() => {
         axios.get('http://localhost:5000/achievements/user')
             .then(response => {
                 setAchis(response.data)
             });
     }, []);

     //console.log(achis)
     if (!achis) return null;
     if (!stats) return null;
     if (!subs) return null;

     console.log(achis)

         return <div className={'channel-container'}>
             <Header/>
             <div className={"Sidebar"}><SideBar/></div>
             {user && <div className={"user-details"}>
                 <div className={"channel-bg"} style={{backgroundImage:'url("https://www.google.com/search?q=stranger+hacks&sxsrf=ALiCzsamSY3NLEAfvKO7mbqAdFt7K90iqw:1670178909558&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjChfakzeD7AhUygXMKHWhkBgAQ_AUoAXoECAEQAw&biw=1536&bih=714&dpr=1.25#imgrc=64ZKOnBc5c01LM")'}}></div>
                 <div className={"edit-user-details"}>
                     <div className={"edit"}>
                     <p className={"edit-text"}>Editar Canal</p>
                     <FontAwesomeIcon className={"icon"} icon={faPenToSquare}/>
                     </div>
                     <div className={"user-data"}>
                 <img className={"avatar"} src = {avatar} alt={"user-photo"}/>
                 <h4 className={"username"}>{user?.name}</h4>
                 <p className={"bio"}>{user?.bio}</p>
                     </div>
                 </div>
             </div>}

             <h2>Achievements</h2>
             <div className={"achievements"}>
                 <img className={"follower"} src = {Follower} alt={"follower achievement"}/>
                 <img className={"rising-star"} src = {RisingStar} alt={"rising star achievement"}/>
             </div>
             <h2 className={"upload"}>Uploads</h2>
             <div className={"container-uploads"}>
                 <VideoCard></VideoCard>
             </div>
             <h2 className={"playlist"}>Playlists</h2>
             <div className={"container-playlists"}>
                 <VideoCard></VideoCard>
             </div>
             <div className={"container-subs-stats"}>
                 <h4 className={"subs-text"}>Subscrições</h4>
                 <div className={"subs"}>

                 </div>
                 {/*//todo converter mês para string// */}
                 <h4 className={"about-text"}>Acerca</h4>}
                 <div className={"stats"}>
                     <p className={"date"}>Canal criado a {user?.account_opening.slice(0, 10)}</p>
                     <p className={"stats-st-data"}>{stats.videos}videos carregados</p>
                     <p className={"stats-data"}>{stats.playlists}playlists criadas</p>
                     <p className={"stats-data"}>{stats.views}visualizações no total</p>
                     <p className={"stats-data"}>{stats.followers}subscritores</p>

                 </div>

             </div>

         </div>

     }
