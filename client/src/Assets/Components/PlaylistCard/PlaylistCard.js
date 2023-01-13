import React, {useEffect, useState} from "react";
import "./PlaylistCard.scss";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faGear} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {UserContext} from "../../../Providers/UserContext";


//localhost port for api
const API = process.env.REACT_APP_API;

let dateNow = new Date();

function getHoursDiff(startDate, endDate) {
    const msInHour = 1000 * 60 * 60;

    return Math.round(Math.abs(endDate - startDate) / msInHour);
}


function splitTime(numberOfHours){
    let days=Math.floor(numberOfHours/24);
    let remainder=numberOfHours % 24;
    let hours=Math.floor(remainder);
    // let minutes=Math.floor(60*(remainder-hours));
    if(days<1){
        return  `Há ${hours} horas`
    }
    if(days===1){return `Há ${days} dia`}
    return `Há ${days} dias`
}




function PlaylistCard(props){
    const [dropdownState, setDropdownState] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
    const {user} = React.useContext(UserContext);
    const[convState,setConvState] = useState(false);
    const[addGstate,setAddGstate] = useState(false);
    const[rmvGstate,setRmvGstate] = useState(false);
    const[email,setEmail] = useState("");
    const[guest,setGuest] = useState("");
    const[errorM,setErrorM] = useState("");
    const[errorDiv,setErrorDiv] = useState(false);
    const[deleteIdG,setDeleteIdG] = useState("");



    //console.log(guest, "prrrrrrrrops");
/*
    //TODO nao usar useEffect aqui
    //ir buscar guest a playlist
    useEffect(() => {
        if(!user) return;
        axios.get(`${API}/playlist/ginplaylist/`+props.id,{withCredentials: true})
            .then(response => {
                console.log(response.data[0].name,props.id,"ginplaylist" );
                setGuest(response.data);
            }).catch(e => console.log(e, "erro ginplaylist")) ;
    }, [user]);

 */



    let handleSub = async (e) => {
        e.preventDefault();
            axios.get(`${API}/playlist/getInvitedEmail/`+email,{withCredentials: true})
                .then(response => {
                    let helper = null;
                  console.log(response, "trial");
                  if(response.data.length===0){
                      helper = null
                  } else {
                      helper = response.data[0].user_id;
                  }

                    let newGuest = {
                        playlist_id: props.id,
                        invited_id: helper,
                        email:email
                    }
                    axios.post(`${API}/playlist/addguestplaylist`, newGuest, {
                        withCredentials: true
                    })
                        .then((res) => {
                            console.log("sucesso", res)
                            //TODO modificar o guest
                            /*
                            setGuest(g => {
                                g.push(res.data[0]);
                            });
                             */
                            setErrorM(res.data.message);
                            setErrorDiv(true);
                        }).catch((error) => {
                        console.log(error.response.data.message, "error ------------------------------------------------------------------1");
                        setErrorM(error.response.data.message);
                        setErrorDiv(true);
                    });

                }).catch(e => {
                    console.log(e, "error++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 2");
                }
            ) ;
    }



    let confirmDelete = async (e) => {

        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();

        let deletePlay = {
            creator_id: props.creator_id,
            playlist_id: props.id
        }

        axios.post(`${API}/playlist/delete/`,deletePlay, {
            withCredentials: true
        })
            .then((res) => {
                // alert("Playlist deleted successfully");
                console.log("Playlist deleted successfully");
                window.location.reload();
            }).catch((error) => {
            console.log(error, "messagem delete playlist erro");
        });
    }

            return (<div className="playlist">
                <div className="card">
                    <Link to={"/Playlist/" + props.id} >
                        <img src={props.thumbnail}/>
                    </Link>
                    {props.photo && <div className="card_img">
                        <img src={props.photo}/>
                    </div>}

                    <div className="card_info">
                        <Link to={"/UserChannel"} >
                            <h2>{props.name}</h2>
                        </Link>
                        <h1>{props.title}</h1>
                        <div className={"defPlaylist"}>
                            <p>duração total: {props.duration} | {splitTime(getHoursDiff(new Date(props.timestamp), dateNow))}</p>
                            <div className="dropdown">
                             <FontAwesomeIcon onClick={()=>setDropdownState(!dropdownState)} className="dropbtn" icon={faGear}></FontAwesomeIcon>
                                {dropdownState&&<div id="myDropdown" className="dropdown-content">
                                    <a href={"/Playlist/" + props.id}>Editar playlist</a>
                                    { user.user_id === props.creator_id && <p onClick={()=>{setConvState(!convState)}}>Convidados</p>}
                                    {
                                        convState && <div>
                                                    <p onClick={()=>setAddGstate(!addGstate)}> -Adicionar guest á playlist</p>
                                            {
                                                addGstate && <div>
                                                    <form>

                                                        <div className="inputContainer">
                                                            <input type="email" onChange={e => setEmail(e.target.value)} value={email} id="email"
                                                                   name="email" placeholder="email" required/>
                                                            <FontAwesomeIcon className="icons" icon={faEnvelope}/>
                                                        </div>

                                                        <p onClick={handleSub}>Enviar email e adicionar</p>
                                                        {errorDiv && <p>
                                                            {errorM}
                                                        </p>}
                                                    </form>
                                                </div>
                                            }
                                                    <p onClick={()=>{
                                                        setRmvGstate(!rmvGstate);
                                                        setGuest(props.guestPlaylists);
                                                    }}>-Remover guest da playlist</p>
                                            {
                                                rmvGstate && <div>
                                                    {
                                                       guest.map((g,i)=>{
                                                            return <p onClick={async(e) =>{
                                                                    let dGuest = {
                                                                        playlist_id: props.id,
                                                                        invited_id: g.user_id,
                                                                    }

                                                                    axios.post(`${API}/playlist/deletegfromp/`, dGuest, {
                                                                        withCredentials: true
                                                                    })
                                                                        .then((res) => {
                                                                            console.log("sucesso", res.data)
                                                                        }).catch((error) => {
                                                                        console.log(error.response.data.message, "error ------------------------------------------------------------------1");
                                                                    });



                                                            }}
                                                             key={i}>{g.name}</p>
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }



                                    { user.user_id === props.creator_id && <p onClick={()=>{setDeleteState(true)}}>Apagar playlist</p>}
                                    {
                                        deleteState && <div className={"deletePlaylist"} style={{color:"red"}} > <strong>Are you sure you want to delete this playlist?</strong>
                                            <p onClick={confirmDelete}>YES</p>
                                            <p onClick={()=>setDropdownState(false)}>NO</p>
                                        </div>
                                    }
                                    <p onClick={()=>{
                                        setDropdownState(false);
                                       setConvState(false);
                                    }}>Close</p>

                                    </div>
                                }

                            </div>

                        </div>
                    </div>
                </div>

            </div>)

}

export default PlaylistCard;