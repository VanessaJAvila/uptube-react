import "./SearchResults.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import React, {useEffect, useState} from "react";
import {UserContext} from "../../Providers/UserContext";
import VideoCard from "../../Assets/Components/VideoCard/VideoCard";
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";

export default function SearchResults() {

    const location = useLocation();
    const [videos, setVideos] = useState([]);

    let tag = new URLSearchParams(location.search).get('tag')

    console.log(videos)

    useEffect(() => {
        axios
            .get("http://localhost:5000/video/search/tag", {
                params: { search: tag},
                withCredentials: true,
            })
            .then((response) => {
                console.log(response.data);
                setVideos(response.data);
            })
            .catch((error) => {
                console.log(error, "Error fetching search results");
            });
    }, [tag]);

    return <div className={"container-search-results"}>
        <Header/>
        <SideBar/>
        <div className={"container-results"}>
            <h4 className={"search-title"}>Resultados da pesquisa</h4>
            <div className={"geral"}>
                {!videos && <p>A carregar...</p>}
                {videos && <>
                    {videos.length === 0 && <p className={"no results"}> Sem Resultados</p>}
                    {videos.map((v, idx) => (<VideoCard type="geral" key={idx} {...v}/>))}
                </>}
            </div>
        </div>

    </div>
}
