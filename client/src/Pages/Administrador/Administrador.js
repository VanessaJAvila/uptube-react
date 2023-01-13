import Report from "../VideoStreamingPage/Report/Report";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link, Redirect, useHistory} from 'react-router-dom';
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import "./Administrador.scss";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faGear, faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import Header from "../../Layout/Header";
import VideoStreamingPage from "../VideoStreamingPage/VideoStreamingPage";


//localhost port for api
const API = process.env.REACT_APP_API;
function Administrador() {
    const {user} = React.useContext(UserContext);
    const [reports,setReports]= useState([]);



    useEffect( () => {
        axios.get(`${API}/reports/all`)
            .then((response) => {
                console.log("response.data", response.data[0].details)
               setReports(response.data)
            })
            .catch((e) => {
                console.log(e)
            });

    }, [user,reports]);

    if(!user || !reports) {
        return <h1>You are no allowed to acess this page</h1>
    }


    return <div className={"adminContainer"}>
        <Header/>
        <SideBar/>
        <div className={"reportersDetails"}>
            <h1> Reported People</h1>
            {
                reports.map((r,i)=>{
                    return <div key={i}>
                        <h1>{r.reporter_id}-{r.details}</h1>
                    </div>
                })
            }
        </div>

    </div>
}


export default Administrador;
