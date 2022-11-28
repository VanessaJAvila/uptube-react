import React, {useContext, useState} from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {UserContext} from "../../Providers/UserContext";
//import login from "../Login";
import "./Register.scss";
import logo from "../../Layout/logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey, faUser} from "@fortawesome/free-solid-svg-icons";


function Register() {
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserRepPassword, setNewUserRepPassword] = useState("");
    const {user,setUser} = React.useContext(UserContext);
    const history = useHistory();
    console.log(user, "user register");

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
                history.replace("/login")
            }).catch((error) => {
            console.log(error.response.data, "nao fizeste register");
            alert("error: "+ error.response.data)
          //  history.replace("/Register")
        });

    }


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
                    <input type="checkbox" id="terms" name="terms" value="terms"/>
                    <label htmlFor="terms"> Aceito os<a href="#" >termos e condições</a></label>
                </div>

                <button type="submit">Registar</button>

                <a href="../Login/Login">Fazer Login</a>

                <div className="google">
                    <button type="submit">Entrar com Google</button>
                </div>
            </form>

        </div>
    </div>;
}

export default Register;