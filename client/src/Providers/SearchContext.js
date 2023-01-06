import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";

const SearchContext = React.createContext({});


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
        console.log(tag)
        if (tags) {
            history.push("/SearchResults?tag="+tag.name);
        }
    }

    useEffect(() => {
        axios
            .get("http://localhost:5000/tags")
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
            .get(`http://localhost:5000/video/search?search=${search}&page=${page}`, {
                withCredentials: true,
            })
            .then((response) => {
                setVideos(page === 1 ? response.data : [...videos, ...response.data]);
                setHasTags(false);
            })
            .catch((error) => {
                console.log(error, "Error fetching search results");
            });
    }, [page, search]);


    useEffect( () => {
        axios
            .get(`http://localhost:5000/video/search/tag?search=${tag}`, {
                withCredentials: true,
            })
            .then((response) => {
                setVideos(response.data);
            })
            .catch((error) => {
                console.log(error, "Error fetching search tags results");
            });
    }, [tag]);


    console.log("tags="+videos);

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