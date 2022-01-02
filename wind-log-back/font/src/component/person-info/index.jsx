import React, { Component } from 'react';
import { Avatar } from 'antd';

export default class index extends Component {
    render() {
        return (
            <div style={{width:200}}>
                <Avatar src="https://avatars.githubusercontent.com/u/35649857?v=4" size={75} gap="100"></Avatar>
                <h1>WindLog</h1>
            </div>
        )
    }
}
