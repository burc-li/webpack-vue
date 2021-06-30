<doc>
  @name: Todo页面
  @description： Todo页面入口文件
</doc>

<template>
  <section class="real-app">
    <GlobalSilder />
    <Silder />
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来做什么"
      @keyup.enter="addTodo"
    >
    <Item
      v-for="todo in filterTodos"
      :key="todo.id"
      :todo="todo"
      @changeStatus="updateTodo"
      @del="deleteTodo"
    />
    <Tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAll="clearAllCompletedTodo"
    />
    <router-view />
  </section>
</template>

<script>
import Item from './item'
import Tabs from './tabs'
import Silder from '../../components/Slider'
const vuerouter = require('vue-router')
const vuex = require('vuex')
const elementui = require('element-ui')
// import VueRouter from 'vue-router'
// import Vuex from 'vuex'
// import ElementUI from 'element-ui'

let id = 0
export default {
  components: {
    Item,
    Tabs,
    Silder,
  },
  data () {
    return {
      todos: [],
      filter: 'all',
    }
  },
  computed: {
    filterTodos () {
      const { filter } = this.$data
      console.log('--------', filter)
      if (this.filter === 'all') {
        return this.todos
      }
      const filterCompleted = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === filterCompleted)
    },
  },
  mounted () {
    // 小姐姐小姐姐
    console.log('todo/index.vue--this.$router全局路由器对象：', this.$router)
    console.log('todo/index.vue--this.$route路由对象：', this.$route)
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false,
      })

      e.target.value = ''
    },
    updateTodo ({ checked, id }) {
      console.log(checked, id, this.todos)
      const todo = this.todos.find(item => id === item.id)

      this.todos.splice(
        this.todos.findIndex(item => id === item.id),
        1,
        { ...todo, completed: checked },
      )
    },
    deleteTodo (id) {
      this.todos.splice(
        this.todos.findIndex(todo => id === todo.id),
        1,
      )
    },
    toggleFilter (state, name1, name2) {
      console.log('todo/index.vue--', state, name1, name2)
      this.filter = state
    },
    clearAllCompletedTodo () {
      this.todos = this.todos.filter(todo => todo.completed === false)
    },
  },
}
</script>

<style lang="less" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: none;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
