import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Login from './component/Login';
import Dashboard from './component/Dashboard';
import Authentication from './component/Authentication';

export default class AppComponent extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return <Router>
            <div className="AppContainer">
                <Switch>
                <Route exact path="/" component={Login}/>
                <Authentication path="/dashboard" component={Dashboard}/>
                </Switch>
            </div>
        </Router>
    }
}