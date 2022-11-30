//export default defaultBackendURL = ´localhost:4000´
//export default videosURL = defaultBackendURL + ´video´
// fazer um file se possivel com todos os endpoints vindos da base de dados e chamar depois nos files necessarios
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Header from "../Layout/Header";
import {Redirect, useHistory} from "react-router-dom";
import {UserContext} from "../Providers/UserContext";
import SideBar from "../Layout/SideBar";
import "./Home.scss";


function Home() {
    const {user, setUser} = React.useContext(UserContext);
    const history = useHistory();
    const [videos, setVideos] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    //const[public, setPublic] =useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/video')
            .then(response => {
                setVideos(response.data);
            });
        axios.get('http://localhost:5000/suggested/50popular')
            .then(response => {
                console.log('rsp', response)
                setRecommendations(response.data);
            }).catch(e => console.log(e)) ;
    }, []);


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


    console.log(recommendations)
    //todo: <h2>{user?.name}</h2> crasha a página
    return <div className={"container-home"}>
        <Header/>
        <div className={"container-home"}>
            <div className={"Sidebar"}><SideBar/></div>
        </div>
        <div className={"container-videos"}>
        <h1> Bem-vindo(a) </h1>
        <h3>Ao seu perfil</h3>
        <h2>{user?.name}</h2>
        </div>
        <div>
            {
                recommendations.map(video => {
                    return <div>
                        {video.title && <h1>{video.title}</h1>}
                    </div>
                })
            }

        </div>

    </div>;
}

export default Home;