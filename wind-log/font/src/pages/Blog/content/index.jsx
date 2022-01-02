import React, { Component } from 'react';
import { Avatar, Button, Modal, Space, Layout, Radio, Input, Popover, message } from 'antd';
import { ShareAltOutlined, createFromIconfontCN } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import { connect, history } from 'umi'
import copy from 'copy-to-clipboard';
import hljs from 'highlight.js'
import 'github-markdown-css';

import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import tasklists from 'markdown-it-task-lists'
import 'highlight.js/styles/atom-one-light.css'

import { fetchIsStar, starArticle, cancleStar, fetchStarCategory } from "@/services/star";
import { fetchIsLike, likeArticle, cancleLike } from "@/services/like";
import { fetchIsFollow, followUser } from "@/services/follow";
import { deleteArticle } from '@/services/articles'

import Comment from './comment';

class index extends Component {

    state = {
        articleId: 0,
        isStar: false,
        starCategory: '默认收藏单',
        starCategoryAll: [],
        love: false,
        isFollow: false,
        articleUserId: 0,
        editable: false,
        isModalVisible: false,
        isLike: false,
        createStar: false,
        newCategory: '',
    }

    async componentDidMount() {
        let articleId = this.props.match.params.articleId
        this.props.dispatch({
            type: 'articles/getArticleById',
            payload: articleId
        })
        this.getStarCategory()
        this.getArticleStar()
        this.getArtilceLike()
        this.getFollow()
    }

    // 关注和取消关注
    follow = async () => {
        await this.setState({ isFollow: !this.state.isFollow })
        let follow = {
            followId: JSON.parse(window.localStorage.getItem('user')).userId,
            followedId: this.props.articles.article.articleUserId,
        }
        let result = await followUser(follow, this.state.isFollow)
    }

    // 查看是否关注
    getFollow = async () => {
        let follow = {
            followId: JSON.parse(window.localStorage.getItem('user')).userId,
        }
        let result = await fetchIsFollow(follow, this.props.match.params.articleId)
        if (result.success === true) {
            this.setState({ isFollow: true })
        }
    }

    // 编辑跳转
    edit = () => {
        history.push('/blog/edit', this.props.articles.article)
    }

    // 删除文章
    delete = async () => {
        let result = await deleteArticle(this.props.match.params.articleId)
        if (result.success === true) {
            message.success('删除成功！')
            history.push('/blog/user')
        } else {
            message.error(result.errorMessage)
        }
    }

    // 获取用户收藏单的分类
    getStarCategory = async () => {
        let result = await fetchStarCategory(JSON.parse(window.localStorage.getItem('user')).userId)
        if (result.success === true) {
            this.setState({ starCategoryAll: result.data })
        } else {
            message.error(result.errorMessage)
        }
    }

    // 查看这篇文章是否收藏
    getArticleStar = async () => {
        let user = JSON.parse(window.localStorage.getItem('user'))
        if (user === undefined) {
            this.setState({ isStar: false })
            return
        }
        let result = await fetchIsStar(user.userId, this.props.match.params.articleId)
        if (result.success === true) {
            this.setState({ isStar: true })
        } else {
            this.setState({ isStar: false })
        }
    }

    // 收藏文章
    starArticle = async () => {
        let star = {
            articleId: this.props.match.params.articleId,
            userId: JSON.parse(window.localStorage.getItem('user')).userId,
            starCategory: this.state.starCategory,
        }
        let result = await starArticle(star)
        if (result.success !== true) {
            message.error(result.errorMessgae)
        } else {
            this.setState({ isModalVisible: false, isStar: true })
        }
    }

    // 取消收藏
    cancleStar = async () => {
        let star = {
            userId: JSON.parse(window.localStorage.getItem('user')).userId,
            articleId: parseInt(this.props.match.params.articleId),
        }
        let result = await cancleStar(star)
        if (result.success === true) {
            this.setState({ isStar: false })
        }
    }

    // 查看文章是否点赞
    getArtilceLike = async () => {
        let like = {
            likeUserId: JSON.parse(window.localStorage.getItem('user')).userId,
            likedArticleId: this.props.match.params.articleId,
        }
        let result = await fetchIsLike(like)
        if (result.success === true) {
            this.setState({ isLike: true })
        }
    }

    // 点赞文章
    likeArticle = async () => {
        let like = {
            likeUserId: JSON.parse(window.localStorage.getItem('user')).userId,
            likedArticleId: this.props.match.params.articleId,
        }
        let result = await likeArticle(like)
        if (result.success === true) {
            this.setState({ isLike: true })
        }
    }

    // 取消点赞
    cancelLike = async () => {
        let like = {
            likeUserId: JSON.parse(window.localStorage.getItem('user')).userId,
            likedArticleId: this.props.match.params.articleId,
        }
        let result = await cancleLike(like)
        if (result.success === true) {
            this.setState({ isLike: false })
        }
    }


    render() {

        const MyIcon = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_2524955_p39j1t4yyqa.js' })
        const { userAvatar, articleTitle, articleContent, articleCreateTime, articleUpdateTime, articleSummary, articleCategory, userNickname, username } = this.props.articles.article
        const result = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true,
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str).value
                    } catch (__) { }
                }
                return '' // use external default escaping
            }
        })
            .use(emoji)
            .use(subscript)
            .use(superscript)
            .use(footnote)
            .use(deflist)
            .use(abbreviation)
            .use(insert)
            .use(mark)
            .use(tasklists, { enabled: this.taskLists })
            .render(articleContent || '')

        return (
            <Layout style={{ padding: '0px 100px', backgroundColor: 'white', height: '93vh' }}>
                <div>
                    <Avatar style={{ float: 'left' }} size={80} src={userAvatar} onClick={() => { history.push(`/blog/other/${username}`) }} />
                    <div style={{ paddingTop: 20 }}>
                        <div>
                            <span style={{ fontSize: 15, fontWeight: 'bolder' }}>
                                {userNickname}
                            </span>
                            <Button size='small' style={{ marginLeft: 10, color: 'green' }} onClick={this.follow}>{this.state.isFollow ? 'followed' : 'follow'}</Button>
                        </div>
                        <div style={{ marginTop: 15 }}>{new Date(articleCreateTime).toLocaleDateString()}</div>
                    </div>
                </div>

                <div>
                    <hr></hr>
                    <Button style={{ display: this.state.isStar ? 'none' : 'inline' }} type="text" icon={<MyIcon type='icon-staro' style={{ fontSize: 25 }} onClick={() => { this.setState({ isModalVisible: true }) }} />} />
                    <Button style={{ display: this.state.isStar ? 'inline' : 'none' }} type="text" icon={<MyIcon type='icon-star1' style={{ fontSize: 25 }} onClick={this.cancleStar} />} />
                    <Button type="text" icon={<ShareAltOutlined style={{ marginLeft: 20, fontSize: 20 }} />} onClick={() => {
                        copy('http://localhost:8000' + history.location.pathname)
                        message.success("已经复制链接到剪切版！快分享给朋友吧！")
                    }} />
                    <Button style={{ display: this.state.isLike ? 'none' : 'inline' }} type="text" icon={<MyIcon type='icon-like' style={{ marginLeft: 40, fontSize: 25 }} onClick={this.likeArticle} />} />
                    <Button style={{ display: this.state.isLike ? 'inline' : 'none' }} type="text" icon={<MyIcon type='icon-like_fill' style={{ marginLeft: 40, fontSize: 25 }} onClick={this.cancelLike} />} />
                    <Button style={{ display: this.props.articles.article.articleUserId === JSON.parse(window.localStorage.getItem('user')).userId ? 'inline' : 'none', marginLeft: 60 }} onClick={this.edit}>修改</Button>
                    <Button style={{ display: this.props.articles.article.articleUserId === JSON.parse(window.localStorage.getItem('user')).userId ? 'inline' : 'none', marginLeft: 60 }} onClick={this.delete}>删除</Button>
                </div>

                <div style={{ float: 'left', width: '100%', borderRadius: 15, height: '750px', overflow: 'auto' }}>
                    <div style={{ width: '100%', height: 'auto', marginTop: 10, border: '1px solid black' }}>
                        {articleSummary}
                    </div>

                    <InfiniteScroll
                        initialLoad={true}
                        pageStart={0}
                        loadMore={(e) => { console.log(e) }}
                        hasMore={false}
                        useWindow={false}>

                        <div ref={c => {
                            if (c !== null) {
                                c.innerHTML = result
                            }
                        }} style={{ margin: 20, backgroundColor: 'white' }} className='markdown-body'>
                        </div>

                        <hr></hr>

                        <Comment articleId={this.props.match.params.articleId} auth={this.props.articles.article.articleUserId === JSON.parse(window.localStorage.getItem('user')).userId} />
                    </InfiniteScroll >

                </div>

                <Modal
                    visible={this.state.isModalVisible}
                    mask={false}
                    onCancel={() => this.setState({ isModalVisible: false })}
                    title='添加到收藏夹'
                    footer={
                        <Button type="primary" onClick={this.starArticle}>确定</Button>
                    }
                    width={450}
                    style={{ marginTop: 200 }}>

                    <Radio.Group onChange={(e) => { this.setState({ starCategory: e.target.value }) }} value={this.state.starCategory}>
                        <Space direction="vertical">
                            <Radio value='默认收藏单'>默认收藏单</Radio>
                            {this.state.starCategoryAll.map((item, index) => {
                                return <Radio key={index} value={item}>{item}</Radio>
                            })}
                        </Space>
                    </Radio.Group>

                    <Button
                        style={{ width: 400, height: 40, display: this.state.createStar ? 'none' : 'block' }}
                        onClick={() => {
                            this.setState({ createStar: true })
                        }}>新建收藏夹</Button>

                    <Popover content={'按下回车新建收藏单'} trigger="hover">
                        <Input
                            onKeyDown={e => {
                                if (this.state.newCategory === '') return
                                if (e.key === 'Enter') {
                                    this.setState({ createStar: false, starCategoryAll: [...this.state.starCategoryAll, this.state.newCategory] })
                                }
                            }}
                            value={this.state.newCategory}
                            onChange={e => this.setState({ newCategory: e.target.value })}
                            style={{ width: 400, height: 40, display: this.state.createStar ? 'block' : 'none' }}
                            addonAfter={<div style={{ cursor: 'pointer' }} onClick={() => this.setState({ createStar: false })}>取消</div>}
                        />
                    </Popover>


                </Modal>
            </Layout>
        )
    }
}

export default connect(({ articles }) => ({ articles }))(index)