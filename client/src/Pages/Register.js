import {useState} from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';

function Register() {
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserRepPassword, setNewUserRepPassword] = useState("");
    const history = useHistory();

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
                console.log(res.data, "hello");
                history.replace("/login")
            }).catch((error) => {
            console.log(error, "nao fizeste register");
            history.replace("/Register")
        });

    }


    return <div>

        <h1> Register </h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" onChange={e => setNewUserName(e.target.value)} value={newUserName} id="name"
                       name="name" placeholder="Nome completo" required/>
            </div>
            <div>
                <input type="email" onChange={e => setNewUserEmail(e.target.value)} value={newUserEmail} id="email"
                       name="email" placeholder="email" required/>
            </div>
            <div>
                <input type="password" onChange={e => setNewUserPassword(e.target.value)} value={newUserPassword}
                       id="password" name="password" placeholder="Password" required/>
            </div>
            <div>
                <input type="password" onChange={e => setNewUserRepPassword(e.target.value)} value={newUserRepPassword}
                       id="rep_password" name="rep_password" placeholder="Repetir Password" required/>
            </div>
            <button type="submit">Register</button>
        </form>
        <a href="/Login">Login</a>


    </div>;
}

export default Register;