import React, {useEffect, useState} from "react";
import axios from "axios";
import {Redirect, Route, useHistory} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import Register from "../Register/Register";
import "./Delete.scss";

//localhost port for api
const  API  = process.env.REACT_APP_API;

function Delete() {
    const {user} = React.useContext(UserContext);
    const history = useHistory();

    ////console.log(user, "user to be Delete")
    if (!user) {
        return <h2>Awaiting user....</h2>
    }



    let handleClick = async (e) => {

        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();


        axios.post(`${API}/user/delete`, true, {
            withCredentials: true
        })
            .then((res) => {
                ////console.log(res.data, "User Delete");
                ////console.log(user, "user info");
                alert("Your account has been Deleted");
                history.replace("/Login");
                //setIsLoading(false);
            }).catch((error) => {
            ////console.log(error, "messagem erro delete frontend");
             history.replace("/Delete");
        });


    }


    return <div className = "login">

        <div className="container">
            <h1> Are you sure you wish to Delete your account? </h1>
            <h2> Your comments, replies and videos will be permanently deleted.</h2>
            <button onClick={handleClick}><strong>Click here to Delete permanently your account</strong> </button>
        </div>
    </div>

}

export default Delete;