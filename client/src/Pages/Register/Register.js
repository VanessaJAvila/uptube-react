import React, {useContext, useState} from "react";
import axios from "axios";
import {Redirect, useHistory} from 'react-router-dom';
import {UserContext} from "../../Providers/UserContext";
import Terms from "./Terms.js";
//import login from "../Login";
import "./Register.scss";
import logo from "../../Layout/logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey, faUser} from "@fortawesome/free-solid-svg-icons";
//import Popup from "reactjs-popup";

function Register() {
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserRepPassword, setNewUserRepPassword] = useState("");
    const {user,setUser} = React.useContext(UserContext);
    const {isLoading,setIsLoading} = React.useContext(UserContext);
    const [popup,setPopUp] = useState(false);

    const togglePopUp = () => {
        setPopUp(!popup)
    }

    const history = useHistory();
    console.log(user, "user register1");

    let handleSubmit = async (e) => {

        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();

        let newUser = {
            name: newUserName,
            email: newUserEmail,
            password: newUserPassword,
            rep_password: newUserRepPassword
        }

        axios.post('http://localhost:5000/user/register', newUser, {
            withCredentials: true
        })
            .then((res) => {
                setUser(newUser);
                setIsLoading(false);
                history.replace("/Home");
            }).catch((error) => {
            console.log(error.response.data, "nao fizeste register");
            alert("error: "+ error.response.data)
          //  history.replace("/Register")
        });

    }


/*
    if (user) {
        history.replace("/home");
    }

 */

    return <div className="register">
        <div className="container">
            <div className={"logo"}>
                <img src={logo} alt ="logo UpTube"/>
            </div>
            <h1> Criar Conta </h1>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <input type="text" onChange={e => setNewUserName(e.target.value)} value={newUserName} id="name"
                           name="name" placeholder="Nome completo" required/>
                    <FontAwesomeIcon className="icons" icon={faUser}/>
                </div>
                <div className="inputContainer">
                    <input type="email" onChange={e => setNewUserEmail(e.target.value)} value={newUserEmail} id="email"
                           name="email" placeholder="email" required/>
                    <FontAwesomeIcon className="icons" icon={faEnvelope}/>
                </div>
                <div className="inputContainer">
                    <input type="password" onChange={e => setNewUserPassword(e.target.value)} value={newUserPassword}
                           id="password" name="password" placeholder="Password" required/>
                    <FontAwesomeIcon className="icons" icon={faKey}/>
                </div>
                <div className="inputContainer">
                    <input type="password" onChange={e => setNewUserRepPassword(e.target.value)} value={newUserRepPassword}
                           id="rep_password" name="rep_password" placeholder="Repetir Password" required/>
                    <FontAwesomeIcon className="icons" icon={faKey}/>
                </div>
                <div className="checkboxContainer">
                    {/*TODO verificar pq o popup abre e fecha instantaneamente sem receber o input do botao aceitar*/}
                    <input type="checkbox" id="terms" name="terms" value="terms" onClick={togglePopUp}/>
                    <label htmlFor="terms"> Aceito os<a href={"/Register"} onClick={togglePopUp}>termos e condições</a></label>
                    {!popup && <Terms></Terms>}
                </div>

                <button type="submit">Registar</button>

                <a href="../Login">Fazer Login</a>

                <div className="google">
                    <button type="submit">Entrar com Google</button>
                </div>
            </form>

        </div>
    </div>;
}

export default Register;