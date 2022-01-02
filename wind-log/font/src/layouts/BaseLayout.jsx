import React, { Component } from 'react'
import { Layout, Button, Dropdown, Menu, Avatar } from 'antd';
import { DownOutlined, UserOutlined, StarOutlined, ReadOutlined } from '@ant-design/icons'
import { history, connect } from 'umi';
// import { tokenLogin } from '@/services/users'


const { Header } = Layout;

class index extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'user/tokenLogin',
            payload: null
        })
    }

    logout = () => {
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('history')
        this.props.dispatch({
            type: 'user/deleteUser',
            payload: null
        })
        history.push('/');
    }

    render() {
        const isLogin = JSON.stringify(this.props.user.user) === '{}'
        const user = this.props.user.user||{}
        return (
            <Layout>
                <Header style={{ backgroundColor: 'tomato', height: '7vh' }}>
                    <span>
                        <Button type="dashed" style={{ width: 100 }} onClick={() => { history.push('/blog/explore'); }} >探索</Button>
                    </span>
                    <span style={{ float: 'right', display: isLogin ? 'none' : 'block' }}>
                        <Dropdown
                            overlay={<div style={{ backgroundColor: 'white', borderRadius: '10px 10px 0 0', marginTop: 10 }}>
                                <span style={{ color: 'black', margin: 10 }}>
                                    <b> {user.userNickname || null}</b>
                                </span>

                                <hr style={{ margin: '0 5px' }}></hr>

                                <Menu>
                                    <Menu.Item key="1" icon={<UserOutlined />} onClick={() => history.push('/blog/profile')}>
                                        个人
                                </Menu.Item>
                                    <Menu.Item key="2" icon={<StarOutlined />} onClick={() => history.push('/blog/user')}>
                                        我的博客
                                </Menu.Item>
                                    <Menu.Item key="3" icon={<ReadOutlined />} onClick={this.logout} >
                                        注销
                                </Menu.Item>
                                </Menu>
                            </div>}
                            placement="bottomLeft">
                            <span style={{ marginLeft: 15 }}>
                                <Avatar shape="circle" size="small" src={user.userAvatar} />
                                <DownOutlined style={{ color: 'white', marginLeft: 3 }} />
                            </span>
                        </Dropdown>
                    </span>
                    <span style={{ float: 'right', display: isLogin ? 'block' : 'none' }}>
                        <Button type='text' onClick={() => history.push('/')}>登录</Button>
                    </span>
                </Header>

                {this.props.children}

            </Layout>
        )
    }
}

export default connect(({ user }) => ({ user }))(index)