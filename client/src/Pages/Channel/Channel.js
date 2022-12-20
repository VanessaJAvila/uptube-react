import "./Channel.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {UserContext} from "../../Providers/UserContext";
import {useHistory} from "react-router-dom";
import beloved from "../../Assets/beloved.svg";
import stalker from "../../Assets/stalker.svg";
import starting from "../../Assets/starting.svg";
import VideoCard from "../../Components/VideoCard/VideoCard"
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


export default function Channel() {
    const {user} = React.useContext(UserContext);
    const history = useHistory()

    const [achis, setAchis] = useState([]);
    const [subs, setSubs] = useState([]);
    const [stats, setStats] = useState({});
    const [selfChannel, setSelfChannel] = useState(null)
    const [edit, setEdit] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:5000/user/${user?.user_id}`)
            .then(response => {
                setSelfChannel(response.data);
            }).catch(e => console.log(e)) ;
    }, [user]);


    useEffect(() => {
        axios.get(`http://localhost:5000/user/stats/${user?.user_id}`)
            .then(response => {
                setStats(response.data.user_report[0]);
            }).catch(e => console.log(e));
    }, [user]);


    useEffect(() => {
        axios.get(`http://localhost:5000/subscriptions/${user?.user_id}`)
            .then(response => {
                setSubs(response.data);
            }).catch(e => console.log(e));
    }, [user]);

    useEffect(() => {
        axios.get(`http://localhost:5000/achievements/${user?.user_id}`)
            .then(response => {
                setAchis(response.data)
            });
    }, [user]);

    if(!selfChannel) return null;
    if (!achis) return null;
    if (!stats) return null;
    if (!subs) return null;

    let ret = achis.includes("Adoram-me")
        console.log(ret)

    return <div className={'channel-container'}>
        <Header/>
        <div className={"Sidebar"}><SideBar/></div>
         <div className={"user-details"}>
            <div className={"layer-bg"}>
            <div className={"channel-bg"}
                 style={{backgroundImage: `url(${user?.header})`}}></div></div>
                 <div className={'edit-user-details'}> //todo verificar porque desaparece div do edit com esta condição//
                    {user?.user_id === selfChannel.user_id && !edit && <div className={'edit'} onClick={()=>{
                        setEdit(true)
                    }}>
                </div>}
                <div className={"user-data"}>
                    <img className={"avatar"} src={user?.photo} alt={"user-photo"}/>
                    <h4 className={"username"}>{user?.name}</h4>
                    <p className={"bio"}>{user?.bio}</p>
                    <div className={"stats-user"}>
                        <div className={"followers"}>
                            <p> Subscritores</p>
                            <p>{stats.followers}</p>
                        </div>
                        <div className={"views"}>
                            <p>Visualizações</p>
                            <p>{stats.views}</p>
                        </div>
                        <div className={"videos"}>
                            <p>Videos</p>
                            <p>{stats.videos}</p>
                         </div>
                     </div>
                 </div>
            </div>
             </div>

             <h2>Achievements</h2>
             <div className={"achievements"}>
                 {achis.includes("Adoram-me") && <div><img className={"adoram-me"} src={beloved}/></div>}
                 {achis.includes("14") && <img className={"começar"} src={starting}/>}
             </div>
             <h2 className={"upload"}>Uploads</h2>
             <div className={"container-uploads"}>
                 <VideoCard></VideoCard>
             </div>
             <h2 className={"playlist"}>Playlists</h2>
             <div className={"container-playlists"}>
                 <VideoCard></VideoCard>
             </div>
             <div className={"container-subs-stats"}>
                 <h4 className={"subs-text"}>Subscrições</h4>
                 <div className={"subs"}>
                     {subs.map ((s, idx) =>{
                         return <div className={"list"}  key={ s + idx}>
                             <img className={"photo-chan"} src = {s.avatar} alt="channel"/>
                             <p className={"channel"}>{s.username}</p>
                         </div>
                     })}
                 </div>
                 {/*//todo converter mês para string// */}
                 <h4 className={"about-text"}>Acerca</h4>
                 <div className={"stats"}>
                     <p className={"date"}>Canal criado a {user?.account_opening.slice(0, 10)}</p>
                     <p className={"stats-st-data"}>{stats.videos} videos carregados</p>
                     <p className={"stats-data"}>{stats.playlists} playlists criadas</p>
                     <p className={"stats-data"}>{stats.views} visualizações no total</p>
                     <p className={"stats-data"}>{stats.followers} subscritores</p>

                 </div>

             </div>

         </div>

     }
