import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import Article from '../../article-manage';
import User from "../../user-manage";
import Comment from '../../comment-manage';
import Home from '../../home'
import Message from '../../message_manage'

const { Content } = Layout;

export default class index extends Component {
    render() {
        return (
            <Content >
                <Switch>
                    <Route path="/admin/user" component={User} />
                    <Route path="/admin/article" component={Article} />
                    <Route path="/admin/comment" component={Comment} />
                    <Route path="/admin/home" component={Home} />
                    <Route path="/admin/message" component={Message} />
                    <Redirect to="/admin/home" />
                </Switch>
            </Content>

        )
    }
}
