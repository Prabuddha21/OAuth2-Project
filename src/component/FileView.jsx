import React, {Component} from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import DriveFile from "./DriveFile";


export default class FileView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            user: "",
            files: []
        };
    }

    componentWillMount() {
        const token = JSON.parse(window.sessionStorage.getItem('accessToken'));
        console.log(token);
        axios.post('http://localhost:3000/readDrive', {"token": token}).then((data) => {
            this.setState({files: data.data});
            console.log(data.data);
        }).catch(err => {
            console.log(err);
        })
    }


    render() {
        const files = this.state.files.map(item => {
            return <DriveFile key={item.id} values={item}/>
        });

        return <div className="jumbotron jumbotron-fluid text-center">
            <h1 className="h1 align-content-center">Drive File List</h1>
            <br/>
            <div className="mx-auto">
                <div className="jumbotron bg-light">
                        {files !== null ? files : <p>No Files</p>}
                </div>
            </div>
        </div>
    }
}