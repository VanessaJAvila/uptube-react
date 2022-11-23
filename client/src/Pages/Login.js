

import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

function Login() {

    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const history = useHistory();

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
                console.log(res.data.message)



                history.replace("/Home")
            }).catch((error) => {
            console.log(error)
            history.replace("/Login");
        });

    }


/*
    if (!user) {
        console.log(user, "hello");
        return <h1>Aguarda resultados</h1>;
    }

 */



    return <div>
        <h1> Login </h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="email" onChange={e => setNewUserEmail(e.target.value)} value={newUserEmail} id="email"
                       name="email" placeholder="email" required/>
            </div>
            <div>
                <input type="password" onChange={e => setNewUserPassword(e.target.value)} value={newUserPassword}
                       id="password" name="password" placeholder="Password" required/>
            </div>
            <button type="submit">Login</button>
        </form>
        <a href="/Register">Register</a>



    </div>;
}

export default Login;