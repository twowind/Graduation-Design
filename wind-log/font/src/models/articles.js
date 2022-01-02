// 分别引入网络请求
import {
    editArticle,
    fetchArticleToCategory,
    fetchArticlesByUserId,
    fetchExploreArticles,
    fetchArticle
} from '@/services/articles'
// import { history } from 'umi'

export default {
    namespace: 'articles',

    state: {
        article: {},
        articles: [],
        categoryArticles: [],
    },

    effects: {
        *edit_Article({ payload }, { call, put }) {
            // 获取数据，利用网络请求
            let result = yield call(editArticle, payload)

            if (result.success === true) {
                // 调用reducers,并传递数据
                // TODO 结果跳转
                // history.push('/blog')
            } else {
                message.error({
                    content: result.errorMessage,
                })
            }
        },
        *getArticleToCategory({ payload }, { call, put }) {
            let result = yield call(fetchArticleToCategory, payload)
            if (result.success === true) {
                yield put({
                    type: "setCategoryArticles",
                    payload: result.data,
                })
                // 调用reducers,并传递数据
                // TODO 结果跳转
                // history.push('/blog')
            } else {
                message.error({
                    content: result.errorMessage,
                })
            }
        },

        *getArticlesByUserId({ payload }, { call, put }) {
            let result = yield call(fetchArticlesByUserId, payload)
            if (result.success === true) {
                yield put({
                    type: "setArticles",
                    payload: result.data,
                })
            } else {
                message.error({
                    content: result.errorMessage,
                })
            }
        },
        *getExploreArticle({ payload }, { call, put }) {
            let result = null;
            switch (payload) {
                case 'popular': result = yield call(fetchExploreArticles, payload); break
                case 'star': result = yield call(fetchExploreArticles, payload); break
                case 'comment': result = yield call(fetchExploreArticles, payload); break
                case 'read': result = yield call(fetchExploreArticles, payload); break
            }
            if (result.success === true) {
                yield put({
                    type: "setArticles",
                    payload: result.data,
                })
            } else {
                message.error({
                    content: result.errorMessage,
                })
            }
        },
        *getArticleById({ payload }, { call, put }) {
            let result = yield call(fetchArticle, payload)
            if (result.success === true) {
                yield put({
                    type: "setArticle",
                    payload: result.data,
                })
            } else {
                message.error({
                    content: result.errorMessage,
                })
            }
        }
    },

    reducers: {
        setArticle(state, action) {
            return { ...state, article: action.payload, }
        },
        setArticles(state, action) {
            return { ...state, articles: [...action.payload], }
        },
        setCategoryArticles(state, action) {
            return { ...state, categoryArticles: [...action.payload] }
        }
    },
}