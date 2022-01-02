import { defineConfig } from 'umi';
import routes from './routes.js'
import defaultSettings from './defaultSettings'

// {this.props.children} 去使用子组件，dav配置去开启dav，插件需要手动开启
// 改造项目：1.提取路由

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    routes: routes,
    title: defaultSettings.title,
    theme: {},
    fastRefresh: {},
    // dav配置
    dva: {
        immer: true,
        hmr: false,
    },
    // 国际化配置
    locale: {
        default: 'zh-CN',
        antd: false,
        title: false,
        baseNavigator: true,
        baseSeparator: '-',
    },
    // request
    request: {
        dataField: 'data',
    },
});
