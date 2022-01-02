// umi自带的网络请求
import request from 'umi-request';
import { message } from 'antd'

// 用来封装网络请求

const headers = {
    'token': window.localStorage.getItem('token')
}

request.interceptors.request.use((url, options) => {
    return {
        url: `${url}`,
        options: {
            ...options, interceptors: true, headers,
        },
    }
});

request.interceptors.response.use(response => {
    if (response.status > 400) {
        const codeMaps = {
            502: '网关错误。',
            503: '服务不可用，服务器暂时过载或维护。',
            504: '网关超时。',
        };
        message.error(codeMaps[response.status]);
    }
    return response;
});

export default request;
