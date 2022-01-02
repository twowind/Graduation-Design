// 分别引入网络请求
// import { getUserTags } from '@/services/tags'
import { message } from 'antd'

export default {
    namespace: 'search',

    state: {
        search: '',
        searchHistory: []
    },

    effects: {

    },

    reducers: {
        setSearch(state, action) {
            return { ...state, search: action.payload }
        },
        setHistory(state, action) {
            return { ...state, searchHistory: action.payload }
        }
    },
}