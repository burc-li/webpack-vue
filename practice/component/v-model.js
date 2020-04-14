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
    }
  }
}

const component2 = {
  // 将v-model默认绑定的变量value修改名字为otherNameValue
  // 将v-model默认绑定的事件input修改名字为change
  model: {
    prop: 'otherNameValue',
    event: 'change'
  },
  props: ['otherNameValue'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="otherNameValue">
      {{test}}
    </div>
  `,
  methods: {
    handleInput(e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component1,
    CompTwo: component2,
  },
  el: '#root',
  data: {
    value: '123'
  },
  template: `
    <div>
      <comp-one :value="value" @input="value = arguments[0]"></comp-one>
      <comp-two v-model="value" ></comp-two>
    </div>
  `
})
