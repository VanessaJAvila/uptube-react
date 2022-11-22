
import './App.css';

import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from "./Pages/home.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";

function App() {
    return (

            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route path="/Home" component={Home}/>
                        <Route path="/Register" component={Register}/>
                        <Route path="/Login" component={Login}/>
                        <Redirect to={"/Home"}/>
                    </Switch>
                </div>
            </BrowserRouter>

    )
}

export default App;
