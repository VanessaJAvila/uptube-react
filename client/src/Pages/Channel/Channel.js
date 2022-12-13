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
import VideoCard from "../../Components/VideoCard/VideoCard"
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";



 export default function Channel() {
     const {user,search} = React.useContext(UserContext);
     const history = useHistory()
     const[achis,setAchis] =useState([]);



     useEffect(() => {
         axios.get('http://localhost:5000//achievements/user')
             .then(response => {
                 setAchis(response.data)
             });
     }, []);

     console.log(achis)

         return <div className={'channel'}>
             <Header/>
             <div className={"Sidebar"}><SideBar/></div>
             {user && <div className={"user-details"}>
                 <div className={"channel-bg"} style={{backgroundImage:'url("https://www.google.com/search?q=stranger+hacks&sxsrf=ALiCzsamSY3NLEAfvKO7mbqAdFt7K90iqw:1670178909558&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjChfakzeD7AhUygXMKHWhkBgAQ_AUoAXoECAEQAw&biw=1536&bih=714&dpr=1.25#imgrc=64ZKOnBc5c01LM")'}}></div>
                 <div className={"edit-channel"}>
                     <p className={"edit"}>Editar Canal</p>
                     <FontAwesomeIcon className={"icon"} icon={faPenToSquare}/>
                 </div>

                 <img className={"avatar"} src = {avatar} alt={"user-photo"}/>
                 <h4>{user?.name}</h4>
                 <p>{user?.bio}</p>
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
         </div>

     }
