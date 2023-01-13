import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../../Layout/Header";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import "./Playlists.scss";
import {faEllipsis, faEnvelope, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PlaylistCard from "../../Assets/Components/PlaylistCard/PlaylistCard.js"

//localhost port for api
const API = process.env.REACT_APP_API;

function Playlists() {
    const {user} = React.useContext(UserContext);
    const history = useHistory();
    const [playlists, setplaylists] = useState([]);
    const[visibility, setVisibility] =useState("public");
    const [criarPlaylist, setCriarPlaylist] = useState(false);
    const [title, setTitle]= useState("");
    const [gPlaylists,setGPlaylists] = useState([]);
    const[GuestPlaylists,  setGuestPlaylists] = useState([]);



    useEffect(() => {
        if(!user) return;
        axios.get(`${API}/playlist/user/`,{withCredentials: true})
            .then(response => {
                setplaylists(response.data);
            })
            .catch(e => console.log(e, "erro playlistssssssssssss")) ;
        axios.get(`${API}/playlist/guest/playlists`,{withCredentials: true})
            .then(response => {
                setGPlaylists(response.data);
            }).catch(e => console.log(e, "No G playlists")) ;
    }, [user]);





        useEffect(() => {
            axios.get(`${API}/playlist/ginplaylist/`,{withCredentials: true})
                .then(response => {
                    setGuestPlaylists(response.data);
                }).catch(e => console.log(e, "erro ginplaylist")) ;
        }, [user]);


        console.log(GuestPlaylists,"GuestPlaylists")



    /*
       useEffect(() => {
     axios.get(`${API}/playlist/ginplaylist/`,{withCredentials: true})
                    .then(response => {
                        console.log(response.data[0].name,pid,"ginplaylist" );
                        setGuestPlaylists(response.data);
                    }).catch(e => console.log(e, "erro ginplaylist")) ;
    }, [user]);


*/


    let handleSubmit = async (e) => {
        e.preventDefault();
        let newPlaylist = {
            title: title,
            creator_id: user.user_id,
            visibility:visibility,
            thumbnail: `${API}/playlistFiller/noVideoFound.jpg`
        }

        axios.post(`${API}/playlist/create`, newPlaylist, {
            withCredentials: true
        })
            .then((res) => {
                //alert('Playlist created successfully');
                console.log(res.data.user, "playlist created");
            }).catch((error) => {
            console.log(error, "erro create playlist");
          //  alert("error: Wrong Credentials!");
        });
    }


    let gpf = [];


    return <div className={"Playlists"}>
        <Header/>
        <SideBar/>
        <div className={"container-playlist"}>
            <h1>As suas Playlists</h1>
            <div className={"box-playlist"}>

                {playlists.map((p) => {
                    let filteredGuest=  GuestPlaylists.filter(guestP => guestP.playlist_id === p.playlist_id)
                    gpf.push(filteredGuest);
                    return <PlaylistCard  key={p.playlist_id+1500}
                                              id = {p.playlist_id}
                                              creator_id = {p.creator_id}
                                              thumbnail = {p.thumbnail}
                                              photo = {user.photo}
                                              name = {user.name}
                                              title ={p.title}
                                              duration = {p.duration}
                                              timestamp = {p.timestamp}
                                          guestPlaylists={filteredGuest}
                    />}
                )}

            </div>

            <div className={"createPlaylist"}>
            <button style={ {width: 255 +"px"}} onClick={()=>setCriarPlaylist(true)}   >Criar Nova Playlist</button>

            {criarPlaylist &&  <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <input type="text" onChange={e => setTitle(e.target.value)} value={title} id="title"
                           name="title" placeholder="title" required/>
                    <FontAwesomeIcon className="icons" icon={faEnvelope}/>
                </div>

                <div>
                    <select id="visibility" onChange={e => setVisibility(e.target.value)} name ="visibility">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>




                <button type="submit">Gravar Alterações</button>
            </form>}
            </div>
            <h1> Playlists participantes</h1>
            <div className={"playlistsGuestContainer"}>


                {gPlaylists.map((gp)=>{

                    return <PlaylistCard  key={gp.playlist_id + 900}
                                         id = {gp.playlist_id}
                                         creator_id = {gp.creator_id}
                                         thumbnail = {gp.thumbnail}
                                         photo = {gp.photo}
                                         name = {gp.name}
                                         title ={gp.title}
                                         duration = {gp.duration}
                                         timestamp = {gp.timestamp}

                   />
                })}

            </div>

        </div>

    </div>}

export default Playlists;
