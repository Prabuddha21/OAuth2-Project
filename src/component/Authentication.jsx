import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';

export default class Authentication extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        const {path} = this.props.path;
        const Component =  this.props.component;

        return <Route path={path} render={() => {
            return  <Component/> 
        }}/>
    }
}