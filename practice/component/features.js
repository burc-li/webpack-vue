/**
 * @name 组件-高级属性
 */

import Vue from 'vue'

const component1 = {
  name: 'comp1',
  // 插槽
  template: `
    <div :style="style">
      <p><strong>这是匿名插槽</strong></p>
      <slot></slot>
    </div>
  `,
  data () {
    return {
      style: {
        width: '500px',
        height: '100px',
        border: '1px solid #ccc'
      }
    }
  }
}

const component2 = {
  name: 'comp2',
  // 具名插槽
  template: `
    <div :style="style">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <slot></slot>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  `,
  data () {
    return {
      style: {
        width: '500px',
        height: '100px',
        border: '1px solid #aaa'
      }
    }
  }
}

const component3 = {
  name: 'comp3',

  // 作用域插槽
  template: `
    <div :style="style">
      <slot></slot>
      <slot :value="value" burc="burc"></slot>
      <slot name="footer"></slot>
    </div>
  `,
  data () {
    return {
      style: {
        width: '500px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: '作用域插槽-value'
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#todo-root',
  components: {
    CompOne: component1,
    CompTwo: component2,
    CompThree: component3
  },
  data () {
    return {
      value: 'new Vue({})'
    }
  },
  mounted () {
    // 强烈不推荐 $refs
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  template: `
    <div>
      <comp-one>
        <span slot="header">comp-two-header</span>
        <span>comp-one-1</span>
        <span>comp-one-2</span>
        <span>comp-one-3</span>
      </comp-one>
      <comp-two >
        <span slot="header">comp-two-header1</span>
        <span slot="header">comp-two-header2</span>
        <span>comp-two-body1</span>
        <span>comp-two-body2</span>
        <span slot="footer">comp-two-footer</span>
      </comp-two>
      <comp-three ref="comp">
        <p>comp-two-slot-匿名插槽</p>
        <p slot-scope="props">{{props.burc}}-作用于插槽</p>
        <p slot="footer">comp-three-footer-具名插槽</p>
      </comp-three>
    </div>
  `
})
