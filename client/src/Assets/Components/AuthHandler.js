import {UserContext} from "../../Providers/UserContext";
import React from "react";

const AuthHandler = (props) => {
    const {user, isLoading} = React.useContext(UserContext);

    if (isLoading) return <div>Loading...</div>

    let ch = props.children;
    if (user) {
        ch = [...ch, props.requireAuth];
    } else {
        ch = [...ch, props.requireAnonymous];
    }

    return ch;
}

export default AuthHandler;