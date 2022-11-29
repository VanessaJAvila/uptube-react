import {useEffect, useState} from "react";
import axios from "axios";

//todo: change to logged user
function Suggested() {

    const [userWatchedTags, setUserWatchedTags]=useState("");
    const [allVideos, setAllVideos] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/suggested/tags/4`)
            .then(response => {setUserWatchedTags(response.data);});
        axios.get(`http://localhost:3000/suggested/allvideos`)
            .then(response => {setAllVideos(response.data);});
    }, []);
    console.log(userWatchedTags)


    return <p>oi</p>;
}

export default Suggested;