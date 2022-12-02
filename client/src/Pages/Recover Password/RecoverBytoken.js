

import React, {useEffect, useState} from "react";
import axios from "axios";
import {Redirect, Route, useHistory, useParams} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import Register from "../Register/Register";


import logo from "../../Layout/logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";

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

        axios.post('http://localhost:5000/user/passwordrecovery/'+token, newUser, {
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




    if (user) {
        history.replace("/Home");
    }






    return <div className = "recoverBytoken">

        <div className="container">
            <div className={"logo"}>
                <img src={logo} alt ="logo UpTube"/>
            </div>
            <h1>Recuperação de password</h1>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <input type="email" onChange={e => setUserEmail(e.target.value)} value={userEmail} id="email"
                           name="email" placeholder="email" required/>
                    <FontAwesomeIcon className="icons" icon={faEnvelope}/>
                </div>
                <div className="inputContainer" id="pwContainer">
                    <input type="password" onChange={e => setUserPassword(e.target.value)} value={userPassword}
                           id="password" name="password" placeholder="Password" required/>
                    <FontAwesomeIcon className="icons" icon={faKey}/>
                </div>

                <div className="inputContainer">
                    <input type="password" onChange={e => setUserRepPassword(e.target.value)} value={userRepPassword}
                           id="rep_password" name="rep_password" placeholder="Repetir Password" required/>
                    <FontAwesomeIcon className="icons" icon={faKey}/>
                </div>

                <button type="submit">Alterar Password</button>

            </form>


        </div>;
    </div>

}

export default RecoverBytoken;