import "./SearchResults.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import React from "react";
import {UserContext} from "../../Providers/UserContext";
import {useHistory} from "react-router-dom";
import VideoCard from "../../Components/VideoCard/VideoCard"

export default function SearchResults() {
    const {user,search,page, videos} = React.useContext(UserContext);
    const history = useHistory();


    return <div className={"container-search-results"}>
        <Header/>
        <SideBar/>
        <div className={"container-results"}>
            <h4 className={"search-title"}>Resultados da pesquisa</h4>
            <div className={"search-results"}>
            {!videos && <p>A carregar...</p>}
            {videos && <>
                {videos.length === 0 && <p className={"no results"}> Sem Resultados</p>}
                {videos.map((v, idx) => (<VideoCard type="geral" key={idx} {...v}/>))}
            </>}
        </div>
        </div>

    </div>
}
