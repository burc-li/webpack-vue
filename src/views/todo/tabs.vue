<doc>
  @name: Todo Tabs
  @description： Todo 底部
</doc>

<template>
  <div class="helper">
    <span class="left">{{ unfinishedTodo.length }} items left</span>
    <span class="tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[state, filter === state ? 'actived' : '']"
        @click="toggleFilter(state)"
      >
        {{ state }}
      </span>
    </span>
    <span
      class="clear"
      @click="clearAllCompleted"
    >Clear Completed</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true,
    },
    todos: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      states: ['all', 'active', 'completed'],
      name: 'burc',
    }
  },
  computed: {
    unfinishedTodo: function () {
      return this.todos.filter(todo => todo.completed === false)
    },
  },
  mounted () {
    console.log('data', this.state)
    console.log('props', this.filter)
  },
  methods: {
    clearAllCompleted () {
      this.$emit('clearAll')
    },
    toggleFilter (state) {
      this.$emit('toggle', state, 'burc1', 'burc2')
    },
  },
}
</script>

<style lang="less" scoped>
.helper {
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  line-height: 30px;
  background-color: #ffffff;
  font-size: 14px;
}
.left,
.clear,
.tabs {
  padding: 0 10px;
}
.left .clear {
  width: 150px;
}
.left {
  text-align: center;
}
.clear {
  text-align: right;
  cursor: pointer;
}
.tabs {
  width: 200px;
  display: flex;
  justify-content: space-between;
  * {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(175, 47, 47, 0);
    &.actived {
      border-color: rgba(175, 47, 47, 0.4);
      border-radius: 5px;
    }
  }
}
</style>
