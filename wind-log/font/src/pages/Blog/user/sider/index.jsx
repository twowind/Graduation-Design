import React, { Component } from 'react';
import { Layout, Menu, Tag, Button } from 'antd';
import { MenuUnfoldOutlined, TagOutlined } from '@ant-design/icons';
import { connect, history } from 'umi'
import {
    fetchArticlesCategoryByUserId,
    fetchTagArticle,
    fetchStarArticlesCategory,
    fetchStarCategory,
    fetchStarArticles
} from '@/services/articles'

const { Sider } = Layout;
const { SubMenu } = Menu;
const { CheckableTag } = Tag;

class index extends Component {

    token = JSON.parse(window.atob(window.localStorage.getItem('token').split('.')[1]))

    state = {
        tags: [],
        article: [],
        tagChecked: new Map(),
        starArticle: [],
        // categoryArticles,
    };

    componentDidMount() {
        this.getCategory()
        this.getTags()
        this.getArticleInStarToCategory()
    }

    // 按分类返回用户文章
    getCategory = async () => {
        this.props.dispatch({
            type: 'articles/getArticleToCategory',
            payload: this.token.userId,
        })
    }

    // 获得我的所有博客
    getBlog = () => {
        let token = JSON.parse(window.atob(window.localStorage.getItem('token').split('.')[1]))
        this.props.dispatch({
            type: 'articles/getArticlesByUserId',
            payload: token.userId,
        })
    }

    // 获得所有标签
    async getTags() {
        let tags = await this.props.dispatch({
            type: 'tags/fetchUserTags',
            payload: this.token.userId,
        })
        this.setState({ tags })
        let map = new Map()
        for (let i = 0; i < tags.length; i++) {
            map.set(tags[i].tagId, false)
        }
        this.setState({ tags, tagChecked: map });
    }

    // 获得该分类下的所有博客
    getCategoryArticle = async (e) => {
        let articleCategory = e.key
        let user = JSON.parse(window.localStorage.getItem('user'))
        let result = await fetchArticlesCategoryByUserId(articleCategory, user.userId)
        this.props.dispatch({
            type: 'articles/setArticles',
            payload: result.data,
        })
    }

    toBlogContent = (e) => {
        const articleId = e.key
        history.push(`/blog/content/${articleId}`)
    }

    // 获得含有该标签的文章
    getAricleByTag = async (tagId, checked) => {
        let map = this.state.tagChecked
        map.set(tagId, checked)
        await this.setState({ tagChecked: map })
        let tags = [];
        map.forEach(function (value, key) {
            if (value === true)
                tags.push(key)
        })
        let userId = JSON.parse(window.localStorage.getItem('user')).userId
        let result = await fetchTagArticle(userId, tags)
        if (result.success === true) {
            this.props.dispatch({
                type: 'articles/setArticles',
                payload: result.data,
            })
        }
    }

    // 获取我的收藏分类的所有文章
    getArticleInStarToCategory = async () => {
        let { userId } = JSON.parse(window.localStorage.getItem('user'))
        let result = await fetchStarArticlesCategory(userId)
        if (result.success === true) {
            this.setState({ starArticle: result.data })
        }
    }

    // 获取我的收藏某一分类的文章
    getCategoryArticleToStar = async (e) => {
        let articleCategory = e.key
        let { userId } = JSON.parse(window.localStorage.getItem('user'))
        let result = await fetchStarCategory(articleCategory, userId)
        if (result.success === true) {
            this.props.dispatch({
                type: 'articles/setArticles',
                payload: result.data,
            })
        }
    }

    getStarBlog = async () => {
        let { userId } = JSON.parse(window.localStorage.getItem('user'))
        let result = await fetchStarArticles(userId)
        if (result.success === true) {
            this.props.dispatch({
                type: 'articles/setArticles',
                payload: result.data,
            })
        }
    }

    render() {
        return (
            <div>
                <div style={{ margin: '10px 0px 0px 10px' }}>
                    <Button type="link" onClick={this.getBlog}>我的博客</Button>
                    <p style={{ fontWeight: 'bolder', marginLeft: 10, display: 'inline' }}></p>
                </div>

                <div style={{ margin: '10px 0px 0px 10px' }}>
                    <div style={{ marginBottom: 10, marginLeft: 10 }}>
                        <MenuUnfoldOutlined style={{ fontSize: 15 }} />
                        <p style={{ fontWeight: 'bolder', marginLeft: 10, display: 'inline' }}>Category</p>
                    </div>

                    <Menu style={{ backgroundColor: '#F0F0F2' }} >
                        {this.props.articles.categoryArticles.map((item) => {
                            return (
                                <SubMenu key={item.articleCategory} title={item.articleCategory} onTitleClick={this.getCategoryArticle}>
                                    {item.articleCategoryList.map((item) => {
                                        return <Menu.Item key={item.articleId} onClick={this.toBlogContent}>{item.articleTitle}</Menu.Item>
                                    })}
                                </SubMenu >
                            )
                        })}
                    </Menu>

                    <div style={{ marginBottom: 10, marginLeft: 10 }}>
                        <div>
                            <TagOutlined style={{ fontSize: 15 }} />
                            <p style={{ fontWeight: 'bolder', marginLeft: 15, display: 'inline' }}>Tags</p>
                        </div>
                        <div>
                            {
                                this.state.tags.map(
                                    (tag) => <CheckableTag
                                        key={tag.tagId}
                                        checked={this.state.tagChecked.get(tag.tagId)}
                                        style={{ marginTop: 10 }}
                                        onChange={checked => this.getAricleByTag(tag.tagId, checked)}
                                    >{tag.tagName}</CheckableTag>
                                )
                            }
                        </div>

                    </div>
                </div>

                <hr style={{ marginTop: 10, marginBottom: 10 }}></hr>

                <div style={{ margin: '10px 0px 0px 10px' }}>
                    <Button type="link" onClick={() => {
                        this.getStarBlog()
                    }}>我的收藏</Button>
                </div>

                <div style={{ margin: '10px 0px 0px 10px' }}>
                    <div style={{ marginBottom: 10, marginLeft: 10 }}>
                        <MenuUnfoldOutlined style={{ fontSize: 15 }} />
                        <p style={{ fontWeight: 'bolder', marginLeft: 10, display: 'inline' }}>Category</p>
                    </div>

                    <Menu style={{ backgroundColor: '#F0F0F2' }} >
                        {this.state.starArticle.map((item) => {
                            return (
                                <SubMenu key={item.articleCategory} title={item.articleCategory} onTitleClick={this.getCategoryArticleToStar}>
                                    {item.articleCategoryList.map((item) => {
                                        return <Menu.Item key={item.articleId} onClick={this.toBlogContent}>{item.articleTitle}</Menu.Item>
                                    })}
                                </SubMenu >
                            )
                        })}
                    </Menu>

                </div>
            </div>
        )

    }
}

export default connect(({ articles }) => ({ articles }))(index)