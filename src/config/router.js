import VueRouter from 'vue-router'

import routes from './routes'

// export 一个函数 而不是直接导出一个vueRouter对象 目的：防止服务端渲染 内存溢出问题
export default () => {
  // debugger
  return new VueRouter({
    routes,
    // 路由不会出现（#/哈希路由) 开发模式下需要配置webpack->devServer->historyApiFallback
    mode: 'history',

    // 基路径 用vue-router跳转的路径都会自动加/base/ 手动输入无法访问 （前后/都要加）
    // base: '/base/',

    // 如果浏览器不支持 history 形式的前端路由方式，vue 会自动的给我们 fallback 到 hash 的模式
    fallback: true,

    // 全局设置<router-link></router-link>上的class  部分匹配就会有 class="active-link"
    linkActiveClass: 'active-link',
    // 全局设置<router-link></router-link>上的class 只有精确匹配才会有 class="exact-active-link"
    linkExactActiveClass: 'exact-active-link',

    // 使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置
    // 参数savedPosition 只有通过浏览器的 (<-前进/后退->) 触发时才有值。否则为null
    // scrollBehavior(to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     return { x: 0, y: 0 }
    //   }
    // },

    // 字符串转对象（不常用）
    // parseQuery (query) {

    // },
    // 对象转字符串（不常用）
    // stringifyQuery (obj) {

    // }
  })
}
