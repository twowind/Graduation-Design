import React, { Component } from 'react';
import { Layout, Input, Select, message, Space, Button, Result, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import hljs from 'highlight.js'
import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import tasklists from 'markdown-it-task-lists'
// 导入编辑器的样式
import 'highlight.js/styles/atom-one-light.css'
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from 'umi'

import { fetchAllTag } from '@/services/tags'
import { editArticle } from '@/services/articles'

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;
class index extends Component {

    state = {
        title: '',
        category: '',
        tags: [],
        summary: '',
        options: [],
        content: '',
        defaulttags: [],
        articleId: 0,
        isOver: false,
    }

    onFinish = async () => {

        // 通过token得到username
        let token = JSON.parse(window.atob(window.localStorage.getItem('token').split('.')[1]))
        const article = {
            articleUserId: token.userId,
            articleTitle: this.state.title,
            articleSummary: this.state.summary,
            articleTags: this.state.tags,
            articleCategory: this.state.category,
            articleContent: this.state.content,
            articleId: this.state.articleId,
        }

        if (article.articleTitle === '' || article.articleCategory === '' || article.articleSummary === '' || article.articleContent === '') {
            message.error({
                content: '部分位置不能为空！',
                style: {
                    marginTop: '20vh'
                }
            })
            return
        }

        let result = await editArticle(article)

        if (result.success === true) {
            message.success({
                content: '博客发布成功！',
            })
            this.setState({ title: '', tags: [], summary: '', content: '', category: '', isOver: true })
        } else {
            message.error({
                content: '博客发布失败！',
            })
        }
    }

    async componentDidMount() {
        let result = await fetchAllTag()
        this.setState({ options: result.data });
        if (this.props.location.state !== undefined) {
            let { articleContent, articleTitle, articleSummary, articleCategory, articleTags, articleId } = this.props.location.state
            let tags = []
            for (let i = 0; i < articleTags.length; i++) {
                tags.push(articleTags[i].tagName)
            }
            this.setState({ content: articleContent, title: articleTitle, summary: articleSummary, category: articleCategory, tags, articleId })
        }

    }

    handleEditorChange = ({ _, text }) => {
        this.setState({ content: text })
    }

    uploadImg = async (file) => {
        let fd = new FormData()
        fd.append('file', file)

        let response = await fetch(`http://localhost:8080/uploadimg`, {
            method: 'post',
            headers: {
                'token': window.localStorage.getItem('token'),
            },
            body: fd,
        })

        let result = await response.json()
        return result.rs
    }

    render() {

        // 初始化Markdown解析器
        const mdParser = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true,
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str).value
                    } catch (__) { }
                }
                return '' // use external default escaping
            }
        })
            .use(emoji)
            .use(subscript)
            .use(superscript)
            .use(footnote)
            .use(deflist)
            .use(abbreviation)
            .use(insert)
            .use(mark)
            .use(tasklists, { enabled: this.taskLists })

        let children = [];

        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }


        return (

            <Content>
                <div style={{ display: this.state.isOver ? 'none' : 'block' }}>
                    <Space style={{ margin: '10px 20px' }}>
                        <Input
                            placeholder="请输入标题"
                            prefix={<div style={{ backgroundColor: 'tomato' }}>标题：</div>}
                            value={this.state.title}
                            onChange={(e) => this.setState({ title: e.target.value })}
                        />
                        <Input
                            placeholder="请输入分类"
                            prefix={<div style={{ backgroundColor: 'tomato' }}>分类：</div>}
                            value={this.state.category}
                            onChange={(e) => this.setState({ category: e.target.value })}
                        />
                        <Select
                            mode="multiple"
                            optionLabelProp="label"
                            style={{ minWidth: 200 }}
                            defaultValue={this.state.defaulttags}
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
                            {/* {children} */}
                        </Select>

                        <Button style={{ marginLeft: '100vh' }} type='primary' onClick={this.onFinish}>提交</Button>


                    </Space>
                    <div style={{ margin: '10px 20px' }}>
                        <TextArea
                            value={this.state.summary}
                            onChange={e => this.setState({ summary: e.target.value })}
                            showCount
                            maxLength={300}
                            rows={4}
                            placeholder="请输入简要" />
                        <div style={{ marginTop: 10 }}>
                            <Upload beforeUpload={async (e) => {
                                let str = await e.text()
                                this.setState({ content: str })
                                return false

                            }} maxCount={1}>
                                <Button icon={<UploadOutlined />}>上传markdown文件</Button>
                            </Upload>
                        </div>

                    </div>



                    <MdEditor
                        onImageUpload={this.uploadImg}
                        ref={node => this.mdEditor = node}
                        style={{ height: "65vh", width: '100%' }}
                        renderHTML={(text) => mdParser.render(text)}
                        value={this.state.content}
                        onChange={this.handleEditorChange}
                    />
                </div>

                <div style={{ display: this.state.isOver ? 'block' : 'none' }}>
                    <Result
                        status="success"
                        title="博客发布成功！"
                        subTitle="我们期待您发布更多的博客！"
                        extra={[
                            <Button type="primary" key="console" onClick={() => { this.setState({ isOver: false }) }}>
                                再次发布
                            </Button>,
                            <Button key="buy" onClick={() => { this.props.history.push("/blog/explore") }}>返回首页</Button>,
                        ]}
                    />
                </div>
            </Content>
        )
    }
}

export default connect(({ user }) => ({ user }))(index)
