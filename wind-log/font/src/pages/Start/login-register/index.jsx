import React, { Component } from 'react';
import { FacebookOutlined, WechatOutlined, QqOutlined, UploadOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Modal, Form, Input, Avatar, Popover, Upload } from 'antd';
import { connect } from 'umi'
import { register } from '@/services/users'

import './index.css';

class index extends Component {

    state = {
        drawerVisable: false,
        imgUrl: '',
        username: '',
        userPass: '',
        userEmail: '',
        userAvatrar: '',
    }

    containerRef = React.createRef();

    imgRef = React.createRef();

    // 完成效果
    removeClass = () => {
        this.containerRef.current.classList.remove("right-panel-active");
    }
    addClass = () => {
        this.containerRef.current.classList.add("right-panel-active");
    }

    // 登录
    login = (event) => {

        event.preventDefault();
        const { username, userpass } = this
        const user = {
            userName: username.value,
            userPass: userpass.value,
        }
        this.props.dispatch({
            type: 'user/login',
            payload: user,
        })
    }

    //注册
    register = async (e) => {

        const { register_username, register_userpass, } = this

        console.log(this.state.imgUrl);

        const user = {
            userNickname: e.userNickname,
            userName: register_username.value,
            userPass: register_userpass.value,
            userAvatar: this.state.imgUrl === '' ? 'https://avatars.githubusercontent.com/u/35649857?v=4' : this.state.imgUrl,
            userEmail: e.userEmail
        }
        if(user.userNickname===undefined){
            message.error('必须填写昵称')
            return
        }

        let result = await register(user)

        if (result.success !== true) {
            message.error({
                content: result.errorMessage,
            })
        } else {
            message.success({
                content: '注册成功请登录！',
            })
            this.setState({ drawerVisable: false })
        }
    }

    // 头像上传
    uploadChange = ({ fileList }) => {
        if (fileList[0].status === 'done') {
            this.setState({ imgUrl: fileList[0].response.rs })
        }
    };

    render() {
        return (
            <div className="login-register-component">
                <div ref={this.containerRef} className="container">
                    <div className="form-container sign-up-container">
                        <form className='formCSS' onSubmit={(e) => { e.preventDefault() }}>
                            <h1 >创建账户</h1>
                            <div className="social-container"  >
                                <Button style={{ marginLeft: 10 }} shape='circle' size='large' icon={<WechatOutlined />} />
                                <Button style={{ marginLeft: 10 }} shape='circle' size='large' icon={<QqOutlined />} />
                                <Button style={{ marginLeft: 10 }} shape='circle' size='large' icon={<FacebookOutlined />} />
                            </div>
                            <input ref={c => this.register_username = c} type="username" placeholder="用户名" />
                            <input ref={c => this.register_userpass = c} type="password" placeholder="密码" />
                            <input ref={c => this.register_userRepass = c} type="password" placeholder="重新输入密码" />
                            <button className='buttonCSS' style={{ marginTop: 10 }} onClick={() => {
                                const { register_userpass, register_userRepass } = this
                                if (register_userpass.value !== register_userRepass.value) {
                                    message.error('两次密码不一致')
                                    return
                                }
                                this.setState({ drawerVisable: true })
                            }}>注册</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form className='formCSS' onSubmit={this.login} >
                            <h1>登录</h1>
                            <div className="social-container">
                                <Button style={{ marginLeft: 10 }} shape='circle' size='large' icon={<WechatOutlined />} />
                                <Button style={{ marginLeft: 10 }} shape='circle' size='large' icon={<QqOutlined />} />
                                <Button style={{ marginLeft: 10 }} shape='circle' size='large' icon={<FacebookOutlined />} />
                            </div>
                            <span>使用账户</span>
                            <input ref={c => this.username = c} type="username" placeholder="用户名" />
                            <input ref={c => this.userpass = c} type="password" placeholder="密码" />
                            <button className='buttonCSS' style={{ marginTop: 10 }} type="submit" >登录</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>欢迎回来！</h1>
                                <p>使用你注册的信息登陆吧！</p>
                                <button className='buttonCSS' style={{ backgroundColor: 'transparent', borderColor: 'white' }} id="signIn" onClick={this.removeClass}>登录</button>

                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>欢迎注册!</h1>
                                <p>若没有账户请注册</p>
                                <button className='buttonCSS' style={{ backgroundColor: 'transparent', borderColor: 'white' }} id="signUp" onClick={this.addClass}>注册</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    title="完善信息"
                    mask={false}
                    onCancel={() => { this.setState({ drawerVisable: false }) }}
                    visible={this.state.drawerVisable}
                    footer={null}
                >
                    <Form onFinish={this.register}>
                        <Form.Item label="用户昵称" name='userNickname'>
                            <Input />
                        </Form.Item>
                        <Form.Item label="用户邮箱" name='userEmail'>
                            <Input />
                        </Form.Item>
                        <Form.Item name='userAvatrar'>
                            <div >
                                <div >
                                    <Avatar ref={node => this.avatar_url = node} size={200} src='https://avatars.githubusercontent.com/u/35649857?v=4' />
                                </div>
                                <Popover
                                    placement="rightBottom"
                                    content={(
                                        <div>
                                            <Upload action="http://localhost:8080/uploadimg" listType="picture" maxCount={1} onChange={this.uploadChange}>
                                                <Button icon={<UploadOutlined />}>Upload</Button>
                                            </Upload>
                                        </div>
                                    )}
                                    trigger="click"
                                >
                                    <Button icon={<EditOutlined />} style={{ position: 'relative', left: 40, bottom: 20, height: 30 }} >Edit</Button>
                                </Popover>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div >
        )
    }
}

export default connect(({ user }) => ({ user }))(index)