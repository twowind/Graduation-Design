import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Tag } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card'
import '@ant-design/pro-card/dist/card.css'

// import store from '../../../store';

class index extends Component {

    toBlogContent = () => {
        const { articleId } = this.props
        this.props.history.push(`/blog/content/${articleId}`)
    }

    toUserProfile = (username) => {
        if (username === JSON.parse(window.localStorage.getItem('user')).userName) {
            this.props.history.push('/blog/profile')
        } else {
            this.props.history.push(`/blog/other/${username}`)
        }
    }

    render() {
        const { userAvatar, userNickname, articleTitle, articleCreateTime, articleSummary, articleTags, username } = this.props;

        return (
            <div style={{ margin: '20px 20px 0px 20px', backgroundColor: 'white', borderRadius: 10 }} >
                <ProCard split="vertical" hoverable size='small'>
                    <ProCard colSpan="10%" split='horizontal' onClick={() => { this.toUserProfile(username) }}  >
                        <ProCard layout='center'>
                            <Avatar shape="square" size={64} src={userAvatar} />
                        </ProCard>
                        <ProCard layout='center'>
                            <div style={{ fontWeight: 'bold' }}>{userNickname}</div>
                        </ProCard>
                    </ProCard>
                    <ProCard split='horizontal' onClick={this.toBlogContent}>
                        <ProCard>
                            <div style={{ fontWeight: 'bold' }} >{articleTitle}</div>
                        </ProCard>
                        <ProCard>
                            <div>{articleSummary}</div>
                        </ProCard>
                        <ProCard split='vertical'>
                            <ProCard>
                                <div>
                                    <TagOutlined />
                                    <span style={{ marginLeft: 5 }}>
                                        {/* {tags} */}
                                        {articleTags.map((item, index) => {
                                            return <Tag key={index}>{item.tagName}</Tag>
                                        })}
                                    </span>
                                </div>
                            </ProCard>
                            <ProCard>
                                <div>{new Date(articleCreateTime).toLocaleDateString()}</div>
                            </ProCard>
                        </ProCard>
                    </ProCard>
                </ProCard>
            </div>
        )
    }
}

export default withRouter(index)