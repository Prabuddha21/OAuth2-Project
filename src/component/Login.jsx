import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        //this.props.history.push('/dashboard');
        axios.get('http://localhost:3000/getAuthURL',)
        .then(data => { 
            console.log(data);
            window.location.href = data.data;
        })
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Welcome</h1>
                        <br/>
                        <h1 className="h3 mb-3 font-weight-normal">This is a project made using OAuth2</h1>
                        <h1 className="h3 mb-3 font-weight-normal">Please login using a google account by clicking on bellow button</h1>
                        <br/>
                        <br/>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Login);