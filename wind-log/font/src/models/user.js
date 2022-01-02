// 分别引入网络请求
import { login, fetchModAccount, fetchModProfille, tokenLogin, fetchUser } from '@/services/users'
import { history } from 'umi';
import { message } from 'antd'

export default {
    namespace: 'user',

    state: {
        user: {}
    },

    effects: {
        *login({ payload }, { call, put }) {
            // 获取数据，利用网络请求
            let result = yield call(login, payload)
            if (result.success === true) {
                yield window.localStorage.setItem('token', result.token)
                yield put({
                    type: "setUser",
                    payload: result.data,
                })
                // 调用reducers,并传递数据
                window.localStorage.setItem('user', JSON.stringify(result.data))
                history.push('/blog/profile')
            } else {
                message.error({
                    content: result.errorMessage,
                })
            }
        },
        *tokenLogin(_, { call, put }) {
            let result = yield call(tokenLogin);
            if (result.success === true) {
                window.localStorage.setItem('token', result.token);
                yield put({
                    type: "setUser",
                    payload: result.data
                });
                window.localStorage.setItem('user', JSON.stringify(result.data));
            }
        },
        *modAccount({ payload }, { call, put }) {
            let result = yield call(fetchModAccount, payload)
            if (result.success === true) {
                window.localStorage.setItem('user', JSON.stringify(result.data))
                yield put({
                    type: "setUser",
                    payload: result.data
                })
                message.success("修改账户成功！")
            } else {
                message.error({
                    content: result.errorMessage,
                })
            }
        },
        *modProfile({ payload }, { call, put }) {
            let result = yield call(fetchModProfille, payload)
            if (result.success === true) {
                window.localStorage.setItem('user', JSON.stringify(result.data))
                yield put({
                    type: "setUser",
                    payload: result.data
                })
                message.success("修改信息成功！")
            } else {
                message.error({
                    content: result.errorMessage,
                })
            }
        },
        *fetchUserByUsername({ payload }, { call, put }) {
            let result = yield call(fetchUser, payload);
            if (result.success === true) {
                yield put({
                    type: "setUser",
                    payload: result.data
                });

                window.localStorage.setItem('user', JSON.stringify(result.data));
            }
        }
    },

    reducers: {
        setUser(state, action) {
            return { ...state, user: { ...action.payload } }
        },
        deleteUser(state) {
            return { ...state, user: {} }
        }
    },
}