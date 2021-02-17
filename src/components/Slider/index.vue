<template>
  <div class="main-silder">
    <h1>
      这是一个全局注册的组件
    </h1>
  </div>
</template>

<script>
export default {
  name: 'GlobalSilder',
  data () {
    return {

    }
  },
}
</script>

<style scoped>
.main-silder {
  text-align: center;
}

.main-silder h1 {
  font-size: 26px;
  color: rgba(175, 47, 47, 0.4);
  font-weight: 600;
  margin: 10px;
}
</style>
