import React from "react";
import "./PlaylistCard.scss";
import {Link} from "react-router-dom";

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




// <div className={"playlist"}>   </div>))}

function PlaylistCard(props){

            return (<div className="playlist">
                <Link to={"/Playlist/" + props.id} >
                    <img src={props.thumbnail}/>
                </Link>
                <img src={props.photo}/>
                <h2>{props.name}</h2>
                <h1>{props.title}</h1>
                <p>duração total: {props.duration} | {splitTime(getHoursDiff(new Date(props.timestamp), dateNow))}</p>
            </div>)

}

export default PlaylistCard;