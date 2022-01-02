import React, { Component } from 'react';
import { Comment, Avatar, Form, Button, List, Input, message } from 'antd';

const { TextArea } = Input;
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={item => {
            return <div key={item.messageId}>
                <Comment
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                />
            </div>
        }
        }

    />
);


const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={2} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);


export default class index extends Component {

    state = {
        comments: [],
        submitting: false,
        value: '',
    };

    handleSubmit = async () => {

        let user = JSON.parse(window.localStorage.getItem('user'))
        // 空数据返回不提交
        if (!this.state.value) return


        this.setState({
            submitting: true,
        });

        let message_content = {
            messagedId: this.props.userId,
            messagerId: user.userId,
            messageContent: this.state.value
        }

        try {
            let response = await fetch('http://localhost:8080/send_message', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                    'token': window.localStorage.getItem('token'),
                },
                body: JSON.stringify(message_content),
            })
            let rs = await response.json()
            if (rs.success !== true) {
                message.error({
                    content: 'Send error! please retry',
                    style: {
                        marginTop: '20vh'
                    }
                })
                this.setState({
                    submitting: false,
                })
                return
            }

            this.setState({
                submitting: false,
                value: '',
            })

            message.success({
                content: 'Send Message Success!',
                style: {
                    marginTop: '20vh'
                }
            })

        } catch (error) {
            console.log(error)
            message.error({
                content: 'Send Message Error! Please Retry ',
                style: {
                    marginTop: '20vh'
                }
            })
            this.setState({
                submitting: false,
            })
        }
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { comments, submitting, value } = this.state;

        let { userAvatar, userNickname } = JSON.parse(window.localStorage.getItem('user'))

        return (
            <>
                {comments.length > 0 && <CommentList comments={comments} />}


                <Comment
                    avatar={
                        <Avatar
                            src={userAvatar}
                            alt={userNickname}
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </>
        );
    }
}
