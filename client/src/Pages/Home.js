
//export default defaultBackendURL = ´localhost:4000´
//export default videosURL = defaultBackendURL + ´video´
// fazer um file se possivel com todos os endpoints vindos da base de dados e chamar depois nos files necessarios
import React,{useContext, useEffect, useState} from "react";
import axios from "axios";
import {Redirect, useHistory} from "react-router-dom";
import {UserContext} from "../Providers/UserContext";




function Home() {
    const {user,setUser} = React.useContext(UserContext);
    const history = useHistory();
    const[videos,setVideos]=useState("");


    useEffect(() => {
        axios.get('http://localhost:5000/video')
            .then(response => {setVideos(response.data);});
    }, []);

    /*


    useEffect(() => {
        axios.get('http://localhost:5000/user/sessao',{
            withCredentials: true
        })
            .then(response => {
                console.log(response.data.user, "user frontend");
                setUser(response.data);
            }).catch((error) => {
            console.log(error, user,"erro sessao" );
        });
    }, []);
*/
/*
    if (!user) {
       // history.replace("/Login");
        return <div> Tem que fazer Login
            <Redirect to={"/Login"}/>
            <a href="/Register">Register</a>
            <a href="/Login">Login</a>
        </div>;

    }


 */



    let handleSubmit = async (e) => {
        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();
        axios.post('http://localhost:5000/user/Logout', true, {
            withCredentials: true
        })
            .then((res) => {
                setUser(null);
               history.replace("/Login");
            }).catch((error) => {
            console.log(error)
            history.replace("/Home");
        });
    }


    if (!videos) {
        return <h1>Aguarda resultados</h1>;
    }

    if (!user) {
        return   <Redirect to={"/Login"}/>;
    }




    return <div>
        <h1> Bem-vindo(a) </h1>
        <h3>Ao seu perfil</h3>
        <h2>{user.name}</h2>

        <div>
            {
                videos.map(video=>{
                 return   <div>
                        {video.title && <h1>{video.title}</h1>}
                    </div>
                })
            }

            <input type="button" onClick={handleSubmit} value="Logout"/>

        </div>


    </div>;
}

export default Home;