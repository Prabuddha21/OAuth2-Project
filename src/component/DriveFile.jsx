import React, {Component} from 'react';
import axios from 'axios';

class DriveFile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: this.props.values,
        };
    }


    render() {
        return <div className="jumbotron">
            <div className="row">
                <div className="col-sm-8 col-md-6 mx-auto">
                    <h2>{this.state.values.name}</h2>
                    <table className="table mx-auto">
                        <tbody>
                        <tr>
                            <td>ID: {this.state.values.id}</td>
                        </tr>
                        <tr>
                            <td>Kind: {this.state.values.kind}</td>
                        </tr>
                        <tr>
                            <td>MIME type: {this.state.values.mimeType}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default DriveFile;