<doc>
  @name: 空白页
  @description： 从其他页面先进入空白页，然后在空白页里跳转回原来的页面，这种方式页面刷新相对流畅
</doc>

<template>
  <div class="refresh-wrap" />
</template>

<script>

export default {
  // 当DOM更新之后
  // 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。【创建好的实例作为参数传递给 `next` 的回调函数】
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$router.replace(from.path)
      console.log('refresh/index.vue--this', this)
      console.log('refresh/index.vue--vm', vm)
    })
  },

}

</script>
<style lang="less" scoped></style>
