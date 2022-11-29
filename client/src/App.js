import './App.css';

import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from "./Layout/Header";

import Home from "./Pages/Home.js";
import Login from "./Pages/Login/Login.js";
import Register from "./Pages/Register/Register.js";
import {UserContext, UserProvider} from "./Providers/UserContext";
import React, {useState} from "react";
import SideBar from "./Layout/SideBar";

function App() {

    const {user,setUser} = React.useContext(UserContext);

    console.log("app", user);
    return <UserProvider>
        <BrowserRouter>

                <div className="App">
                    {user && <Header/>}
                    <Switch>
                        <Route path="/Home" component={Home}/>
                        <Route path="/Register" component={Register}/>
                        <Route path="/Login" component={Login}/>
                        <Redirect to={"/Login"}/>

                    </Switch>
                </div>

        </BrowserRouter>
    </UserProvider>
}

export default App;
