/**
 * @name 入口文件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import ElementUI from 'element-ui'
import { Button, tag } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './app.vue'

import './assets/styles/global.less'
import createRouter from './config/router'
import createStore from './store/store'

// 通过插件的形式挂载
Vue.use(VueRouter)
Vue.use(Vuex)
// Vue.use(ElementUI)
Vue.use(Button)
Vue.use(tag)

const router = createRouter()
const store = createStore()

router.beforeEach((to, from, next) => {
  console.log('全局路由守卫-to', to)
  console.log('全局路由守卫-from', from)
  if (to.meta.requireAuth) {
    // 禁止跳转
    // next(false)

    // 跳转到指定页面
    // next('/login')
    // next({ path: '/login' })

    // 允许跳转
    next()
    // next({
    //   path: '/login',
    //   query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由 http://127.0.0.1:8000/login?redirect=%2Ftodo%2F1
    // })
  } else {
    // 允许跳转
    next()
  }
})

// webpack 配置 new HTMLPlugin({}) 根据本地自定义文件 template.html 生成html文件
// const root = document.createElement('div')
// document.body.appendChild(root)

new Vue({
  // 等价 .$mount('#todo-root')
  // el: '#todo-root',

  router,
  store,
  render: (h) => h(App),
}).$mount('#todo-root')
