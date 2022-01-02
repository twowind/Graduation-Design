import React, { Component } from 'react';
import { Layout, Avatar, List, Space, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { WeiboCircleOutlined, GithubOutlined } from '@ant-design/icons'

import { fetchUser } from '@/services/users'
import { fetchArticlesByUserId } from '@/services/articles'
import { followUser, fetchIsFollow } from '@/services/follow'
import ListItem from '@/components/blog-list/list-item';
import backgroundImg from '@/assets/background.jpg';
import Messgae from './messgae'

const { Content } = Layout;

class index extends Component {

    state = {
        blogdata: [],
        user: {},
        isFollow: false,
    }

    async componentDidMount() {
        await this.getUser()
        await this.getBlogs()
        await this.searchFollow()
    }

    getUser = async () => {
        let { username } = this.props.match.params
        let result = await fetchUser(username)
        if (result.success === true) {
            this.setState({ user: result.data })
        }
    }

    getBlogs = async () => {
        let { userId } = this.state.user

        let result = await fetchArticlesByUserId(userId)
        if (result.success === true) {
            this.setState({ blogdata: result.data })
        }
    }

    follow = async () => {
        let user = JSON.parse(window.localStorage.getItem('user'))
        if (user == null) {
            this.props.history.push('/start')
        }

        await this.setState({ isFollow: !this.state.isFollow })
        let follow = {
            followId: user.userId,
            followedId: this.state.user.userId,
        }
        let result = await followUser(follow, this.state.isFollow)
        if (result.success === true) {
            let { username } = this.props.match.params
            let res =await fetchUser(username)
            if (res.success === true) {
                this.setState({ user: res.data })
            }
        }
    }

    searchFollow = async () => {
        let user = JSON.parse(window.localStorage.getItem('user'))
        let follow = {
            followId: user.userId,
            followedId: this.state.user.userId,
        }
        let result = await fetchIsFollow(follow)
        if (result.success === true) {
            this.setState({ isFollow: true })
        } else {
            this.setState({ isFollow: false })
        }
    }

    render() {

        const { followCount, followedCount, userNickname, userAvatar, userGithub, userWeibo } = this.state.user

        return (
            <Layout>
                <Content style={{ backgroundColor: 'white' }}>
                    <div style={{
                        textAlign: 'center',
                        width: '100%',
                        backgroundImage: `url(${backgroundImg})`,
                        backgroundSize: 'cover',
                        color: 'white'
                    }}>
                        <Avatar
                            shape='circle'
                            size={128}
                            draggable
                            style={{ border: '2px solid grey', marginTop: 20 }}
                            src={userAvatar} />

                        <div style={{ fontSize: 32, fontWeight: 'bolder' }}>{userNickname}</div>

                        <div style={{ fontWeight: 500 }}>
                            <span>{followedCount}</span>
                            <span style={{ margin: "0px 5px" }}>followers</span>
                            <span>·</span>
                            <span style={{ margin: "0px 5px" }}>{followCount}</span>
                            <span>following</span>
                            <Button
                                type='ghost'
                                size='small'
                                onClick={this.follow}
                                style={{ marginLeft: 10, color: 'white' }}>{this.state.isFollow ? 'followed' : 'follow'}</Button>
                        </div>

                        <Space style={{ margin: '5px 0px' }}>
                            <a
                                href={`https://weibo.com/${userWeibo}`}
                                rel='noopener noreferrer external'
                                target="_blank" style={{ color: 'white' }}>
                                <WeiboCircleOutlined style={{ fontSize: 25 }} />
                            </a>
                            <a
                                href={`https://github.com/${userGithub}`}
                                rel='noopener noreferrer external'
                                target="_blank"
                                style={{ color: 'white' }}>
                                <GithubOutlined style={{ fontSize: 25 }} />
                            </a>
                        </Space>
                    </div>

                    <div style={{ float: 'left', width: '60%', borderRadius: 15, height: '600px', overflow: 'auto' }}>
                        <InfiniteScroll
                            initialLoad={true}
                            pageStart={0}
                            loadMore={(e) => { console.log(e) }}
                            hasMore={false}
                            useWindow={false}>
                            <List
                                dataSource={this.state.blogdata}
                                renderItem={item => (
                                    <ListItem {...item} />
                                )}
                            />
                        </InfiniteScroll>

                    </div>

                    <div style={{ margin: '100px 100px' }}>
                        <div >Messages</div>
                        <div>
                            <Messgae userId={this.state.user.userId} />
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}


export default withRouter(index)