import React, {useEffect, useState} from 'react';
import axios from "axios";

const UserContext = React.createContext("");



const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/user/sessao',{
            withCredentials: true
        })
            .then(response => {
                console.log(response.data.user, "user frontend");
                setUser(response.data.user);
            }).catch((error) => {
            console.log(error, user,"erro sessao" );
        });
    }, []);

    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}

export {UserProvider, UserContext};