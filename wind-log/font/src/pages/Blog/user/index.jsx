import React, { Component, useState, useEffect } from 'react';
import { Layout } from 'antd';
import MySider from './sider';
import BlogList from '@/components/blog-list';
import { connect } from 'umi'

const { Content, Sider } = Layout;

class index extends Component {

    async componentDidMount() {
        let token = JSON.parse(window.atob(window.localStorage.getItem('token').split('.')[1]))
        this.props.dispatch({
            type: 'articles/getArticlesByUserId',
            payload: token.userId,
        })
    }

    render() {
        return (
            <Layout>
                <Sider width={250} style={{ backgroundColor: '#F0F0F2', boxShadow: '0px 0px 5px black', zIndex: '1' }}>
                    <MySider blogdata={this.props.articles.articles} />
                </Sider>
                <Content>
                    <BlogList blogdata={this.props.articles.articles} />
                </Content>
            </Layout>
        )
    }
}

export default connect(({ articles }) => ({ articles }))(index)