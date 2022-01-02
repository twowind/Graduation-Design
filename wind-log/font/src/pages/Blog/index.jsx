import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { history } from 'umi';
import {
    PlusOutlined,
    SearchOutlined,
    SettingOutlined,
    ProfileOutlined,
    HighlightOutlined,
} from '@ant-design/icons';

const { Sider } = Layout
export default class index extends Component {

    switchRoute = (item) => {
        let path = ''

        switch (item.key) {
            case '1':
                path = 'edit'
                break;
            case '2':
                path = 'user'
                break;
            case '3':
                path = 'explore'
                break;
            case '4':
                path = 'set'
                break;
            default:
                path = 'explore'
        }
        history.push('/blog/' + path);
    }

    render() {
        return (
            <Layout>
                <Sider style={{ height: '93vh', backgroundColor: 'white', boxShadow: '0px 0px 5px black', zIndex: '2' }}>
                    <div style={{ textAlign: 'center', marginTop: 50 }}>
                        <HighlightOutlined style={{ fontSize: 50, color: 'orange' }} onClick={() => { history.push(`/blog/profile`) }} />
                    </div>

                    <Menu style={{ marginTop: 150 }} >
                        <Menu.Item key="1" style={{ marginTop: 50 }} icon={<PlusOutlined />} onClick={this.switchRoute}>
                            发布博客
                        </Menu.Item>
                        <hr></hr>
                        <Menu.Item key="2" style={{ marginTop: 50 }} icon={<ProfileOutlined />} onClick={this.switchRoute} >
                            我的博客
                        </Menu.Item>
                        <hr></hr>
                        <Menu.Item key="3" style={{ marginTop: 50 }} icon={<SearchOutlined />} onClick={this.switchRoute} >
                            探索
                        </Menu.Item>
                        <hr></hr>
                        <Menu.Item key="4" style={{ marginTop: 50 }} icon={<SettingOutlined />} onClick={this.switchRoute} >
                            设置
                        </Menu.Item>
                        <hr></hr>
                    </Menu>
                </Sider>

                {this.props.children}

            </Layout>
        )
    }
}
