import './App.css';

import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from "./Layout/Header";

import Home from "./Pages/Home.js";
import Login from "./Pages/Login/Login.js";
import Register from "./Pages/Register/Register.js";
import {UserContext} from "./Providers/UserContext";
import React, {useState} from "react";

function App() {
    const [user, setUser] = useState(null);

    console.log(user);
    return (
        <BrowserRouter>
            <UserContext.Provider value={{user, setUser}}>
                <div className="App">
                    {user && <Header/>}
                    <Switch>
                        {user && <Route path="/Home" component={Home}/>}
                        {user===null ? <Route path="/Register" component={Register}/> : <Redirect to={"/Home"}/>}
                        {user===null ? <Route path="/Login" component={Login}/> : <Redirect to={"/Home"}/>}
                        {user ? <Redirect to={"/Home"}/>: <Redirect to={"/Register"}/> }
                    </Switch>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default App;
