<doc>
  @name: 路由分发页面
</doc>

<template>
  <div>
    <el-button
      plain
      type="danger"
      @click="toTodo"
    >
      To 首页
    </el-button>
    <el-button
      plain
      type="danger"
      @click="toI18n"
    >
      To i18n测试页
    </el-button>
  </div>
</template>

<script>
export default {
  methods: {
    toTodo() {
      this.$router.push({ path: '/todo/521' })
    },
    toI18n() {
      this.$router.push({ path: '/i18n' })
    },
  },
}
</script>
