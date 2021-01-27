import React from "react";
import { Route, Switch, HashRouter} from 'react-router-dom';

import Home from "./pages/Home";
import ViewRecipe from "./pages/ViewRecipe";


const {ipcRenderer} = window.require("electron");



const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/viewRecipe/:id" render={props => <ViewRecipe {... props} pcRen={ipcRenderer}></ViewRecipe>}>
                </Route>
                <Route path="/">
                    <Home pcRen={ipcRenderer}></Home>
                </Route>
            </Switch>
        </HashRouter>
    )
};

export default App;
