import React, { Component } from 'react';
import { Comment, Avatar, Form, Button, Input, message, Popconfirm, Modal, Collapse } from 'antd';
import ProList from '@ant-design/pro-list';
import { MessageOutlined } from '@ant-design/icons';
import { fetchComment, commentArticle, deleteComment } from "@/services/comment";
import { connect, history } from 'umi'


const { TextArea } = Input;
class index extends Component {

    state = {
        submitting: false,
        value: '',
        recommentValue: '',
        isModalVisible: false,
        commentId: 0,
        action: {},
    };

    myRef = React.createRef()

    metas = {
        title: {
            dataIndex: 'userNickname',
            search: false,
        },
        avatar: {
            dataIndex: 'userAvatar',
        },
        description: {
            dataIndex: 'articleComment',
            search: false,
        },
        subTitle: {
            render: (_, record) => {
                return <span>{record.commentPid === 0 ? '' : '回复 ' + record.puserNickname}</span>
            }
        },
        actions: {
            render: (_, record, index, action) => [
                <Button key='review_button' type="text" onClick={() => { this.setState({ isModalVisible: true, commentId: record.commentId }) }}><MessageOutlined style={{ margin: '0 0px 0 20px' }} />回复</Button>,
                <Popconfirm key='popconfirm_del' title="确定删除？" okText="是" cancelText="否" onConfirm={async () => {
                    await deleteComment(record.commentId)
                    action.reload()
                }}>
                    <Button key='button_del' type="text"
                        style={{ display: (record.commentUserId === JSON.parse(window.localStorage.getItem('user')).userId) || this.props.auth ? 'inline' : 'none' }} >删除</Button>
                </Popconfirm>,
                // <Collapse defaultActiveKey={['1']} bordered={false}>
                //     <Panel header="回复" key="1">
                //         <p></p>
                //     </Panel>
                // </Collapse>,
            ],
            search: false,
        },
    }

    // 回复
    reComment = async () => {
        if (!this.state.recommentValue) return
        let user = JSON.parse(window.localStorage.getItem('user'))
        if (Object.getOwnPropertyNames(user).length === 0) {
            history.push('/start')
            return
        }
        let comment = {
            articleId: this.props.articleId,
            commentUserId: user.userId,
            articleComment: this.state.recommentValue,
            commentPid: this.state.commentId,
        }
        let result = await commentArticle(comment)
        if (result.success !== true) {
            message.error({ content: '评论失败请重试！' })
        } else {
            this.myRef.current.reload()
            this.setState({ isModalVisible: false })
        }
    }

    // 评论
    handleSubmit = async () => {
        // 空数据返回不提交
        if (!this.state.value) return
        let user = JSON.parse(window.localStorage.getItem("user"))
        if (Object.getOwnPropertyNames(user).length === 0) {
            history.push('/start')
        }
        this.setState({
            submitting: true,
        });

        let comment = {
            articleId: this.props.articleId,
            commentUserId: user.userId,
            articleComment: this.state.value,
            commentPid: 0
        }

        let result = await commentArticle(comment)
        if (result.success === false) {
            message.error('评论失败请重试！')
        } else {
            this.myRef.current.reload()
            this.setState({ submitting: false, value: '' })
        }
    };

    render() {
        const { userAvatar } = JSON.parse(window.localStorage.getItem('user'))
        return (
            <div>
                <Comment
                    avatar={
                        <Avatar
                            src={userAvatar}
                            alt="Han Solo"
                        />
                    }
                    content={
                        <>
                            <Form.Item>
                                <TextArea rows={2} onChange={(e) => this.setState({ value: e.target.value })} value={this.state.value} />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" loading={this.submitting} onClick={this.handleSubmit} type="primary">
                                    Add Comment
                                </Button>
                            </Form.Item>
                        </>
                    }
                />

                <ProList
                    rowKey="commentId"
                    request={async () => { return await fetchComment(this.props.articleId) }}
                    showActions='always'
                    itemLayout="vertical"
                    metas={this.metas}
                    actionRef={this.myRef}
                    split={true}
                />

                <Modal
                    visible={this.state.isModalVisible}
                    mask={false}
                    onCancel={() => this.setState({ isModalVisible: false })}
                    footer={
                        <Button type="primary" onClick={this.reComment}>发送</Button>
                    }
                    style={{ marginTop: 200 }}>
                    <TextArea showCount value={this.state.recommentValue} onChange={(e) => this.setState({ recommentValue: e.target.value })} />
                </Modal>

            </div>
        );
    }
}


export default connect(({ user }) => ({ user }))(index)