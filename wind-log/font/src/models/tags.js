// 分别引入网络请求
import { getUserTags } from '@/services/tags'
import { message } from 'antd'

export default {
    namespace: 'tags',

    state: {
        tags: {}
    },

    effects: {
        *fetchUserTags({ payload }, { call, put }) {
            // 获取数据，利用网络请求
            let result = yield call(getUserTags, payload)
            if (result.success === true) {
                return result.data
            } else {
                message.error({
                    content: result.errorMessage,
                })
                return []
            }
        }
    },

    reducers: {

    },
}