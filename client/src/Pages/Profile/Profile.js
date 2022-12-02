import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Redirect, useHistory} from "react-router-dom";
import {UserContext} from "../Providers/UserContext";
import Profile from "./Profile.scss"

export default function Profile() {

    const {user, setUser} = React.useContext(UserContext);

    useEffect(() => {
        axios.post(`http://localhost:5000/user/:user_id/edit`)
            .then(response => {
                console.log(setUser);
                setUser(response.data);
            }).catch(e => console.log(e)) ;
    }, []);


  return <div className={"profile"}>


  </div>

}

