import './App.css';
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
import FeedbackForm from "./Pages/Feedback Form/FeedbackForm";
import {BrowserRouter, Route, Switch} from "react-router-dom";



function App() {

    //const {user, setUser} = React.useContext(UserContext);

    //  <RequireAuth></RequireAuth><NotRequireAuth> </NotRequireAuth>

    return <UserProvider>
        <BrowserRouter>
                <div className="App">
                    <Switch>
                        <AuthHandler
                            requireAuth={<>
                                <Route path="/Profile" component={Profile}/>
                            </>}
                            requireAnonymous={<>
                                <Route path="/Register" component={Register}/>
                                <Route path="/Login" component={Login}/>
                                <Route path="/Recoverpassword/:token" component={RecoverBytoken}/>
                                <Route path="/Recoverpassword" component={Recover}/>
                            </>}
                        >
                            <Route path="/Suggested" component={Suggested}/>

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
}

export default App;
