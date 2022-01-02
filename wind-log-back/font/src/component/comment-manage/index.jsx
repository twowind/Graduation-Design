import React, { Component } from 'react';

import List from './comment-list'

export default class index extends Component {
    render() {
        return (
            <div style={{ margin: 20 }}>
                <h1>
                    <b>评论列表</b>
                </h1>
                <hr></hr>
                <List />
            </div>
        )
    }
}
