import React, { Component } from 'react';
import { message } from 'antd';

import './index.css';

export default class index extends Component {

    state = {
        adminName: '',
        adminPass: '',
        adminRepass: '',
        flag: true,
    }

    toLogin = async (e) => {
        e.preventDefault()
        let admin = {
            adminName: this.state.adminName,
            adminPass: this.state.adminPass,
        }
        try {
            let response = await fetch('http://localhost:8090/login', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(admin),
            })
            let result = await response.json()

            let token = response.headers.get('token')

            window.localStorage.setItem('token', token)

            if (result.state === 'ok') {
                this.props.history.push('/admin')
                message.success({
                    content: '登陆成功!',
                    style: {
                        marginTop: '20vh'
                    }
                })
            } else {
                message.success({
                    content: '登陆失败!',
                    style: {
                        marginTop: '20vh'
                    }
                })
            }
        } catch (error) { console.log(error); }

    }

    toRegister = async (e) => {
        e.preventDefault()
        let admin = {
            adminName: this.state.adminName,
            adminPass: this.state.adminPass,
            adminRepass: this.state.adminRepass,
        }

        if (admin.adminPass !== admin.adminRepass) {
            message.error({
                content: '密码不一致!',
                style: {
                    marginTop: '20vh'
                }
            })
            return
        }

        try {
            let response = await fetch('http://localhost:8090/register', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(admin),
            })
            let result = await response.json()
            if (result.state === 'ok') {
                message.success({
                    content: '注册成功!',
                    style: {
                        marginTop: '20vh'
                    }
                })
                this.setState({ flag: true })
            } else {
                console.log(result)
                message.error({
                    content: '注册失败!',
                    style: {
                        marginTop: '20vh'
                    }
                })
            }
        } catch (error) { console.log(error); }
    }

    render() {
        return (
            <div className='wrapper'>
                <div className="container">
                    <h1>Welcome</h1>

                    <form className="form" style={{ display: this.state.flag ? 'block' : 'none' }} onSubmit={this.toLogin}>
                        <input
                            type="text"
                            placeholder="用户名"
                            onChange={e => { this.setState({ adminName: e.target.value }) }}
                            value={this.state.adminName} />
                        <input type="password"
                            placeholder="用户密码"
                            onChange={e => { this.setState({ adminPass: e.target.value }) }}
                            value={this.state.adminPass} />
                        {/* <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ flag: false })}>创建账户</div> */}
                        <button type="submit" id="login-button">登录</button>
                    </form>

                    <form className="form" style={{ display: this.state.flag ? 'none' : 'block' }} onSubmit={this.toRegister}>
                        <input
                            type="text"
                            placeholder="用户名"
                            onChange={e => { this.setState({ adminName: e.target.value }) }}
                            value={this.state.adminName} />
                        <input type="password"
                            placeholder="用户密码"
                            onChange={e => { this.setState({ adminPass: e.target.value }) }}
                            value={this.state.adminPass} />
                        <input type="password"
                            placeholder="重新输入密码"
                            onChange={e => { this.setState({ adminRepass: e.target.value }) }}
                            value={this.state.adminRepass} />
                        <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ flag: true })}>返回登陆</div>
                        <button type="submit" id="login-button">注册</button>
                    </form>
                </div>

                <ul className="bg-bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        )
    }
}
