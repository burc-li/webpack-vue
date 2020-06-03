import Vue from 'vue'

/* eslint-disable no-new */
new Vue({
  el: '#todo-root',
  data: {
    isActive: true,
    text: 'text-danger',
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main',
    styles: {
      color: 'red'
    },
    styles2: {
      fontSize: '28px'
    }
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  },
  // template: `
  //   <div :id="aaa" @click="handleClick">
  //     <p v-html="html"></p>
  //   </div>
  // `,
  template: `
    <div
      :class="[{ 'text-actice': isActive, active: isActive },text,'text']"
      :style="[styles, styles2,{border:'1px solid #f00'}]"
    >
      <p>{{getJoinedArr(arr)}}</p>
    </div>
  `
})
