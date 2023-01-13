//export default defaultBackendURL = ´localhost:4000´
//export default videosURL = defaultBackendURL + ´video´
// fazer um file se possivel com todos os endpoints vindos da base de dados e chamar depois nos files necessarios
import React, {useEffect, useState} from "react";
import axios from "axios";
import cat from "../../Assets/sample-thumbnails/ssh_1.png";
import Header from "../../Layout/Header";
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import "./Home.scss";
import VideoCard from "../../Assets/Components/VideoCard/VideoCard";
import {faEllipsis, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useHistory} from "react-router-dom";
import teaser from "../../Assets/teaser.mp4"

//localhost port for api
const  API  = process.env.REACT_APP_API;

console.log(API)

function Home() {
    const {user} = React.useContext(UserContext);
    const [recommendations, setRecommendations] = useState([]);
    const [topChannels, setTopChannels] = useState([]);
    const [topChannel, setTopChannel] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageRec, setCurrentPageRec] = useState(1);
    const resultsPerPage = 4;
    const resultsPerPageRec = 6;
    const indexOfLastRecord = currentPage * resultsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - resultsPerPage;
    const indexOfLastRecordRec = currentPageRec * resultsPerPageRec;
    const indexOfFirstRecordRec = indexOfLastRecordRec - resultsPerPageRec;
    const history = useHistory();


    // Records to be displayed on the current page
    const currentChannels = topChannels.slice(indexOfFirstRecord, indexOfLastRecord);
    const currentChannel = topChannel.slice(0, 1);
    const currentRecomendations = recommendations.slice(indexOfFirstRecordRec, indexOfLastRecordRec)
    console.log(topChannels)
    useEffect(() => {
        axios.get(`${API}/suggested/50popular`)
            .then(response => {
                setRecommendations(response.data);
            }).catch(e => console.log(e));
    }, []);

    //        axios.get(`${API}/suggested/topchannels`)

    useEffect(() => {
        axios.get(`${API}/user`)
            .then(response => {
                //console.log('rsp', response);
                setTopChannels(response.data);
                setTopChannel(response.data);
            }).catch(e => console.log(e));
    }, []);

    if (!recommendations || !topChannels || !topChannel) return null;

    console.log("curr", currentRecomendations)
    return <div className={"container-homepage"}>
        <Header/>
        <SideBar/>
        <div className={"container-home"}>
            <div className={"container-geral"}>
            <h1>Videos sugeridos</h1>
            <div className="geral">
                {currentRecomendations.map((video, idx) => (<VideoCard type={"geral"} key={idx} {...video}/>))}
                {currentPageRec &&
                    <div className={"pages"}>
                        {currentPageRec >= 2 &&
                            <div className={"show-less"} onClick={() => setCurrentPageRec(currentPageRec - 1)}>
                                <p>Mostrar Menos</p></div>}
                        {recommendations.length > 0 &&
                            <div className={"show-more"} onClick={() => setCurrentPageRec(currentPageRec + 1)}>
                                <p>Mostrar Mais</p></div>}
                    </div>}
            </div>
            </div>
            <div className={"channels-containers-wrapper"}>
            <div className={"container-channels"}>
                <div className={"title"}>
                    <div className={"title-chan"}><h3>Canais Sugeridos</h3>
                        <FontAwesomeIcon className={'suggestions-icon'} icon={faEllipsis} onClick={() => setCurrentPage(currentPage - 1)}/></div>
                    {currentChannels.map((c, idx) => {
                        return c.username ? (
                            <div className={"channel-list"} key={c + idx} onClick={() => {
                                history.push(`/Channel/${c.user_id}`)
                                }}>
                                <div className={'photo-channel'}>
                                    <img className={"photo-chan"} src={c.photo} alt="channel" />
                                <p className={"channel"}>{c.username}</p></div>
                            </div>
                        ) : null;
                    })}
                </div>

                <div className={"see-more-btn"}>
                    {currentPage &&
                        <div className={"pagination"} onClick={() => setCurrentPage(currentPage + 1)}>
                            { topChannels && (topChannels.length > 0 ) && <h3>Mostrar Mais</h3>}
                        </div>}
                </div>
            </div>
                {user && <div className={"container-channels-2"}>
                    <div className={"title"}>
                        <h3>Canal mais visto</h3>

                    </div>

                    <div className={"add-channel"}>
                        {currentChannel.map((ch, idx) => {
                            return (
                                <div className={"list"} key={ch + idx}>
                                    <div className={"photo-channel-2"}>
                                        <div className={"id"}><img className={"photo-chan-2"} src={ch.photo} alt="channel"/>
                                        <p className={"channel-id"}>{ch.username}</p></div>
                                    {ch.bio && ch.bio.length > 10 ? (
                                        <div className={"channel-bio"}>{ch.bio.slice(0, 20)}</div>
                                    ) : (
                                        <div className={"channel-bio"}>{ch.bio}</div>
                                    )}
                                </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={'chan-thumb'}>
                        <video width="100%" controls>
                            <source src={teaser} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>}
            </div>
            </div>
    </div>
}

export default Home;
