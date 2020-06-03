import Vue from 'vue'

const app = new Vue({
  data: {
    text: 0,
    obj: {}
  },
  watch: {
    text (newText, oldText) {
      console.log('text数据发生改变立即调用watch方法', `${newText} : ${oldText}`)
    }
  },
  // el: '#root',
  template: '<div ref="div">{{text}} {{obj.a}}</div>'
})

// 或者通过Vue对象中添加 el: '#root'
// 将app挂载到#root标签
app.$mount('#root')

setInterval(() => {
  // app.text += 1  改变
  // app.obj.a = 1  不改变
  // app.$set(app.obj, 'a', 1) 改变
  // app.$options.data.text += 1 不改变
  // app.$data.text += 1  改变
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)

// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// console.log(app.$root === app)  true
// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer)

// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })
// setTimeout(() => {
//   unWatch()
// }, 2000)

// app.$on('test', (a, b) => {
//   console.log(`test emited ${1} ${b}`)
// })
app.$once('test', (a, b) => {
  console.log(`test emited ${1} ${b}`)
})
setInterval(() => {
  app.$emit('test', 1, 2)
}, 1000)

// 组件强制渲染一次
// app.$forceUpdate()
