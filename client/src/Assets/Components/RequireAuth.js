import React from "react";
import {UserContext} from "../../Providers/UserContext";
import {Redirect} from "react-router-dom";

export const RequireAuth = ({children})=> {
    const {user, isLoading} = React.useContext(UserContext);


    if(isLoading) return <div>Loading...</div>

    if(!isLoading && !user){
        return <Redirect to={"/Login"}/>
    }
    return children
}

