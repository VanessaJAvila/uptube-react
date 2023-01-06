//export default defaultBackendURL = ´localhost:4000´
//export default videosURL = defaultBackendURL + ´video´
// fazer um file se possivel com todos os endpoints vindos da base de dados e chamar depois nos files necessarios
import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../../Layout/Header";
import {Redirect, useHistory} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import "./Home.scss";
import VideoCard from "../../Assets/Components/VideoCard/VideoCard";
import {faEllipsis, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Home() {
    const {user} = React.useContext(UserContext);
    const [videos, setVideos] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [topChannels, setTopChannels] = useState([]);
    const [topChannel, setTopChannel] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const channelsPerPage = 5;
    const indexOfLastRecord = currentPage * channelsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - channelsPerPage;


    // Records to be displayed on the current page
    const currentChannels = topChannels.slice(indexOfFirstRecord, indexOfLastRecord);
    const currentChannel = topChannel.slice(0,1);

    console.log(currentChannels)


    useEffect(() => {
        axios.get('http://localhost:5000/suggested/50popular')
            .then(response => {
                setRecommendations(response.data);
            }).catch(e => console.log(e)) ;
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/suggested/topchannels')
            .then(response => {
                //console.log('rsp', response);
                setTopChannels(response.data);
                setTopChannel(response.data);
            }).catch(e => console.log(e)) ;
    }, []);

    if(!recommendations) return null;
    if(!topChannels) return null;
    if(!topChannel) return null;

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
                    {currentChannels.map ((c, idx) =>{
                        return <div className={"list"}  key={ c + idx} >
                            <div className={'photo-channel'}>
                                <img className={"photo-chan"} src = {c.photo} alt="channel"/></div>
                            <p className={"channel"}>{c.Channel}</p>
                        </div>
                    })}

            <div className={"see-more-btn"}>
                {currentPage &&
                    <div className={"pagination"} onClick={() => setCurrentPage(currentPage + 1)}>
                        {topChannels.length > 0 && <h3>Mostrar Mais</h3>}
            </div> }
            </div>
            {user &&  <div className={"container-channels-2"}>
                <div className={"title"}>
                    <h3 >Canais Sugeridos</h3>
                    <h3 className={"see-more"}>Ver todos</h3>
                </div>

                <div className={"add-channel"}>
                    {currentChannel.map ((ch, idx) =>{
                        return <div className={"list"}  key={ ch + idx}>
                            <div className={'photo-channel-2'}>
                                <img className={"photo-chan-2"} src = {ch.photo} alt="channel"/></div>
                            <p className={"channel-id"}>{ch.Channel}</p>
                            <p className={"channel-bio"}>{ch.bio.slice(0,8)}</p>
                        </div>
                    })}
                </div>
                <div className={'chan-thumb'}>
                <FontAwesomeIcon className={'add-icon'} icon={faUserPlus}/>
                <p className={'follow-chan'}>Seguir canal</p>
                </div>
           </div>}
        </div>
        </div>
    </div>}

export default Home;
