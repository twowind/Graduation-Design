import React, { Component } from 'react';
import UserList from './user-list'

export default class User extends Component {
    render() {
        return (
            <div style={{ margin: 20 }}>
                <h1>
                    <b>用户列表</b>
                </h1>
                <hr></hr>
                {/* <List /> */}

                <UserList />
            </div>
        )
    }
}
