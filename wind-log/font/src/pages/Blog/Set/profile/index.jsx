import React, { Component } from 'react';
import { Layout, Avatar, Popover, Button, Input, Upload, message } from 'antd';
import { UserOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { connect } from "umi";

const { Header, Content } = Layout;
const { TextArea } = Input;

class index extends Component {
    state = {
        visible: false,
        loading: false,
        imgUrl: '',
        avatar: '',
    };

    handleVisibleChange = visible => {
        this.setState({ visible });
    };

    componentDidMount() {
        let img = JSON.parse(window.localStorage.getItem('user')).userAvatar
        this.setState({ avatar: img, imgUrl: img })
    }

    submit = async () => {
        let { username, bio, github, weibo, location } = this

        let userNew = {
            userId: JSON.parse(window.localStorage.getItem('user')).userId,
            userAvatar: this.state.imgUrl,
            userNickname: username.state.value,
            userBio: bio.resizableTextArea.props.value,
            userGithub: github.state.value,
            userWeibo: weibo.state.value,
            userLocation: location.state.value,
        }

        this.props.dispatch({
            type: 'user/modProfile',
            payload: userNew
        })
    }

    uploadChange = ({ fileList }) => {
        if (fileList[0].status === 'done') {
            this.setState({ imgUrl: fileList[0].response.rs })
        }
    };

    render() {

        const user = this.props.user.user
        return (
            <div>
                <Header style={{ backgroundColor: 'white', paddingLeft: 300 }}>
                    <b style={{ fontSize: 25 }}>信息设置</b>
                </Header>
                <hr style={{ marginLeft: 300, marginRight: 300 }}></hr>
                <Content style={{ marginLeft: 300, marginRight: 300, backgroundColor: 'white', textAlign: 'center' }}>
                    {/* avatar */}
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 450 }}>用户头像</div>
                        <div >
                            <div >
                                <Avatar ref={node => this.avatar_url = node} size={200} src={user.userAvatar} />
                            </div>
                            <Popover
                                placement="rightBottom"
                                content={(
                                    <div>
                                        <Upload action="http://localhost:8080/uploadimg" listType="picture" maxCount={1} onChange={this.uploadChange}>
                                            <Button icon={<UploadOutlined />}>头像上传</Button>
                                        </Upload>
                                    </div>
                                )}
                                trigger="click"
                                visible={this.state.visible}
                                onVisibleChange={this.handleVisibleChange}
                            >
                                <Button icon={<EditOutlined />} style={{ position: 'relative', left: 40, bottom: 20, height: 30 }} >编辑</Button>
                            </Popover>
                        </div>

                    </div>
                    {/* username */}
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 450 }}>用户昵称</div>
                        <Input
                            ref={node => this.username = node}
                            defaultValue={user.userNickname}
                            style={{ width: 250 }}
                            placeholder="请输入昵称"
                            prefix={<UserOutlined />}
                            onChange={(e) => { console.log(e) }}
                        />
                    </div>
                    {/* Bio */}
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 450 }}>用户简介</div>
                        <div >
                            <TextArea defaultValue={user.userBio} ref={node => this.bio = node} style={{ width: 250 }} rows={3} />
                        </div>
                    </div>
                    {/* github */}
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 450 }}>Github</div>
                        <div >
                            <Input ref={node => this.github = node} style={{ width: 250 }} addonBefore="https://github.com/" defaultValue={user.userGithub} />
                        </div>
                    </div>
                    {/* weibo username */}
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 450 }}>微博</div>
                        <div >
                            <Input ref={node => this.weibo = node} style={{ width: 250 }} defaultValue={user.userWeibo} />
                        </div>
                    </div>
                    {/* location */}
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 450 }}>位置</div>
                        <div >
                            <Input ref={node => this.location = node} style={{ width: 250 }} defaultValue={user.userLocation} />
                        </div>
                    </div>

                    {/* 提交修改 */}
                    <Button style={{ marginTop: 20 }} shape='round' onClick={this.submit}>修改</Button>
                </Content>
            </div >
        )
    }
}

export default connect(({ user }) => ({ user }))(index)