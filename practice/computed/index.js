import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Number: {{number}}</p>
      <p>FullName: {{fullName}}</p>
      <p><input type="text" v-model="number"></p>
      <p>FirstName: <input type="text" v-model="firstName"></p>
      <p>LastName: <input type="text" v-model="lastName"></p>
      <p>Name: <input type="text" v-model="name"></p>
      <p>Obj.a: <input type="text" v-model="obj.a"></p>
    </div>
  `,
  data: {
    firstName: 'Jokcy',
    lastName: 'Lou',
    number: 0,
    fullName: '',
    obj: {
      a: 0
    }
  },
  computed: {
    name: {
      get() {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set(name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: {
    // 第一次渲染页面不会执行
    firstName(newVal, oldVal) {
      this.fullName = newVal + ' ' + this.lastName
    },
    // 第一次渲染页面会执行
    lastName: {
      handler(newVal, oldVal) {
        this.fullName = this.firstName + ' ' + newVal
      },
      immediate: true // 第一次渲染页面立即执行
      // deep: true // 监听对象属性改变
    }
  },
  methods: {
    getName() {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
