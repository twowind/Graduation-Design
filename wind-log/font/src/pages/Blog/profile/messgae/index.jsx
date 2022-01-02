import React, { Component } from 'react';
import { Comment, Button, List, Input, message } from 'antd';
import { fetchMessage, deleteMessage, sendMessage } from '@/services/messages'


export default class index extends Component {

    state = {
        messages: [],
        showMessage: new Map(),
        replyValue: '',
    };

    // 回复留言
    reply = async (messagerId, index) => {
        // 空数据返回不提交
        if (!this.state.replyValue) return

        let user = JSON.parse(window.localStorage.getItem('user'))
        let message_content = {
            messagedId: messagerId,
            messagerId: user.userId,
            messageContent: this.state.replyValue
        }


        let result = await sendMessage(message_content)
        if (result.success === true) {
            this.switchShowReply(index)
            message.success('Send sucess!')
        } else {
            message.error('Send Message Error! Please Retry ')
        }
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    componentDidMount() {
        this.getMessage()
    }

    getMessage = async () => {
        let result = await fetchMessage(JSON.parse(window.localStorage.getItem('user')).userId)
        if (result.success === true) {
            let showMessage = new Map()
            let messages = []

            for (let i = 0; i < result.data.length; i++) {
                showMessage.set(i, false)
                messages = [...messages, {
                    author: result.data[i].userNickname,
                    avatar: result.data[i].userAvatar,
                    content: <p>{result.data[i].messageContent}</p>,
                    datetime: new Date(result.data[i].messageTime).toLocaleDateString(),
                    userId: result.data[i].messagerId,
                    key: result.data[i].messageId
                }]
            }
            this.setState({ showMessage, messages })
        }

    }



    switchShowReply = (index) => {
        let showMessage = this.state.showMessage;
        showMessage.set(index, !showMessage.get(index))
        showMessage.forEach(function (value, key) {
            if (value === true && key !== index) {
                showMessage.set(key, false)
            }
        })

        this.setState({ showMessage })
    }

    deleteComment = (messageId) => {
        deleteMessage(messageId)
        this.getMessage()
    }



    render() {
        const { messages } = this.state;

        return (
            <>
                <div>{`${messages.length} ${messages.length > 1 ? 'messages' : 'message'}`}</div>

                {messages.length > 0 && <List
                    dataSource={messages}
                    itemLayout="horizontal"
                    renderItem={(item, index) => {
                        // console.log('message', item);
                        return <div>
                            <Comment
                                key={item.messageId}
                                actions={[<span onClick={() => { this.switchShowReply(index) }}>回复</span>, <span onClick={() => { this.deleteComment(item.key) }}>删除</span>]}
                                author={<div>
                                    <span>{item.author}</span>
                                </div>}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={new Date(item.datetime).toLocaleDateString()}
                            />
                            <Input
                                key={item.messageId + 'input'}
                                onChange={(e) => { this.setState({ replyValue: e.target.value }) }}
                                style={{ display: this.state.showMessage.get(index) ? 'block' : 'none' }}
                                value={this.state.replyValue}
                                addonAfter={
                                    <Button
                                        htmlType="submit"
                                        onClick={() => { this.reply(item.userId, index) }}
                                        type="primary">回复</Button>} />
                        </div>
                    }
                    }

                />}

            </>
        );
    }

}