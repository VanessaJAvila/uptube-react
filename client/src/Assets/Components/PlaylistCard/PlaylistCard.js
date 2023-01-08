import React, {useEffect, useState} from "react";
import "./PlaylistCard.scss";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {UserContext} from "../../../Providers/UserContext";



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




    let confirmDelete = async (e) => {

        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();

        let deletePlay = {
            user_id: user.user_id,
            creator_id: props.creator_id,
            playlist_id: props.id
        }

        axios.post('http://localhost:5000/playlist/delete/',deletePlay, {
            withCredentials: true
        })
            .then((res) => {
                alert("Playlist deleted successfully");
             //   console.log(res.data);
            }).catch((error) => {
            console.log(error, "messagem erro");
        });
    }

            return (<div className="playlist">
                <div className="card">
                    <Link to={"/Playlist/" + props.id} >
                        <img src={props.thumbnail}/>
                    </Link>
                    <div className="card_img">
                        <img src={props.photo}/>
                    </div>
                    <div className="card_info">
                        <Link to={"/Channel"} >
                            <h2>{props.name}</h2>
                        </Link>
                        <h1>{props.title}</h1>
                        <div className={"defPlaylist"}>
                            <p>duração total: {props.duration} | {splitTime(getHoursDiff(new Date(props.timestamp), dateNow))}</p>
                            <div className="dropdown">
                             <FontAwesomeIcon onClick={()=>setDropdownState(!dropdownState)} className="dropbtn" icon={faGear}></FontAwesomeIcon>
                                {dropdownState&&<div id="myDropdown" className="dropdown-content">
                                        <a href={"/Playlist/" + props.id}>Editar playlist</a>
                                        <p onClick={()=>{setDeleteState(true)}}>Apagar playlist</p>
                                    {
                                        deleteState && <div className={"deletePlaylist"} style={{color:"red"}} > <strong>Are you sure you want to delete this playlist?</strong>
                                            <p onClick={confirmDelete}>YES</p>
                                            <p onClick={()=>setDropdownState(false)}>NO</p>
                                        </div>
                                    }
                                    </div>
                                }

                            </div>

                        </div>
                    </div>
                </div>

            </div>)

}

export default PlaylistCard;