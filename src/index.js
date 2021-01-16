/**
 * @name 入口文件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// 使用i18n导出方法二：需引入vue-i18n
// import VueI18n from 'vue-i18n'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from '@/app.vue'

// 全局css
import '@/assets/styles/global.less'

import createRouter from '@/route/router'
import createStore from '@/store/store'
import i18n from '@/lang/index'
// 使用i18n导出方法二：需引入createI18n方法
// import createI18n from './lang/index'

// 注册全局组件
import Slider from '@/components/index.js'

// 挂载动画库
import animate from 'animate.css'
// import Slider from '@/components/Slider/index.vue'
// Vue.component(Slider.name, Slider)
Vue.use(Slider)
Vue.use(animate)

// 通过插件的形式挂载
Vue.use(VueRouter)
Vue.use(Vuex)
// 使用i18n导出方法二：通过插件的形式挂载VueI18n
// Vue.use(VueI18n)

const router = createRouter()
const store = createStore()
// 使用i18n导出方法二：通过createI18n方法创建i18n实例
// const i18n = createI18n()

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  console.log('index.js--全局路由守卫-to', to)
  console.log('index.js--全局路由守卫-from', from)
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

// /build/template.html 是一个会被 html-webpack-plugin 【new HTMLPlugin({})】处理的模板。在构建过程中，资源链接会被自动注入。

// 挂载到全局window对象上
window.vm = new Vue({
  // 如果在实例化时存在el这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。
  // el: '#todo-root',

  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#todo-root')

// 使用i18n导出方法二：使用createI18n方法创建的i18n实例互相独立，为了让js文件可以引入，必须把此实例导出
// export default i18n
