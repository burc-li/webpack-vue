<template>
  <header class="main-header">
    <h1>
      {{ hello }}
    </h1>
  </header>
</template>

<script>
export default {
  data() {
    return {
      hello: this.$t('hello'),
    }
  },
}
</script>

<style scoped>
.main-header {
  text-align: center;
}

.main-header h1 {
  font-size: 40px;
  color: rgba(175, 47, 47, 0.4);
  font-weight: 600;
  margin: 10px;
}
</style>
