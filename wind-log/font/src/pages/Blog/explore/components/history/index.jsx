import React, { Component } from 'react'
import { Menu } from 'antd';
import { connect } from 'umi'

class index extends Component {
    render() {
        return (
            <div>
                <Menu defaultSelectedKeys={[]} onClick={(e) => {
                    this.props.dispatch({
                        type: 'search/setSearch',
                        payload: e.key
                    })
                }} >
                    {this.props.search.searchHistory.map(item => {
                        return <Menu.Item key={item} >{item}</Menu.Item>
                    })}
                </Menu>
            </div>
        )
    }
}

export default connect(({ search }) => ({ search }))(index)
