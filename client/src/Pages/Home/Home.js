//export default defaultBackendURL = ´localhost:4000´
//export default videosURL = defaultBackendURL + ´video´
// fazer um file se possivel com todos os endpoints vindos da base de dados e chamar depois nos files necessarios
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Header from "../../Layout/Header";
import {Redirect, useHistory} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import "./Home.scss";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Home() {
    const {user, setUser,filter} = React.useContext(UserContext);
    const history = useHistory();
    const [videos, setVideos] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    //const[public, setPublic] =useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/suggested/50popular')
            .then(response => {
                console.log('rsp', response)
                setRecommendations(response.data);
            }).catch(e => console.log(e)) ;
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/video', {params: {search: filter}, withCredentials: true})
            .then(response => setVideos(response.data))
    }, [filter]);

       console.log(videos);

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
    //todo: <h2>{user?.name}</h2> crasha a página
    return <div className={"container-homepage"}>
        <Header/>
       <SideBar/>
        <div className={"container-home"}>
        <div className={"container-videos"}>
            {videos && <>
            {videos.length === 0 &&  <p> Sem Resultados</p>}
            {videos.map ( v => {
                <h1>{v.title}</h1>
            })}
            </>}
        </div>

             <h1> Bem-vindo(a) </h1>
        <h3>Ao seu perfil</h3>
        <h2>{user?.name}</h2>
        <div className={"recomendations"}>
            {
                recommendations.map(video => {
                    return <div>
                        {video.title && <h1>{video.title}</h1>}
                    </div>
                })
            }
        </div>
        <div className={"container-channels"}>
            <div className={"title"}>
            <h3 >Canais Sugeridos</h3>
            <FontAwesomeIcon className={'suggestions-icon'} icon={faEllipsis}/>
            </div>

        </div>
    </div>

    </div>;
}

export default Home;
