<doc>
  @name: Todo Item
  @description： Todo页面的事项Item
</doc>

<template>
  <div :class="['todo-item', {completed: todo.completed}]">
    <input
      :checked="todo.completed"
      type="checkbox"
      class="toggle"
      @change="changeCheckboxValue(...arguments,todo)"
    >
    <label>
      {{ todo.content }}
    </label>
    <button
      class="destory"
      @click="deleteTodo"
    />
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeCheckboxValue (event, { id }) {
      const checked = event.target.checked
      this.$emit('changeStatus', {
        id,
        checked,
      })
    },
    deleteTodo () {
      this.$emit('del', this.todo.id)
    },
  },
}
</script>

<style lang="less" scoped>
.todo-item {
  position: relative;
  background-color: #fff;
  font-size: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  &:hover {
    .destory:after {
      content: "x";
    }
  }
  label {
    // white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }
  &.completed {
    label {
      color: #d9d9d9;
      text-decoration: line-through;
    }
  }
}
.toggle {
  text-align: center;
  width: 50px;
  height: 30px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  // appearance: none;
  outline: none;
  &:after {
    content: url("../../assets/images/checked.svg");
  }
  &:checked:after {
    content: url("../../assets/images/checked.svg");
  }
}
.destory {
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  background-color: transparent;
  appearance: none;
  border-width: 0;
  cursor: pointer;
  outline: none;
}
</style>
