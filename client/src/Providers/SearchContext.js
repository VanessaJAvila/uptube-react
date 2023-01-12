import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";

const SearchContext = React.createContext({});

//localhost port for api
const API = process.env.REACT_APP_API;

const SearchProvider = ({children}) => {

    const location = useLocation();
    const [search,setSearch] =useState("");
    const [page, setPage] = useState(1);
    const [videos, setVideos] = useState([]);
    const history = useHistory();
    const [hasTags,setHasTags] = useState(true);
    const [tags, setTags] = useState([]);

    let tag = new URLSearchParams(location.search).get('tag')

    let handleTags = (tag) => {
        //console.log(tag)
        if (tags) {
            history.push("/SearchResults?tag="+tag.name);
        }
    }

    useEffect(() => {
        if (!tags) {
            console.log("tags variable is empty, cannot make API call");
            return;
        }
        axios
            .get(`${API}/tags/`)
            .then((response) => {
                setTags(response.data);
            })
            .catch((error) => {
                console.log(error, "Error fetching tags");
            });
    }, []);


    useEffect(() => {
        setPage(1);
    }, [tags])

    useEffect(() => {
     
        axios
            .get(`${API}/video/search?search=${search}&page=${page}`, {
                withCredentials: true,
            })
            .then((response) => {
                setVideos(page === 1 ? response.data : [...videos, ...response.data]);
                setHasTags(false);
            })
            .catch((error) => {
                console.log("search results:", error)
                console.log(error, "Error fetching search results");
            });
    }, [page, search]);


    useEffect( () => {
        if (!tag) {
            console.log("tag variable is empty, cannot make API call");
            return;
        }
        axios
            .get(`${API}/video/search/tag?search=${tag}`)
            .then((response) => {
                setVideos(response.data);
            })
            .catch((error) => {
                console.log(error, "Error fetching search tags results");
            });
    }, [tag]);


    //console.log("tags="+videos);

    let handleSearch = (e) => {
        setSearch(e.target.value)
        if(search) {
            history.push("/SearchResults")
        }}

    return <SearchContext.Provider value={{search,setSearch,page,setPage,videos,setVideos,tags, hasTags,setHasTags,handleSearch,handleTags,SearchProvider}}>
        {children}
    </SearchContext.Provider>
}

export {SearchProvider, SearchContext};