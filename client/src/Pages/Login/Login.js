

import React, {useEffect, useState} from "react";
import axios from "axios";
import {Redirect, Route, useHistory} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import Register from "../Register/Register";
import "./Login.scss";

import logo from "../../Layout/logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey, faUser} from "@fortawesome/free-solid-svg-icons";

function Login() {

    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const history = useHistory();
    const {user, setUser} = React.useContext(UserContext);
    const {isLoading,setIsLoading} = React.useContext(UserContext);
    let handleSubmit = async (e) => {

        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();

        let newUser = {
            email: newUserEmail,
            password: newUserPassword
        }

        axios.post('http://localhost:5000/user/Login', newUser, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data.user, "messagem login frontend");
                setUser(res.data.user);
                //setIsLoading(false);
                history.replace("/Home");
            }).catch((error) => {
            console.log(error, "messagem erro login frontend");
          //  history.replace("/Login");
            alert("error: Wrong Credentials!");
        });
    }

/*
    if (user) {
        history.replace("/Home");
    }


 */

    return <div className = "login">

        <div className="container">
            <div className={"logo"}>
                <img src={logo} alt ="logo UpTube"/>
            </div>
            <h1>Fazer Login </h1>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <input type="email" onChange={e => setNewUserEmail(e.target.value)} value={newUserEmail} id="email"
                           name="email" placeholder="email" required/>
                    <FontAwesomeIcon className="icons" icon={faEnvelope}/>
                </div>
                <div className="inputContainer" id="pwContainer">
                    <input type="password" onChange={e => setNewUserPassword(e.target.value)} value={newUserPassword}
                           id="password" name="password" placeholder="Password" required/>
                    <FontAwesomeIcon className="icons" icon={faKey}/>
                </div>
                <a id="forgotPw" href="/RecoverPassword">Esqueceu-se da Password?</a>
                <button type="submit">Login</button>
                <a href="/Register">Criar Conta</a>

                <div className="google">
                    <button type="submit" >Entrar com Google</button>
                </div>
            </form>


        </div>;
    </div>

}

export default Login;