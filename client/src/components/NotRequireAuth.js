import React from "react";
import {UserContext} from "../Providers/UserContext";
import {Redirect} from "react-router-dom";

export const NotRequireAuth = ({children})=> {
    const {user} = React.useContext(UserContext);

    if(user){
        return <Redirect to={"/Home"}/>
    }
    return children
}
