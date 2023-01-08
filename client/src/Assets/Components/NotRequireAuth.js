import React from "react";
import {UserContext} from "../../Providers/UserContext";
import {Redirect} from "react-router-dom";

export const NotRequireAuth = ({...props})=> {
    const {user, isLoading} = React.useContext(UserContext);

    console.log("not require auth", user, isLoading, props);

    if(isLoading) return <div>Loading...</div>

    if(!isLoading && user){
        return <a href={"/Home"}>You are already logged in! Click here to go Home</a>;
    }
    return props.children;
}
