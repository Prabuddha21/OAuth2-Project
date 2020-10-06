import React, {Component} from 'react';
import {BrowserRouter as Router, Route, useParams} from "react-router-dom";
import jwt from 'jsonwebtoken';
import axios from 'axios';

export default class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            userData: []
        };
    }

    componentWillMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        let token = params.get('code');

        axios.post('http://localhost:3000/getToken', {"code": token}).then(data => {
            window.sessionStorage.setItem("token", token);
            window.sessionStorage.setItem("accessToken", JSON.stringify(data.data));
            axios.post('http://localhost:3000/userProfile', {"token": data.data}).then(data => {
                this.setState({userData: data.data});
                window.sessionStorage.setItem("userData", data.data);
            });
        });;
    }

    render() {
        const info = this.state.userData;

        return <div className="jumbotron jumbotron-fluid text-center">
            <h1 className="h1 align-content-center">User Information</h1>
            <div className="mx-auto">
                <div className="jumbotron">
                    <div className="container mt-2">
                        <div className="row">
                            <div className="col-md-6 mt-5 mx-auto">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="faculty">Profile Picture</label>
                                        <img src={info.picture} alt="Profile Picture"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="firstName">Given Name</label>
                                        <input type="text"
                                            name="Name"
                                            placeholder=""
                                            className="form-control"
                                            value={info.given_name}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">ID</label>
                                        <input type="text"
                                            name="ID"
                                            placeholder=""
                                            className="form-control"
                                            value={info.id}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="designation">Name</label>
                                        <input type="text"
                                            name="designation"
                                            placeholder="Enter Designation"
                                            className="form-control"
                                            value={info.name}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    }
}