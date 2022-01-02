import React, { Component } from 'react';
import {Route, Switch,Redirect} from 'react-router-dom'

import Login from './component/login';
import Admin from './component/admin'

export default class index extends Component {
    render() {
        return (
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/admin' component={Admin}/>
                <Redirect to='/login'/>
            </Switch>
        )
    }
}
