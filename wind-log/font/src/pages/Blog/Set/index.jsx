import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { StarOutlined, UserOutlined, } from '@ant-design/icons';
import { history, connect } from "umi";

const { Sider, Content } = Layout;
export default class index extends Component {

    //设置栏的路由选择
    switchRoute = (item) => {
        let path = ''
        switch (item.key) {
            case '1':
                path = ''
                break;
            case '2':
                path = '/account'
                break;
            default:
                path = ''
        }
        history.push('/blog/Set' + path);
    }

    render() {
        return (
            <Layout>
                <Sider
                    style={{ backgroundColor: '#F0F0F2', boxShadow: '0px 0px 5px black', zIndex: '1' }}>

                    <Menu style={{ backgroundColor: '#F0F0F2', marginTop: 30 }}>
                        <Menu.Item style={{ fontWeight: 'bolder' }} key="1" icon={<UserOutlined style={{ fontSize: 15 }} />} onClick={this.switchRoute}>
                            用户信息
                    </Menu.Item>
                        <hr></hr>
                        <Menu.Item style={{ fontWeight: 'bolder' }} key="2" icon={<StarOutlined style={{ fontSize: 15 }} />} onClick={this.switchRoute}>
                            账户设置
                    </Menu.Item>
                        <hr></hr>
                    </Menu>
                </Sider>
                <Content style={{ backgroundColor: 'white' }}>
                    {this.props.children}
                </Content>

            </Layout>
        )
    }
}