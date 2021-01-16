<doc>
  @name: 测试页面
  @description： 测试v-if语句是否会销毁重建组件
</doc>

<template>
  <div class="Test">
    <el-button
      type="primary"
      plain
      @click="changeCondition"
    >
      切换
    </el-button>
    <template v-if="flag">
      <label>Username</label>
      <input placeholder="Enter your username">
      <el-input
        v-model="input"
        placeholder="Enter your username"
      />
      <BaseInput key="1" />
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Enter your email address">
      <el-input
        v-model="input"
        placeholder="Enter your email address"
      />
      <BaseInput key="2" />
    </template>
  </div>
</template>

<script>
import BaseInput from './BaseInput'
export default {
  components: {
    BaseInput,
  },
  data() {
    return {
      flag: true,
      input: '',
    }
  },
  methods: {
    changeCondition() {
      this.flag = !this.flag
    },
  },
}
</script>
<style lang="less" scoped>
.Test{
  height: 50vh;
  width: 75vw;
  margin: 0 auto;
  border: 1px solid pink;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  button{
    margin-bottom: 20px;
  }
  > input, > label, > .el-input{
    margin-bottom: 10px;
  }
}
</style>
