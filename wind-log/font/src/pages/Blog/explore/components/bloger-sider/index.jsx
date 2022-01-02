import React, { Component } from 'react'
import { Layout, Avatar, Typography } from 'antd';
import ProCard from '@ant-design/pro-card'
import { WeiboCircleOutlined, GithubOutlined } from '@ant-design/icons'
import { fetchExploreUser } from '@/services/users'
import { history } from 'umi'

const { Sider, Content } = Layout
const { Paragraph, Text } = Typography;
export default class index extends Component {

    state = {
        users: [],
    }

    async componentDidMount() {
        this.getPopularUser()
    }

    getPopularUser = async () => {
        let result = await fetchExploreUser()
        if (result.success === true) {
            this.setState({ users: result.data })
        }
    }

    toUserProfile = (username) => {
        let token = JSON.parse(window.atob(window.localStorage.getItem('token').split('.')[1]))
        if (username === token.username) {
            history.push('/blog/profile')
        } else {
            history.push(`/blog/other/${username}`)
        }
    }

    render() {
        return (
            <Sider width={250} style={{ height: '93vh', overflow: 'auto', backgroundColor: '#F0F2F5' }}>
                <Layout>
                    <Content>
                        {this.state.users.map(item => {
                            return (
                                <div key={item.userId}>
                                    <ProCard

                                        split='horizontal'
                                        size='small'
                                        hoverable
                                        bordered
                                        direction='row'
                                        style={{ backgroundColor: 'white', borderRadius: 20 }}
                                    >
                                        <ProCard layout='center' direction='column' onClick={() => { this.toUserProfile(item.userName) }}>
                                            <Avatar src={item.userAvatar} size={64} />
                                            <Text strong style={{ fontSize: 15 }}>{item.userNickname}</Text>
                                            <Text>{item.userLocation}</Text>
                                        </ProCard>

                                        <ProCard layout='center' style={{ backgroundColor: '#F5F5F5' }} size='small'>
                                            <a
                                                href={`https://weibo.com/${item.userWeibo}`}
                                                rel='noopener noreferrer external'
                                                target="_blank">
                                                <WeiboCircleOutlined style={{ fontSize: 25 }} />
                                            </a>
                                            <a
                                                href={`https://github.com/${item.userGithub}`}
                                                rel='noopener noreferrer external'
                                                target="_blank"
                                            >
                                                <GithubOutlined style={{ fontSize: 25 }} />
                                            </a>
                                        </ProCard>

                                        <ProCard layout='center' style={{ backgroundColor: '#F5F5F5' }}>
                                            <Paragraph style={{ width: 175 }}
                                                ellipsis={
                                                    {
                                                        rows: 3,
                                                        expandable: true,
                                                    }
                                                }>{item.userBio}</Paragraph>
                                        </ProCard>
                                    </ProCard>
                                    <hr style={{ marginBottom: 10 }}></hr>
                                </div>
                            )
                        })}
                    </Content>
                </Layout>
            </Sider>
        )
    }
}

