import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import ElementUI from 'element-ui'
import { Button, tag } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './app.vue';

import './assets/styles/global.less';
import createRouter from './config/router';
import createStore from './store/store';

Vue.use(VueRouter)
Vue.use(Vuex)
// Vue.use(ElementUI)
Vue.use(Button)
Vue.use(tag)

const router = createRouter()
const store = createStore()

// webpack 配置 new HTMLPlugin({}) 根据本地自定义文件 template.html 生成html文件
// const root = document.createElement('div')
// document.body.appendChild(root)

new Vue({
  // 等价 .$mount('#todo-root')
  // el: '#todo-root',

  router,
  store,
  render: (h) => h(App)
}).$mount('#todo-root')
