import React, { Component } from 'react';
import { Layout, Menu, Tag } from 'antd';
import { connect } from 'umi'
import {
    StarOutlined,
    FireOutlined,
    CommentOutlined,
    ReadOutlined,
} from '@ant-design/icons';
import { fetchExploreTag } from '@/services/tags'
import { fetchExploreArticlesByTags } from '@/services/articles'

const { Sider } = Layout;
const { CheckableTag } = Tag;
class index extends Component {

    state = {
        tags: [],
        inputVisible: false,
        categories: [],
        tagChecked: new Map(),
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };


    componentDidMount() {
        this.getPopularTags()
    }

    // 获取热门tag
    getPopularTags = async () => {
        let result = await fetchExploreTag()
        if (result.success === true) {
            let map = new Map()
            for (let i = 0; i < result.data.length; i++) {
                map.set(result.data[i].tagId, false)
            }
            this.setState({ tags: result.data, tagChecked: map });
        }
    }

    getAricleByTag = async (tagId, checked) => {
        let map = this.state.tagChecked
        map.set(tagId, checked)
        await this.setState({ tagChecked: map })

        let tags = [];

        map.forEach(function (value, key) {
            if (value === true)
                tags.push(key)
        })

        let result = await fetchExploreArticlesByTags(tags)
        if (result.success === true) {
            this.props.dispatch({
                type: 'articles/setArticles',
                payload: result.data,
            })
        }
    }

    render() {
        return (
            <Sider
                width={250}
                style={{ height: '93vh', backgroundColor: '#F0F0F2', boxShadow: '0px 0px 5px black', zIndex: '1' }}>

                <Menu style={{ backgroundColor: '#F0F0F2', marginTop: 30 }}>
                    <Menu.Item style={{ fontWeight: 'bolder' }}
                        key="1"
                        icon={<FireOutlined style={{ fontSize: 15 }} />}
                        onClick={() => {
                            this.props.dispatch({
                                type: 'articles/getExploreArticle',
                                payload: 'popular',
                            })
                        }}>
                        热门博客
                    </Menu.Item>
                    <Menu.Item
                        style={{ fontWeight: 'bolder' }}
                        key="2"
                        icon={<StarOutlined style={{ fontSize: 15 }} />}
                        onClick={() => {
                            this.props.dispatch({
                                type: 'articles/getExploreArticle',
                                payload: 'star',
                            })
                        }}>
                        最多收藏
                    </Menu.Item>
                    <Menu.Item
                        style={{ fontWeight: 'bolder' }} key="3"
                        icon={<CommentOutlined
                            style={{ fontSize: 15 }} />}
                        onClick={() => {
                            this.props.dispatch({
                                type: 'articles/getExploreArticle',
                                payload: 'comment',
                            })
                        }}>
                        最多评论
                    </Menu.Item>
                    <Menu.Item
                        style={{ fontWeight: 'bolder' }}
                        key="4" icon={<ReadOutlined
                            style={{ fontSize: 15 }} />}
                        onClick={() => {
                            this.props.dispatch({
                                type: 'articles/getExploreArticle',
                                payload: 'read',
                            })
                        }}>
                        最多阅读
                    </Menu.Item>
                </Menu>

                <div style={{ marginLeft: 20 }}>
                    <hr style={{ marginTop: 10, marginBottom: 10 }}></hr>

                    {/* Popular Tags */}
                    <div style={{ marginBottom: 10 }}>
                        <div>
                            <StarOutlined style={{ fontSize: 15 }} />
                            <p style={{ fontWeight: 'bolder', marginLeft: 15, display: 'inline' }}>热门标签</p>
                        </div>
                        <div>
                            {
                                this.state.tags.map(
                                    (tag) => <CheckableTag
                                        key={tag.tagId}
                                        checked={this.state.tagChecked.get(tag.tagId)}
                                        style={{ marginTop: 10 }}
                                        onChange={checked => this.getAricleByTag(tag.tagId, checked)}
                                    >{tag.tagName}</CheckableTag>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Sider >

        )
    }
}

export default connect(({ articles }) => ({ articles }))(index)