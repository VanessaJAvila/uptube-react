import {useEffect, useState} from "react";
import axios from "axios";

//todo: change to logged user

//localhost port for api
const API = process.env.REACT_APP_API;

function Suggested() {

    const [userWatchedTags, setUserWatchedTags]=useState("");
    const [allVideos, setAllVideos] = useState("");

    useEffect(() => {
        axios.get(`${API}/suggested/tags/4`)
            .then(response => {setUserWatchedTags(response.data);});
        axios.get(`${API}/suggested/allvideos`)
            .then(response => {setAllVideos(response.data);});
    }, []);
    //console.log(userWatchedTags)


    return <p>oi</p>;
}

export default Suggested;