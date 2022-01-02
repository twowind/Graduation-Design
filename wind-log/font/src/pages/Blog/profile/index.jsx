import React, { Component } from 'react';
import { Layout, Avatar, List, Space, Button, Drawer, Typography } from 'antd';
import ProCard from '@ant-design/pro-card';
import InfiniteScroll from 'react-infinite-scroller';
import { WeiboCircleOutlined, GithubOutlined } from '@ant-design/icons'
import { connect } from 'umi'

import ListItem from '@/components/blog-list/list-item'
import backgroundImg from '@/assets/background.jpg';
import Messgae from './messgae'

const { Content } = Layout;
const { Title } = Typography;
class index extends Component {

    state = {
        blogdata: [],
        user: {},
        comments: [],
        isDrawer: false,
        follows: [],
    }

    async componentDidMount() {
        let user = JSON.parse(window.localStorage.getItem('user'))
        this.props.dispatch({
            type: 'articles/getArticlesByUserId',
            payload: user.userId
        })

        this.props.dispatch({
            type: 'user/fetchUserByUsername',
            payload: user.userName
        })
    }

    getFollowers = async () => {
        let response = await fetch(`http://localhost:8080/getfollowers/${this.props.user.user.userId}`, {
            headers: {
                'token': window.localStorage.getItem('token')
            }
        })
        let result = await response.json()
        if (result !== 'ok') console.log(result);
        this.setState({ follows: result.rs })
    }

    getFolloweds = async () => {
        let response = await fetch(`http://localhost:8080/getfolloweds/${this.props.user.user.userId}`, {
            headers: {
                'token': window.localStorage.getItem('token'),
            }
        })
        let result = await response.json()
        if (result !== 'ok') console.log(result);
        this.setState({ follows: result.rs })
    }



    render() {

        const { followCount, followedCount, userNickname, userAvatar, userGithub, userWeibo, userLocation } = this.props.user.user
        const blogdata = this.props.articles.articles

        return (
            <Layout>
                <Content style={{ backgroundColor: 'white', height: '92vh' }} >
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

                        <div>
                            <Space>
                                <Button type="text" style={{ color: 'white' }} onClick={() => {
                                    this.getFollowers()
                                    this.setState({ isDrawer: true })
                                }}>
                                    {followedCount + "  粉丝"}
                                </Button>
                                <Button type="text" style={{ color: 'white' }} onClick={() => {
                                    this.getFolloweds()
                                    this.setState({ isDrawer: true })
                                }}
                                >
                                    {followCount + "  关注"}
                                </Button>
                            </Space>
                        </div>

                        <div>
                            {userLocation}
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

                    <div style={{ float: 'left', width: '60%', borderRadius: 15, height: '550px', overflow: 'auto' }}>
                        <InfiniteScroll
                            initialLoad={true}
                            pageStart={0}
                            loadMore={(e) => { console.log(e) }}
                            hasMore={false}
                            useWindow={false}>
                            <List
                                dataSource={blogdata}
                                renderItem={item => (
                                    <ListItem key={item.articleId} {...item} />
                                )}
                            />
                        </InfiniteScroll>

                    </div>

                    <div style={{ margin: '30px 100px', height: '550px', overflow: 'auto' }}>
                        <InfiniteScroll
                            initialLoad={true}
                            pageStart={0}
                            loadMore={(e) => { console.log(e) }}
                            hasMore={false}
                            useWindow={false}>
                            <Messgae />
                        </InfiniteScroll>
                    </div>

                    <Drawer
                        width={400}
                        closable
                        maskClosable={true}
                        visible={this.state.isDrawer}
                        onClose={() => this.setState({ isDrawer: false })}
                    >

                        {this.state.follows.map(item => {
                            return (<ProCard key={item.userId} split='vertical' size='small'>
                                <ProCard colSpan='20%' onClick={() => {
                                    this.props.history.push(`/blog/other/${item.userName}`)
                                }}>
                                    <Avatar src={item.userAvatar}></Avatar>
                                </ProCard>

                                <ProCard direction='column'>
                                    <Title level={5}>{item.userNickname}</Title>
                                    <div>
                                        {item.userBio}
                                    </div>
                                </ProCard>
                            </ProCard>)
                        })}

                    </Drawer>


                </Content>
            </Layout>
        )
    }
}


export default connect(({ articles, user }) => ({ articles, user }))(index)