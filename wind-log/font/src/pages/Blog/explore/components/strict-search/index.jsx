import React, { Component } from 'react'
import { fetchSearchExploreArticles } from "@/services/articles";
import { Form, Input, DatePicker, Button, Select } from 'antd';
import { connect } from "umi";
import { fetchAllTag } from '@/services/tags'


const { RangePicker } = DatePicker;
class index extends Component {

    state = {
        tags: [],
        options: []
    }

    finsh = async (values) => {
        let search = {
            author: values.author,
            tags: values.tag,
            title: values.title,
            startTime: values.time === undefined ? null : values.time[0]._d,
            endTime: values.time === undefined ? null : values.time[1]._d,
            content: this.props.search.search,
        }
        let result = await fetchSearchExploreArticles(search)
        if (result.success === true) {
            this.props.dispatch({
                type: 'articles/setArticles',
                payload: result.data,
            })
        }
    }

    getTags = async () => {
        let result = await fetchAllTag()
        this.setState({ options: result.data });
    }

    componentDidMount() {
        this.getTags()
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <Form onFinish={this.finsh}>
                    <Form.Item name='time'>
                        <RangePicker />
                    </Form.Item>
                    <Form.Item label="标题" name='title'>
                        <Input placeholder='请输入标题' />
                    </Form.Item>
                    <Form.Item label="标签" name='tag'>
                        <Select
                            mode="multiple"
                            optionLabelProp="label"
                            value={this.state.tags}
                            onChange={(e) => { this.setState({ tags: e }) }}
                            placeholder="请输入标签">
                            {this.state.options.map(item => {
                                return <Option value={item.tagName} label={item.tagName} key={item.tagId}>
                                    <div className="demo-option-label-item">
                                        {item.tagName}
                                    </div>
                                </Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="作者" name='author'>
                        <Input placeholder='请输入作者' />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>

        )
    }
}

export default connect(({ search }) => ({ search }))(index)