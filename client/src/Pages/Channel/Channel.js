import "./Channel.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import React from "react";
import {UserContext} from "../../Providers/UserContext";
import {useHistory} from "react-router-dom";



 export default function Channel() {
     const {user, setUser,filter} = React.useContext(UserContext);
     const history = useHistory()

     return <div className={'channel'}>
     <Header/>
     <div className={"Sidebar"}><SideBar/></div>
         <div className={"user-details"}>
             <div className={"channel-bg"} style={{backgroundImage:'url("https://www.google.com/search?q=stranger+hacks&sxsrf=ALiCzsamSY3NLEAfvKO7mbqAdFt7K90iqw:1670178909558&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjChfakzeD7AhUygXMKHWhkBgAQ_AUoAXoECAEQAw&biw=1536&bih=714&dpr=1.25#imgrc=64ZKOnBc5c01LM")'}}></div>
             <h2>{user?.name}</h2>

         </div>
     </div>

 }