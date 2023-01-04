import React, {useEffect, useState} from 'react';
import axios from "axios";

const UserContext = React.createContext({});


const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading,setIsLoading]= useState(true);
    const [videos, setVideos] = useState([]);
    const [search,setSearch] =useState("");
    const [page, setPage] = useState(1);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/user/sessao',{
            withCredentials: true
        })
        .then(response => {
            console.log(response.data.user, "user frontend");
            setUser(response.data.user);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error,"erro sessao" );
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/tags')
            .then(response => {
                setTags(response.data)
            });
    }, []);


    useEffect(() => {
        axios.get('http://localhost:5000/video/search', {params: {page, search}, withCredentials: true})
            .then(response => setVideos(page === 1 ? response.data : [...videos, ...response.data]))
    }, [page,search]);


    useEffect(() => {
        setPage(1);
    }, [search])


    return <UserContext.Provider value={{user, setUser, videos,setVideos,isLoading,page,setPage, search,setSearch, tags,setTags}}>
        {children}
    </UserContext.Provider>
}

export {UserProvider, UserContext};