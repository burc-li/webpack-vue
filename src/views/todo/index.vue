<doc>
  @name: Todo首页
</doc>

<template>
  <section class="real-app">
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

let id = 0

export default {
  components: {
    Item,
    Tabs,
  },
  data () {
    return {
      todos: [],
      filter: 'all',
    }
  },
  computed: {
    filterTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const filterCompleted = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === filterCompleted)
    },
  },
  mounted () {
    console.log('this.$router全局路由器对象：', this.$router)
    console.log('this.$route路由对象：', this.$route)
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
    deleteTodo (id) {
      this.todos.splice(
        this.todos.findIndex(todo => id === todo.id),
        1,
      )
    },
    toggleFilter (state, name) {
      console.log(state, name)
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
