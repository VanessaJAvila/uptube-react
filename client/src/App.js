import './App.css';
import axios from "axios";
import Suggested from "./Pages/Suggested";
import Home from "./Pages/Home/Home.js";
import Login from "./Pages/Login/Login.js";
import Register from "./Pages/Register/Register.js";
import {UserContext, UserProvider} from "./Providers/UserContext";
import React from "react";
import Recover from "./Pages/Recover Password/Recover";
import RecoverBytoken from "./Pages/Recover Password/RecoverBytoken";
import UserChannel from "./Pages/Channel/UserChannel";
import Channel from "./Pages/Channel/Channel";
import Profile from "./Pages/Profile/Profile";
import Delete from "./Pages/Delete/Delete";
import Playlists from "./Pages/Playlists/Playlists";
import {RequireAuth} from "./Assets/Components/RequireAuth";
import {NotRequireAuth} from "./Assets/Components/NotRequireAuth";
import playlist from "./Pages/Playlist/Playlist";
import SearchResults from "./Pages/Search Results/SearchResults";
import Channels from "./Pages/Channels/Channels";
import {SearchProvider} from "./Providers/SearchContext";
import VideoStreamingPage from "./Pages/VideoStreamingPage/VideoStreamingPage";
import WatchHistory from "./Pages/WatchHistory/WatchHistory";
import Studio from "./Pages/Studio/Studio";
import AuthHandler from "./Assets/Components/AuthHandler";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {createContext, useState} from "react";
import ReactSwitch from "react-switch";
import Administrador from "./Pages/Administrador/Administrador.js"

export const ThemeContext = createContext(null);

axios.defaults.withCredentials = true;

function App() {

    //const {user, setUser} = React.useContext(UserContext);

    //  <RequireAuth></RequireAuth><NotRequireAuth> </NotRequireAuth>

    const [theme, setTheme]= useState("dark");

    const toggleTheme = () => {
        setTheme((curr) =>(curr === "dark" ? "light" : "dark"));
    };

    let Admin;
    return  <ThemeContext.Provider value={{ theme,toggleTheme}}>
    <UserProvider>
        <BrowserRouter>
                <div className="App" id={theme}>
                    <div className={"switch"}>
                        <label>{theme === "light" ? "Light Mode" : "Dark Mode" }</label>
                        <ReactSwitch className={"button"} onChange={toggleTheme} checked={theme ==="dark"}/>
                    </div>
                    <Switch>
                        <AuthHandler
                            requireAuth={<>
                                <Route path="/Profile" component={Profile}/>

                            </>}
                            requireAnonymous={<>
                                <Route path="/Register" component={Register}/>
                                <Route path="/Login" component={Login}/>
                            </>}
                        >
                            <Route path="/Suggested" component={Suggested}/>
                            <Route path="/Recoverpassword" exact={true} component={Recover}/>
                            <Route path="/Recoverpassword/:token" component={RecoverBytoken}/>
                            <Route path="/Admin" component={Administrador}/>
                            <SearchProvider>
                                <Route path="/Home" component={Home}/>
                                <Route path="/UserChannel" component={UserChannel}/>
                                <Route path="/Channel/:user_id" component={Channel}/>
                                <Route path="/Channels" component={Channels}/>
                                <Route path="/Delete" component={Delete}/>
                                <Route path ="/player/:id" component ={VideoStreamingPage}/>
                                <Route path ="/studio" component ={Studio}/>
                                <Route path ="/history" component ={WatchHistory}/>
                                <Route path ="/Playlists" component ={Playlists}/>
                                <Route path="/Playlist/:playlist_id" component={playlist}/>
                                <Route path="/SearchResults" component={SearchResults}/>
                            </SearchProvider>
                        </AuthHandler>
                    </Switch>
                </div>
        </BrowserRouter>
    </UserProvider>
    </ThemeContext.Provider>
}

export default App;
