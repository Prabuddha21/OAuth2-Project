import React, {Component} from 'react';
import {BrowserRouter as Router, Route, useParams} from "react-router-dom";

import NavBar from './NavBar';
import Home from './Home';
import FileView from "./FileView";
import FileUpload from "./FileUpload";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Router>
            <div className="Dashboard">
                <NavBar/>
                <div>
                    <Route exact path='/dashboard'component = {Home}/>
                    <Route exact path="/dashboard/viewfiles" component={FileView}/>
                    {/* <Route exact path="/dashboard/uploadfiles" component={FileUpload}/> */}
                </div>
            </div>
        </Router>
    }
}