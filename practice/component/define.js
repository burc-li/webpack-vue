/**
 * @name 组件-组件定义
 */

import Vue from 'vue'

const compoent = {
  props: {
    active: {
      type: Boolean,
      required: true
      // validator(value) {
      //   return typeof value === 'boolean'
      // }
    },
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
  data () {
    return {
      text: 0
    }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

// Vue.component('CompOne', compoent)
/* eslint-disable no-new */
new Vue({
  el: '#todo-root',
  // 组件名 CamelCase驼峰命名法  例如：CompOne
  components: {
    CompOne: compoent
  },
  data: {
    prop1: 'text1'
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  // DOM中使用 kebab-case (短横线分隔命名)  例如：<comp-one />
  // 推荐 prop-one  尽量不使用propOne
  template: `
    <div>
      <comp-one ref="comp1" :active="true" :prop-one="prop1" @change="handleChange"></comp-one>
      <comp-one :active="true" propOne="prop1"></comp-one>
    </div>
  `
})
