import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Suggested from "./Pages/Suggested";
import Home from "./Pages/Home/Home.js";
import Login from "./Pages/Login/Login.js";
import Register from "./Pages/Register/Register.js";
import {UserContext, UserProvider} from "./Providers/UserContext";
import React from "react";
import Recover from "./Pages/Recover Password/Recover";
import RecoverBytoken from "./Pages/Recover Password/RecoverBytoken";
import Channel from "./Pages/Channel/Channel";
import Profile from "./Pages/Profile/Profile";
import Delete from "./Pages/Delete/Delete";
import Playlist from "./Pages/Playlist/Playlist";
import SearchResults from "./Pages/Search Results/SearchResults";
import Channels from "./Pages/Channels/Channels";
import {SearchProvider} from "./Providers/SearchContext";



function App() {

    const {user, setUser} = React.useContext(UserContext);

    //  <RequireAuth></RequireAuth><NotRequireAuth> </NotRequireAuth>

    return <UserProvider>
        <BrowserRouter>
            <div className="App">
                <Switch>

                    <Route path="/Profile" component={Profile}/>
                    <Route path="/Register" component={Register}/>
                    <Route path="/Login" component={Login}/>
                    <Route path="/Suggested" component={Suggested}/>
                    <Route path="/Recoverpassword/:token" component={RecoverBytoken}/>
                    <Route path="/Recoverpassword" component={Recover}/>
                    <SearchProvider>
                    <Route path="/Home" component={Home}/>
                    <Route path="/Channel" component={Channel}/>
                    <Route path="/Channels" component={Channels}/>
                    <Route path="/Delete" component={Delete}/>
                    <Route path="/Playlist" component={Playlist}/>
                    <Route path="/SearchResults" component={SearchResults}/>
                    </SearchProvider>
                </Switch>
            </div>

        </BrowserRouter>
    </UserProvider>
}

export default App;
