/**
 * @name 组件-自定义双向绑定
 */

import Vue from 'vue'

const component1 = {
  props: ['value'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value">
    </div>
  `,
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}

const component2 = {
  // 将v-model默认绑定的变量value修改名字为otherNameValue
  // 将v-model默认绑定的事件input修改名字为change
  model: {
    prop: 'otherNameValue',
    event: 'change',
  },
  props: ['otherNameValue'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="otherNameValue">
    </div>
  `,
  methods: {
    handleInput(e) {
      this.$emit('change', e.target.value)
    },
  },
}

/* eslint-disable no-new */
new Vue({
  el: '#todo-root',
  components: {
    CompOne: component1,
    CompTwo: component2,
  },
  data: {
    value: '123',
  },
  methods: {
    onInput(val) {
      this.value = val
    },
  },
  template: `
    <div>

    <p>@input="val => {value = val}"</p>
    <comp-one :value="value" @input="val => {value = val}"></comp-one>

    <p>@input="value = arguments[0]"</p>
    <comp-one :value="value" @input="value = arguments[0]"></comp-one>

    <p>@input="value = $event"</p>
    <comp-one :value="value" @input="value = $event"></comp-one>

    <p>@input="onInput"</p>
    <comp-one :value="value" @input="onInput"></comp-one>

    <p>v-model="value"</p>
    <comp-two v-model="value" ></comp-two>
    </div>
  `,
})
