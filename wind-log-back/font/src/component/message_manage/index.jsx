import React, { Component } from 'react'
import ProTable from '@ant-design/pro-table';
import { message } from 'antd';

export default class index extends Component {

    columns = [
        //#region 
        {
            title: '留言ID',
            dataIndex: 'messageId',
            editable: false,
            width: 100,
            sorter: true
        },
        {
            title: '留言者ID',
            dataIndex: 'messagerId',
            editable: false,
            sorter: true,
            width: 100,
        },
        {
            title: '被留言者ID',
            dataIndex: 'messagedId',
            editable: false,
            sorter: true,
            width: 100,
        },
        {
            title: '留言',
            dataIndex: 'messageContent',
            editable: false,
            ellipsis: {
                showTitle: false,
            },
            width: 200,
        },
        {
            title: '留言时间',
            dataIndex: 'messageTime',
            editable: false,
            sorter: true,
            valueType: 'date',
            width: 100,
        },
        //#endregion
        {
            title: '操作',
            dataIndex: 'operation',
            valueType: 'option',
            width: 150,
            search: false,
            render: (text, record, _, action) => {
                // console.log('record', record, 'actoin', action);
                return [
                    <a href="#!" key="editable"
                        onClick={() => {
                            var _a;
                            (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.messageId);
                        }}>
                        编辑
                    </a>,
                ]
            }

        },
    ];

    onDelete = async (key) => {
        try {
            let response = await fetch(`http://localhost:8090/delete_message/${key}`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                    'token': window.localStorage.getItem('token')
                },
            })
            let result = await response.json()
            if (result.success === false) console.log('delete fault');
            else message.success("删除留言成功")
        } catch (error) {
            console.log(error)

        }
    }
    
    render() {
        return (
            <div style={{ margin: 20 }}>
                <h1>
                    <b>留言列表</b>
                </h1>
                <hr></hr>

                <ProTable
                    bordered
                    scroll={{ x: 1000, y: 600 }}
                    request={
                        async (
                            params = {
                                pageSize: 10,
                                current: 1,
                            },
                            sort, filter) => {
                            let messageParam = {
                                ...params,
                                sort,
                                filter,
                            }
                            let response = await fetch('http://localhost:8090/message', {
                                method: 'post',
                                headers: {
                                    "Content-type": "application/json; charset=utf-8",
                                    'token': window.localStorage.getItem('token')
                                },
                                body: JSON.stringify(messageParam),
                            })
                            let result = await response.json()
                            return result;
                        }}
                    rowKey='messageId'
                    rowClassName="editable-row"
                    columns={this.columns}
                    editable={{
                        type: 'multiple',
                        onDelete: this.onDelete,
                    }}
                    dateFormatter="string"
                    search={{
                        filterType: 'query',
                    }}
                    headerTitle="留言表格"
                    pagination={{ pageSize: 10, }}
                />
            </div>
        )
    }
}
