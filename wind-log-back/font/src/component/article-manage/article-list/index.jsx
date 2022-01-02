import React, { Component, useState, useEffect } from 'react';
import EditableProTable, { TableDropdown } from '@ant-design/pro-table';
import { Tag, Select, message } from 'antd'

const { Option } = Select;

const TagList = ({ value, onChange, }) => {

    // 创建state
    const [tag, setTag] = useState([]);
    const [option, setOption] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await fetch('http://localhost:8090/getalltags')
                let result = await response.json()
                if (result.state === 'ok') {
                    setOption(result.rs)
                }
            } catch (error) { console.log(error); }

            let newTag = tag
            if (value !== undefined) {
                for (let i = 0; i < value.length; i++) {
                    newTag = [...newTag, value[i].tagName]
                }
                setTag(newTag)
            }
        }
        fetchData()

        return () => { }
    }, [])

    return (
        <Select
            mode="multiple"
            optionLabelProp="label"
            style={{ minWidth: 200 }}
            value={tag}
            onChange={(e) => {
                setTag(e)
                let formatTag = []
                for (let i = 0; i < e.length; i++) {
                    formatTag = [...formatTag, { tagId: null, tagName: e[i] }]
                }
                onChange(formatTag)
            }}
            placeholder="请输入标签">
            {option.map(item => {
                return <Option value={item.tagName} label={item.tagName} key={item.tagId}>
                    <div className="demo-option-label-item">
                        {item.tagName}
                    </div>
                </Option>
            })}
        </Select>
    )
};


export default class index extends Component {

    columns = [
        //#region 
        {
            title: '博客ID',
            dataIndex: 'articleId',
            editable: false,
            width: 100,
            sorter: true,
        },
        {
            title: '用户ID',
            dataIndex: 'articleUserId',
            editable: false,
            sorter:true,
            width: 100,
        },
        {
            title: '博客名称',
            dataIndex: 'articleTitle',
            ellipsis: {
                showTitle: false,
            },
            width: 200,
        },
        {
            title: '博客内容',
            dataIndex: 'articleContent',
            search: false,
            ellipsis: {
                showTitle: false,
            },
            width: 200,
        },
        {
            title: '创建时间',
            dataIndex: 'articleCreateTime',
            valueType: 'date',
            editable: false,
            sorter: true,
            width: 100,
        },
        {
            title: '修改时间',
            dataIndex: 'articleUpdateTime',
            valueType: 'date',
            editable: false,
            sorter: true,
            width: 100,
        },
        {
            title: '博客简要',
            dataIndex: 'articleSummary',
            ellipsis: {
                showTitle: false,
            },
            width: 200,
        },
        {
            title: '博客分类',
            dataIndex: 'articleCategory',
            search:false,
            width: 150,
        },
        {
            title: '阅读量',
            dataIndex: 'articleReadCount',
            search: false,
            editable: false,
            sorter:true,
            width: 100,
        },
        //#endregion

        {
            title: '博客标签',
            dataIndex: 'articleTags',
            ellipsis: true,
            width: 200,
            renderFormItem: () => <TagList key='tagList' />,
            render: (_, record) => record.articleTags.map((item, index) => {
                return <Tag key={item.tagId + index}>{item.tagName}</Tag>
            })
        },
        {
            title: '操作',
            dataIndex: 'operation',
            valueType: 'option',
            search: false,
            render: (text, record, _, action) => {
                console.log(record);
                return [
                    <a href="#!" key="editable"
                        onClick={() => {
                            var _a;
                            (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.articleId);
                        }}>
                        编辑
                    </a>,

                    <a href={`http://localhost:3000/blog/content/${record.articleId}`} key="showable" target='_blank' rel="noopener noreferrer">
                        查看
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

    onSave = async (_, row) => {
        let article = {
            articleCategory: row.articleCategory,
            articleContent: row.articleContent,
            articleId: row.articleId,
            articleSummary: row.articleSummary,
            articleTags: row.articleTags,
            articleTitle: row.articleTitle,
        }
        try {
            let response = await fetch('http://localhost:8090/editarticle', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                    'token':window.localStorage.getItem('token')
                },
                body: JSON.stringify(article),
            })
            let result = await response.json()
            if (result.state === 'fault') console.log(result)
            else message.success('编辑博客成功')

        } catch (error) {
            console.log(error);
        }
    }

    onDelete = async (key) => {
        try {
            let response = await fetch(`http://localhost:8090/deletearticle/${key}`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                    'token':window.localStorage.getItem('token')
                },
            })
            let result = await response.json()
            if (result === 'fault') console.log('delete fault');
        } catch (error) {
            console.log(error)

        }
    }

    render() {

        return (
            <div>
                <EditableProTable
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
                            let response = await fetch('http://localhost:8090/getallarticles', {
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
                    rowKey='articleId'
                    rowClassName="editable-row"
                    columns={this.columns}
                    editable={{
                        type: 'multiple',
                        onSave: this.onSave,
                        onDelete: this.onDelete,
                    }}
                    dateFormatter="string"
                    search={{
                        filterType: 'query',

                    }}
                    headerTitle="用户表格"
                    pagination={{ pageSize: 10, }}
                />
            </div>
        );
    }

    componentDidMount() {
    }

}
