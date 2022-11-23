
//export default defaultBackendURL = ´localhost:4000´
//export default videosURL = defaultBackendURL + ´video´
// fazer um file se possivel com todos os endpoints vindos da base de dados e chamar depois nos files necessarios
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";




function Home() {
    const history = useHistory();
    const[videos,setVideos]=useState("");
    const[user,setUser]=useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/video')
            .then(response => {setVideos(response.data);});
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/user/sessao')
            .then(response => {setUser(response.data);});
    }, []);


    if (!user) {

       // history.replace("/Login");
        return <div> Tem que fazer Login
            <a href="/Register">Register</a>
            <a href="/Login">Login</a>
        </div>;

    }


    let handleSubmit = async (e) => {

        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();



        axios.post('http://localhost:5000/user/Logout', true, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data)
                history.replace("/Login");
            }).catch((error) => {
            console.log(error)
            history.replace("/Home");
        });

    }


    if (!videos) {
        return <h1>Aguarda resultados</h1>;
    }


    return <div>
        <h1> Bem-vindo(a) </h1>
        <h3>Ao seu perfil</h3>
        <h2>As minhas reservas</h2>
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