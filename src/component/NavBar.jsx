import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class NavBar extends Component{

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut(event){
        event.preventDefault();
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('accessToken');
        sessionStorage.clear();
        this.props.history.push("/");
        window.location.reload();
    }

    render() {
        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">OAUTH2 Dashboard</a>
            <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse justify-content-md" id="navbar1">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Google Drive
                        </a>
                        <div className="dropdown-menu">
                            <Link to="/dashboard/viewfiles" className="dropdown-item">
                                View Google Drive
                            </Link>
                            <Link to="/dashboard/uploadfiles" className="dropdown-item">
                                Upload File to Drive
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link onClick={this.logOut} to="/dashboard" className="nav-link">
                            LogOut
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    }
}

export default withRouter(NavBar);