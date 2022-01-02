import React, { Component } from 'react';
import { Popover, Input, Menu, Layout } from 'antd';
import { connect, NavLink, history } from 'umi'
import { SearchOutlined } from '@ant-design/icons';
import { fetchSearchExploreArticles } from "@/services/articles";
import ExploreSider from './components/explore-sider';
import BlogList from '@/components/blog-list';
import BlogerSider from './components/bloger-sider'

const { Content, Sider } = Layout

class index extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'articles/getExploreArticle',
            payload: 'popular',
        })

        this.setHistory()
    }

    setHistory = () => {
        let history = JSON.parse(window.localStorage.getItem('history')) || []
        this.props.dispatch({
            type: 'search/setHistory',
            payload: history
        })
    }

    submit = async () => {
        if (this.props.search.search != '') {
            let history = JSON.parse(window.localStorage.getItem('history')) || []
            let tag = true
            for (let i = 0; i < history.length; i++) {
                if (history[i] === this.props.search.search) tag = false
            }
            if (tag) history = [this.props.search.search, ...history]
            if (history.length > 6) history = history.splice(0, 6)

            this.props.dispatch({
                type: 'search/setHistory',
                payload: history
            })
            window.localStorage.setItem('history', JSON.stringify(history))
        }
        let search = {
            content: this.props.search.search
        }
        let result = await fetchSearchExploreArticles(search)
        if (result.success === true) {
            this.props.dispatch({
                type: 'articles/setArticles',
                payload: result.data,
            })
        }

    }

    render() {
        return (
            <Layout>
                <ExploreSider />
                <Content>
                    <Layout>
                        <Content>
                            <div style={{ textAlign: 'center' }}>
                                <Popover content={(
                                    <div style={{ width: 650 }}>
                                        <Layout>
                                            <Sider width={120} style={{ backgroundColor: 'white' }}>
                                                <Menu>
                                                    <Menu.Item key='1'>
                                                        <NavLink to='/blog/explore/history' >搜索历史 </NavLink>
                                                    </Menu.Item>
                                                    <Menu.Item key='2'>
                                                        <NavLink to='/blog/explore/search' >高级搜索</NavLink>
                                                    </Menu.Item>
                                                </Menu>
                                            </Sider>
                                            <Content style={{ backgroundColor: 'white' }}>
                                                {this.props.children}
                                            </Content>
                                        </Layout>
                                    </div>
                                )} trigger="hover" placement="bottom">
                                    <Input
                                        onKeyDown={e => { if (e.keyCode === 13) this.submit() }}
                                        placeholder='Find Blog, Bloger, And Other'
                                        value={this.props.search.search}
                                        onChange={e => {
                                            this.props.dispatch({
                                                type: 'search/setSearch',
                                                payload: e.target.value
                                            })
                                        }}
                                        onClick={() => history.push('/blog/explore/history')}
                                        style={{ margin: 20, width: 650, height: 40, borderRadius: 7 }}
                                        prefix={<SearchOutlined
                                            style={{ fontSize: 20 }} />} />
                                </Popover>
                            </div>


                            <BlogList blogdata={this.props.articles.articles} />
                        </Content>
                        <BlogerSider />
                    </Layout>
                </Content>
            </Layout>
        )
    }
}

export default connect(({ articles, search }) => ({ articles, search }))(index)