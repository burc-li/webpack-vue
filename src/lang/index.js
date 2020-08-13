import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zh from './zh'
import en from './en'

// 方法一: 如使用方法二，VueI18n实例的挂载应在入口文件index.js中配置
import Vue from 'vue'
Vue.use(VueI18n)

// 方法一:
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh', // 语言标识
  messages: {
    zh: Object.assign(zh, zhLocale), // 中文语言包
    en: Object.assign(en, enLocale), // 英文语言包
  },
})

// 热更新（个人感觉弊大于利）
// 缺点：配置i18n热更新后，直接手动更改语言包内容，通过this.$t('')获取的数据【排除在computed选项中使用this.$t('')】，页面相关数据均不会自动更改
// if (module.hot) {
//   module.hot.accept(['./zh', './en'], function () {
//     i18n.setLocaleMessage('zh', require('./zh').default)
//     i18n.setLocaleMessage('en', require('./en').default)
//   })
// }

export default i18n

// 方法二:
// export default () => {
//   const i18n = new VueI18n({
//     locale: 'zh', // 语言标识
//     messages: {
//       zh: Object.assign(zh, zhLocale), // 中文语言包
//       en: Object.assign(en, enLocale), // 英文语言包
//     },
//   })

//   // 热更新
//   if (module.hot) {
//     module.hot.accept(['./zh.js', './en.js'], function () {
//       i18n.setLocaleMessage('zh', require('./zh.js').default)
//       i18n.setLocaleMessage('en', require('./en.js').default)
//     })
//   }

//   return i18n
// }
