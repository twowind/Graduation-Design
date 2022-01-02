import React, { Component } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { UserOutlined, CommentOutlined, FileSearchOutlined, MessageOutlined } from '@ant-design/icons';

export default class index extends Component {

    state = {
        newUsers: 0,
        newComments: 0,
        allUsers: 0,
        newMessages: 0,
    }

    render() {
        const { webData } = this.props
        return (
            <Row gutter={16} style={{ margin: 20 }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="New Users"
                            value={webData.newUsers}
                            valueStyle={{ color: '#40C9C6' }}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="New Comments"
                            value={webData.newComments}
                            valueStyle={{ color: '#36A3F7' }}
                            prefix={<CommentOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="New Messages"
                            value={webData.newMessages}
                            valueStyle={{ color: '#40C9C6' }}
                            prefix={<MessageOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total Users"
                            value={webData.allUsers}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<FileSearchOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        )
    }
}
