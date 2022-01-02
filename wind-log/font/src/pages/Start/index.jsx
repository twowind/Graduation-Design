import React, { Component } from 'react';
import { Layout } from 'antd';

import backgroundImg from '@/assets/background.jpg';
import BlogDesCription from './blog-description';
import LoginRegister from './login-register'

const { Content } = Layout;

export default class index extends Component {

    backgroundStyle = {
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '93vh'
    }

    render() {
        return (
            <div>
                <Content style={this.backgroundStyle}>
                    <BlogDesCription />
                    <LoginRegister />
                </Content>
            </div>
        )
    }
}
