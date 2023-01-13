import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import "./Login.scss";

import logo from "../../Layout/logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";

//localhost port for api
const  API  = process.env.REACT_APP_API;

function Login() {

    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const history = useHistory();
    const {user, setUser} = React.useContext(UserContext);




    let handleSubmit = async (e) => {

        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();

        let newUser = {
            email: newUserEmail,
            password: newUserPassword
        }

        axios.post(`${API}/user/Login`, newUser, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data.user, "messagem login frontend");
                setUser(res.data.user);
                history.replace("/Home");
            }).catch((error) => {
            console.log(error, "messagem erro login frontend");
            alert("error: Wrong Credentials!");
        });
    }

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
                <a class="myClass" href="/Register">Criar Conta</a>


            </form>


        </div>
    </div>

}

export default Login;