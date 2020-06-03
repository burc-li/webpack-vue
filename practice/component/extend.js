/**
 * @name 组件-组件继承
 */

import Vue from 'vue'

const compoent = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  // 如果组件不是通过new Vue({})创建， 则data必须用一个函数
  data() {
    return {
      text: 'compoent'
    }
  },
  mounted() {
    console.log('compoent comp mounted')
  },
  methods: {
    handleChange() {
      this.$emit('change')
    }
  }
}

const componet2 = {
  extends: compoent,
  // 如果组件不是通过new Vue({})创建， 则data必须用一个函数
  data() {
    return {
      text: 'componet2'
    }
  },
  mounted() {
    console.log("componet2", this.$parent.$options.name) //Root
  }
}

const parent = new Vue({
  name: 'parent'
})
// 强烈不推荐使用parent
new Vue({
  parent: parent,
  name: 'Root',
  el: '#todo-root',
  mounted() {
    console.log('new Vue({})', this.$parent.$options.name) //parent
  },
  components: {
    Comp: componet2
  },
  data: {
    text: 'new Vue({})'
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp :prop-one='text'></comp>
    </div>
  `
})

// const CompVue = Vue.extend(compoent)
// new CompVue({
//   el: '#root',
// propsData可以被继承组件compoent的props可以拿到
//   propsData: {
//     propOne: 'xxx'
//   },
// data会覆盖掉继承组件compoent的data
//   data: {
//     text: '123'
//   },
// 先执行继承组件compoent的mounted(),再执行本组件的mounted
//   mounted () {
//     console.log('instance mounted')
//   }
// })

