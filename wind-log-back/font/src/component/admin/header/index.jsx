import React, { Component } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { withRouter } from 'react-router-dom'

const { Header } = Layout;

class index extends Component {

    logout = () => {
        window.localStorage.removeItem("token")
        this.props.history.push('/login')
    }

    render() {
        return (
            <Header>
                <Dropdown overlay={(
                    <Menu>
                        <Menu.Item>
                            <p onClick={this.logout}>注销</p>
                        </Menu.Item>
                        <Menu.Item>
                            <p>切换用户</p>
                        </Menu.Item>
                    </Menu>
                )} style={{ float: 'right' }}>
                    <a href="/" className="ant-dropdown-link">
                        超级管理员
                    </a>
                </Dropdown>
            </Header>
        )
    }
}

export default withRouter(index)