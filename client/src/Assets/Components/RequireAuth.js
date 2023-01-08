import React from "react";
import {UserContext} from "../../Providers/UserContext";
import {Redirect} from "react-router-dom";

export const RequireAuth = ({...children})=> {
    const {user, isLoading} = React.useContext(UserContext);

    console.log("require auth", user, isLoading, children);

    if(isLoading) return <div>Loading...</div>

    if(!isLoading && !user){
        return  <a href={"/login"}>You are not logged in! Click here to Login</a>;
    }
    return children
}

