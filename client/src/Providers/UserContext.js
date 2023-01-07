import React, {useEffect, useState} from 'react';
import axios from "axios";

const UserContext = React.createContext({});

//localhost port for api
const  API  = process.env.REACT_APP_API;

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading,setIsLoading]= useState(true);

    useEffect(() => {
        axios.get(`${API}/user/sessao`,{
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


    return <UserContext.Provider value={{user, setUser,isLoading}}>
        {children}
    </UserContext.Provider>
}

export {UserProvider, UserContext};