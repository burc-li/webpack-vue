/**
 * @name 组件-高级属性
 */
import Vue from 'vue'

const component1 = {
  name: 'comp1',
  // 插槽
  template: `
    <div :style="style">
      <slot></slot>
    </div>
  `,
  data() {
    return {
      style: {
        width: '500px',
        height: '100px',
        border: '1px solid #ccc'
      },
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
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  `,
  data() {
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
      <slot :value="value" burc="burc"></slot>
    </div>
  `,
  data() {
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

new Vue({
  components: {
    CompOne: component1,
    CompTwo: component2,
    CompThree: component3
  },

  el: '#root',
  data() {
    return {
      value: 'new Vue({})'
    }
  },
  mounted() {
    // 强烈不推荐 $refs
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  template: `
    <div>
      <comp-one>
        <span>comp-one-1</span>
        <span>comp-one-2</span>
      </comp-one>
      <comp-two >
        <span slot="header">comp-two-1</span>
        <span slot="footer">comp-two-2</span>
      </comp-two>
      <comp-three ref="comp">
        <span slot-scope="slotProps" ref="span">
          {{slotProps.value}} 
          {{slotProps.burc}} 
          {{value}}
          <br>
          DOM元素只要存在slot-scope属性，则相对应的<slot></slot>插槽只会显示最后一个带slot-scope属性的DOM
        </span>
      </comp-three>
    </div>
  `
})
