import React, { Component, useState } from 'react';
import { Input, Form, Avatar, Button, Drawer, Row, Col, message, } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import ProTable, { TableDropdown } from '@ant-design/pro-table';


const UserAvatar = ({ value, onChange, }) => {

    // 创建state
    const [inputValue, setInputValue] = useState(value);

    return (
        <Input onChange={(e) => {
            setInputValue(e.target.value)
            onChange(e.target.value)
        }} value={inputValue} />
    )
};

export default class UserList extends Component {

    state = {
        editingKey: 0,
        setEditingKey: 0,
        data: 0,
        setData: 0,
        selectedRowKeys: [],
        visible: false,
    }

    // isEditing = (record) => record.key === this.state.editingKey;


    columns = [
        //#region 
        {
            title: '用户ID',
            dataIndex: 'userId',
            editable: false,
            width: 100,
            sorter: (a, b) => a.key - b.key,
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            editable: false,
            width: 100,
        },
        {
            title: '用户昵称',
            dataIndex: 'userNickname',
            width: 100,
        },
        {
            title: '用户密码',
            dataIndex: 'userPass',
            search: false,
            width: 100,
        },
        {
            title: '邮箱',
            dataIndex: 'userEmail',
            search: false,
            width: 200,
        },
        {
            title: '头像',
            dataIndex: 'userAvatar',
            search: false,
            renderFormItem: () => <UserAvatar></UserAvatar>,
            render: (record) => (
                <Avatar shape="square" src={record} />
            ),
        },
        {
            title: '注册时间',
            dataIndex: 'userRegisterTime',
            valueType: 'date',
            editable: false,
            sorter: true,
            width: 100,
        },
        {
            title: '简介',
            dataIndex: 'userBio',
            search: false,
            ellipsis: {
                showTitle: false,
            },
            width: 200,
        },
        {
            title: 'Github',
            dataIndex: 'userGithub',
            search: false,
            width: 100,
        },
        {
            title: '微博',
            dataIndex: 'userWeibo',
            search: false,
            width: 100,
        },
        {
            title: '位置',
            dataIndex: 'userLocation',
            search: false,
            width: 100,
        },
        //#endregion
        {
            title: '操作',
            dataIndex: 'operation',
            valueType: 'option',
            search: false,
            render: (text, record, _, action) => {
                // console.log('record', record, 'actoin', action);
                return [
                    <a href="#!" key="editable"
                        onClick={() => {
                            var _a;
                            (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.userId);
                        }}>
                        编辑
                    </a>,

                    <TableDropdown
                        key="actionGroup"
                        onSelect={() => action === null || action === void 0 ? void 0 : action.reload()}
                        menus={[
                            { key: 'copy', name: '复制' },
                            { key: 'delete', name: '删除' },
                        ]} />,
                ]
            }

        },
    ];


    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    onFinish = async (value) => {
        let user = {
            userAvatar: value.userAvatar,
            userBio: value.userBio,
            userEmail: value.userEmail,
            userGithub: value.userGithub,
            userLocation: value.userLocation,
            userNickname: value.userNickname,
            userPass: value.userPass,
            userWeibo: value.userWeibo,
            userName: value.userName,
        }
        try {
            let response = await fetch('http://localhost:8090/adduser', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                    'token': window.localStorage.getItem('token')
                },
                body: JSON.stringify(user),
            })
            let result = await response.json()
            if (result.state === 'ok') message.success('添加用户成功')
        } catch (error) {
            console.log(error)
        }
    }

    onSave = async (_, row) => {
        let user = {
            userAvatar: row.userAvatar,
            userBio: row.userBio,
            userEmail: row.userEmail,
            userGithub: row.userGithub,
            userId: row.userId,
            userLocation: row.userLocation,
            userName: row.userName,
            userNickname: row.userNickname,
            userPass: row.userPass,
            userRegisterTime: row.userRegisterTime,
            userWeibo: row.userWeibo,
        }

        try {
            let response = await fetch('http://localhost:8090/edituser', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                    'token': window.localStorage.getItem('token')
                },
                body: JSON.stringify(user),
            })
            let result = await response.json()
            if (result.state === 'ok') message.success("修改用户成功")

        } catch (error) {
            console.log(error);
        }
    }

    render() {

        return (
            <div>
                <ProTable
                    // components={components}
                    bordered
                    scroll={{ x: 1000, y: 600 }}
                    request={
                        async (
                            params = {
                                pageSize: 10,
                                current: 1,
                            },
                            sort, filter) => {
                            // console.log('sort', sort, 'filter', filter,params);

                            let userParam = {
                                ...params,
                                sort,
                                filter,
                            }

                            let response = await fetch('http://localhost:8090/getallusers', {
                                method: 'post',
                                credentials: 'include',
                                headers: {
                                    "Content-type": "application/json; charset=utf-8",
                                    'token': window.localStorage.getItem('token')
                                },
                                body: JSON.stringify(userParam),
                            })

                            let result = await response.json()

                            // console.log(result)

                            if (result.state === 'ok') {
                                return {
                                    data: result.rs,
                                    // success 请返回 true，
                                    // 不然 table 会停止解析数据，即使有数据
                                    success: true,
                                    // 不传会使用 data 的长度，如果是分页一定要传
                                    total: result.total,
                                };
                            }


                        }}
                    rowKey='userId'
                    rowClassName="editable-row"
                    columns={this.columns}
                    editable={{
                        type: 'multiple',
                        onSave: this.onSave,
                    }}
                    dateFormatter="string"
                    search={{
                        filterType: 'query',

                    }}
                    headerTitle="用户表格"
                    pagination={{ pageSize: 10, }}
                    toolBarRender={() => [
                        <Button style={{ marginLeft: 20 }} key="button" icon={<PlusOutlined />} type="primary" onClick={() => { this.setState({ visible: true }) }}>
                            新建
                        </Button>,
                    ]}
                />

                <Drawer
                    title="用户创建"
                    width={720}
                    onClose={() => { this.setState({ visible: false }) }}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" onFinish={this.onFinish}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="userName"
                                    label="用户名"
                                    rules={[{ required: true, message: '请输入用户名' }]}
                                >
                                    <Input placeholder="请输入用户名" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="userNickname"
                                    label="用户昵称"
                                    rules={[{ required: true, message: '请输入用户昵称' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="请输入用户昵称"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="userPass"
                                    label="用户密码"
                                    rules={[{ required: true, message: '请输入用户密码' }]}
                                >
                                    <Input
                                        placeholder="请输入用户密码"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="userEmail"
                                    label="用户邮箱"
                                >
                                    <Input
                                        placeholder="请输入用户邮箱"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="userAvatar"
                                    label="用户头像"
                                >
                                    <Input
                                        placeholder="请输入用户头像"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="userLocation"
                                    label="位置"
                                >
                                    <Input
                                        placeholder="请输入位置"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="userWeibo"
                                    label="微博"
                                >
                                    <Input
                                        placeholder="请输入微博"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="userGithub"
                                    label="Github"
                                >
                                    <Input
                                        placeholder="请输入Github"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="userBio"
                                    label="用户简介"
                                >
                                    <Input.TextArea row={4}
                                        placeholder="请输入用户简介"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div>
                                    <Button onClick={this.onCancle} style={{ marginRight: 8 }}>
                                        Cancel
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }

    componentDidMount() {
    }

}
