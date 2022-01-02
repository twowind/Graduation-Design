import React, { Component } from 'react';
import { Layout, Input, Button, message, Modal } from 'antd';
import { connect } from "umi";

const { Header, Content } = Layout;
class index extends Component {
    state = {
        isModalVisible: false,
        userOldPass: '',
    };

    submit = async () => {
        let { user_pass, user_email } = this

        let usernew = {
            userId: JSON.parse(window.localStorage.getItem('user')).userId,
            userNewPass: user_pass.state.value,
            userEmail: user_email.state.value,
            userOldPass: this.state.userOldPass
        }
        if (usernew.userOldPass === undefined) {
            message.error({
                content: '必须输入旧密码',
                style: {
                    marginTop: '20vh'
                }
            })
            return
        } else if (usernew.userNewPass !== undefined && usernew.userNewPass.length < 6) {
            message.error({
                content: '新密码至少含有6个字符',
                style: {
                    marginTop: '20vh'
                }
            })
            return
        }
        this.props.dispatch({
            type:'user/modAccount',
            payload:usernew
        })
        this.setState({ isModalVisible: false, userOldPass: '' })
    }

    render() {
        let { userEmail } = this.props.user.user
        return (
            <div>
                <Header style={{ backgroundColor: 'white', paddingLeft: 300 }}>
                    <b style={{ fontSize: 25 }}>Account Setting</b>
                </Header>
                <hr style={{ marginLeft: 300, marginRight: 300 }}></hr>
                <Content style={{ marginLeft: 300, marginRight: 300, backgroundColor: 'white', textAlign: 'center' }}>

                    {/* passworld */}
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 450 }}>密码修改</div>
                        <div >
                            <Input.Password ref={node => this.user_pass = node} style={{ width: 250 }} placeholder="新密码" />
                        </div>
                    </div>

                    {/* email */}
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 450 }}>邮箱修改</div>
                        <div >
                            <Input ref={node => this.user_email = node} style={{ width: 250 }} defaultValue={userEmail} />
                        </div>
                    </div>

                    {/* 提交修改 */}
                    <Button style={{ marginTop: 20 }} shape='round' onClick={() => this.setState({ isModalVisible: true })}>Submit</Button>

                    <Modal
                        mask={false}
                        title="密码确认"
                        style={{ marginTop: 150 }}
                        visible={this.state.isModalVisible}
                        onOk={this.submit}
                        onCancel={() => { this.setState({ isModalVisible: false }) }}>
                        <Input.Password value={this.state.userOldPass} onChange={e => this.setState({ userOldPass: e.target.value })} placeholder="密码" />
                    </Modal>

                </Content>
            </div >
        )
    }
}

export default connect(({ user }) => ({ user }))(index)