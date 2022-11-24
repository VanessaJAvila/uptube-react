import './App.css';

import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register/Register.js";
import {UserContext} from "./Providers/UserContext";
import React, { useState} from "react";

function App() {
    const {user,setUser} = useState(null);


    return (
            <BrowserRouter>
                <UserContext.Provider value ={{user,setUser}}>
                <div className="App">
                    <Switch>
                            {user && <Route path="/Home" component={Home}/>}
                            {!user && <Route path="/Register" component={Register}/>}
                            {!user && <Route path="/Login" component={Login}/>}
                            <Redirect to={"/Register"}/>
                    </Switch>
                </div>
                </UserContext.Provider>
            </BrowserRouter>
    )
}

export default App;
