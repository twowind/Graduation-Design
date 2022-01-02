import React, { Component } from 'react';
import { Layout } from 'antd';

import Sider from './sider';
import Header from './header'
import Content from './content'

export default class index extends Component {

  render() {
    return (
      <Layout>
        <Header />
        <Layout>
          <Sider />
          <Content />
        </Layout>
      </Layout>
    );
  }
}