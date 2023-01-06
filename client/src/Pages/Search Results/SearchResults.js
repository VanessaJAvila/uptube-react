import "./SearchResults.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import React, {useEffect, useState} from "react";
import {UserContext} from "../../Providers/UserContext";
import {SearchContext} from "../../Providers/SearchContext";
import VideoCard from "../../Assets/Components/VideoCard/VideoCard";
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";

export default function SearchResults() {

    const {user} = React.useContext(UserContext);
    const {videos,setVideos,search,setSearch} = React.useContext(SearchContext);

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
