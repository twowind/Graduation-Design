import React, { Component } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { message } from 'antd';


export default class index extends Component {

    columns = [
        //#region 
        {
            title: '评论ID',
            dataIndex: 'commentId',
            editable: false,
            search: false,
            width: 100,
            sorter: true,
        },
        {
            title: '评论父ID',
            dataIndex: 'commentPid',
            editable: false,
            search: false,
            sorter: true,
            width: 100,
        },
        {
            title: '博客ID',
            dataIndex: 'articleId',
            editable: false,
            sorter: true,
            width: 100,
        },
        {
            title: '评论',
            dataIndex: 'articleComment',
            editable: false,
            ellipsis: {
                showTitle: false,
            },
            width: 200,
        },
        {
            title: '评论者ID',
            dataIndex: 'commentUserId',
            editable: false,
            sorter: true,
            width: 100,
        },
        {
            title: '评论时间',
            dataIndex: 'commentTime',
            valueType: 'date',
            editable: false,
            sorter: true,
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
                            (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.commentId);
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

    onDelete = async (key) => {
        try {
            let response = await fetch(`http://localhost:8090/deletecomment/${key}`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                    'token':window.localStorage.getItem('token')
                },
            })
            let result = await response.json()
            if (result === 'fault') console.log('delete fault');
            else message.success("删除用户成功")
        } catch (error) {
            console.log(error)

        }
    }

    render() {

        return (
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
                            // console.log('sort', sort, 'filter', filter,params);
                            let articleParam = {
                                ...params,
                                sort,
                                filter,
                            }
                            let response = await fetch('http://localhost:8090/getallcomment', {
                                method: 'post',
                                headers: {
                                    "Content-type": "application/json; charset=utf-8",
                                    'token':window.localStorage.getItem('token')
                                },
                                body: JSON.stringify(articleParam),
                            })

                            let result = await response.json()
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
                    rowKey='commentId'
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
                    headerTitle="用户表格"
                    pagination={{ pageSize: 10, }}
                />
        );
    }


}
