import "./SearchResults.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import {SearchContext} from "../../Providers/SearchContext";
import VideoCard from "../../Assets/Components/VideoCard/VideoCard";
import React, {useContext, useState} from "react";

export default function SearchResults() {

    const {videos} = React.useContext(SearchContext);

    console.log(videos)

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