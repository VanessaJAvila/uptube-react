import React, {useEffect, useState} from "react";
import axios from "axios";
import {Redirect, Route, useHistory} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import Register from "../Register/Register";
import "./Delete.scss";


function Delete() {

    const history = useHistory();
    const {user, setUser} = React.useContext(UserContext);
    const {isLoading,setIsLoading} = React.useContext(UserContext);

    return <div className = "login">

        <div className="container">

            <h1> Are you sure you wish to Delete your account? </h1>

        </div>;
    </div>

}

export default Delete;