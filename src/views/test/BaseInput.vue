<doc>
  @name: 测试页面
  @description： 测试v-if语句是否会销毁重建组件
</doc>

<template>
  <div class="BaseInput">
    <input placeholder="Enter your username">
    <el-input
      v-model="value"
      placeholder="Enter your email address"
      @keyup.enter.native="enterInput"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: true,
      value: '',
    }
  },
  mounted () {
    console.log('渲染组件')
  },
  destroyed () {
    console.log('销毁组件')
  },
  methods: {
    enterInput () {
      console.log('value', this.value)
    },
  },
}
</script>
<style lang="less" scoped>
.BaseInput{

}
</style>
