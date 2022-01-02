import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { MailOutlined, CommentOutlined, HomeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;
export default class index extends Component {

    state = {
        openKeys: ['sub0', 'sub1', 'sub2', 'sub3', 'sub4']
    }
    
    render() {
        return (
            <Sider width={256} style={{ backgroundColor: 'white' }}>
                <Menu theme="light" mode="inline" openKeys={this.state.openKeys} >

                    <SubMenu key='sub0' icon={<HomeOutlined />} title='首页'>
                        <Menu.Item key='0' >
                            <NavLink to="/admin/home">
                                首页
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>


                    <SubMenu key="sub1" icon={<MailOutlined />} title="用户管理">
                        <Menu.Item key="1">
                            <NavLink to="/admin/user">
                                所有用户
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub2" icon={<MailOutlined />} title="博客管理">
                        <Menu.Item key="2">
                            <NavLink to="/admin/article">
                                所有博客
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub3" icon={<CommentOutlined />} title="评论管理">
                        <Menu.Item key="3">
                            <NavLink to="/admin/comment">
                                所有评论
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<CommentOutlined />} title="留言管理">
                        <Menu.Item key="4">
                            <NavLink to="/admin/message">
                                所有留言
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}
