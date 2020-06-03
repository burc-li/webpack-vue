<template>
  <div>
    <el-button
      type="primary"
      @click="to"
    >
      这是 login 页面
    </el-button>
    <el-tag type="success">
      这是 login 页面
    </el-tag>
  </div>
</template>

<script>
export default {
  methods: {
    to() {
      this.$router.push({ path: '/todo/888', query: { id: 3, name: 'burc' } })
    },
  },
}
</script>
