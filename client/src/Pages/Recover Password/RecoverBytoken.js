import React, {useEffect, useState} from "react";
import axios from "axios";
import {Redirect, Route, useHistory, useParams} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import "./RecoverBytoken.scss"

import logo from "../../Layout/logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";

//localhost port for api
const  API  = process.env.REACT_APP_API;

function RecoverBytoken() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userRepPassword, setUserRepPassword] = useState("");
    const history = useHistory();
    const {user, setUser} = React.useContext(UserContext);
    const {token} = useParams();


    let handleSubmit = async (e) => {

        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();

        let newUser = {
            email: userEmail,
            password: userPassword,
            rep_password: userRepPassword
        }

        axios.post(`${API}/user/passwordrecovery/${token}`, newUser, {
            withCredentials: true
        })
            .then((res) => {
                alert("Password alterada com sucesso!");
                setUser(res.data.user);
                history.replace("/Home");
            }).catch((error) => {
                alert("error: Wrong Credentials!");
          //   history.replace("/Recover");
        });
    }



    return <div className = "recoverBytoken">

        <div className="container">
            <div className={"logo"}>
                <img src={logo} alt ="logo UpTube"/>
            </div>
            {user? <h1> Alteração de Password</h1>:<h1>Recuperação de password</h1>}
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <h3>Email</h3>
                    <input type="email" onChange={e => setUserEmail(e.target.value)} value={userEmail} id="email"
                           name="email" placeholder="email" required/>

                </div>
                <div className="inputContainer" id="pwContainer">
                    <h3>Password</h3>
                    <input type="password" onChange={e => setUserPassword(e.target.value)} value={userPassword}
                           id="password" name="password" placeholder="Password" required/>
                </div>

                <div className="inputContainer">
                    <h3>Repetir Password</h3>
                    <input type="password" onChange={e => setUserRepPassword(e.target.value)} value={userRepPassword}
                           id="rep_password" name="rep_password" placeholder="Repetir Password" required/>

                </div>

                <button type="submit">Alterar Password</button>

            </form>


        </div>;
    </div>

}

export default RecoverBytoken;