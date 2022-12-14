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
import VideoCard from "../../components/VideoCard/VideoCard"
import {faEllipsis, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Home() {
    const {user, setUser} = React.useContext(UserContext);
    const history = useHistory();
    const [videos, setVideos] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    //const[public, setPublic] =useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/suggested/50popular')
            .then(response => {
                //console.log('rsp', response);
                setRecommendations(response.data);
            }).catch(e => console.log(e)) ;
    }, []);



    //todo: <h2>{user?.name}</h2> crasha a página
    return <div className={"container-homepage"}>
        <Header/>
       <SideBar/>
        <div className={"container-home"}>
            <h1>Videos sugeridos</h1>
            <div className="geral">
                {recommendations.map((video, idx) => (<VideoCard type="geral" key={idx} {...video}/>))}
            </div>
            <div className={"container-channels"}>
                <div className={"title"}>
                    <h3 >Canais Sugeridos</h3>
                    <FontAwesomeIcon className={'suggestions-icon'} icon={faEllipsis}/>
                </div>
            <div className={"see-more-btn"}>
            <h3>Mostrar Mais</h3>
            </div>
            </div>
            {user &&  <div className={"container-channels-2"}>
                <div className={"title"}>
                    <h3 >Canais Sugeridos</h3>
                    <h3 className={"see-more"}>Ver todos</h3>
                </div>
                <div className={"add-channel"}>
                    <FontAwesomeIcon className={'add-icon'} icon={faUserPlus}/>
                    <h4>Seguir canal</h4>
                </div>
            </div>}
        </div>
        </div>}

export default Home;
