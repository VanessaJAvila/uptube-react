import './App.css';

import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from "./Layout/Header";
import Home from "./Pages/Home.js";
import Suggested from "./Pages/Suggested";
import Home from "./Pages/Home/Home.js";
import Login from "./Pages/Login/Login.js";
import Register from "./Pages/Register/Register.js";
import {UserContext, UserProvider} from "./Providers/UserContext";
import React, {useState,useEffect} from "react";
import Recover from "./Pages/Recover Password/Recover";
import RecoverBytoken from "./Pages/Recover Password/RecoverBytoken";
import SideBar from "./Layout/SideBar";
import axios from "axios";
import {RequireAuth} from "./components/RequireAuth";
import {NotRequireAuth} from "./components/NotRequireAuth";



function App() {

    const {user,setUser} = React.useContext(UserContext);

    return <UserProvider>
        <BrowserRouter>
                    <div className="App">
                        <Switch>
                                <Route path="/Login" component={Login}/>;
                                <Route path="/Register" component={Register}/>;
                                <Route path="/Recoverpassword/:token" component={RecoverBytoken}/>;
                                <Route path="/Recoverpassword" component={Recover}/>;
                                <Route path="/Home" component={Home}/>
                                <Redirect to={"/Home"}/>

                        </Switch>
                    </div>

                <div className="App">
                    <Switch>
                        <Route path="/Home" component={Home}/>
                        <Route path="/Suggested" component={Suggested}/>
                        <Route path="/Register" component={Register}/>
                        <Route path="/Login" component={Login}/>
                        <Route path="/Recoverpassword/:token" component={RecoverBytoken}/>
                        <Route path="/Recoverpassword" component={Recover}/>
                        <Redirect to={"/Login"}/>

                    </Switch>
                </div>

        </BrowserRouter>
    </UserProvider>
}

export default App;
