
import './App.css';

import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from "./Pages/home.js";


function App() {
    return (

            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route path="/Home" component={Home}/>
                        <Redirect to={"/Home"}/>
                    </Switch>
                </div>
            </BrowserRouter>

    )
}

export default App;
