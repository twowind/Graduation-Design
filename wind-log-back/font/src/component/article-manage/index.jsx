import React, { Component } from 'react'
import List from './article-list'


export default class index extends Component {
    render() {
        return (
            <div style={{ margin: 20 }}>
                <h1>
                    <b>博客列表</b>
                </h1>
                <hr></hr>
                <List />
            </div>
        )
    }
}
