import React,{useContext, useEffect, useState} from "react";
import axios from "axios";
import {UserContext} from "../../Providers/UserContext"
import {Redirect, Route, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import logo from "../../Layout/logo.svg";

function Recover() {

    const [newUserEmail, setNewUserEmail] = useState("");
    const history = useHistory();
    const {user, setUser} = React.useContext(UserContext);


    let handleSubmit = async (e) => {

        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();

        let newUser = {
            email: newUserEmail,
        }

        axios.post('http://localhost:5000/user/passwordrecovery', newUser, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data, "Recuperar password");
                alert("Enviado e-mail de recuperação de password")
                setUser(res.data.user);
                history.replace("/RecoverBytoken");
            }).catch((error) => {
            console.log(error, "Falhou Recuperar password");
            //  history.replace("/Login");
            alert("error: Wrong Credentials!");
        });
    }


    if (user) {
        history.replace("/Home");
    }



    return <div className = "recoverPassword">

        <div className="container">
            <div className={"logo"}>
                <img src={logo} alt ="logo UpTube"/>
            </div>
            <h1>Recuperar Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <input type="email" onChange={e => setNewUserEmail(e.target.value)} value={newUserEmail} id="email"
                           name="email" placeholder="email" required/>
                    <FontAwesomeIcon className="icons" icon={faEnvelope}/>
                </div>

                <button type="submit">Enviar email de Recuperação</button>
            </form>


        </div>;
    </div>

}

export default Recover;