<template>
  <header class="main-header">
    <h1>
      <img
        src="../../assets/images/bg.jpg"
        width="50"
        height="50"
      >
      {{ hello }}
    </h1>

    <div class="link">
      <router-link to="/todo/521">
        首页
      </router-link>
      <router-link to="/testI18n">
        语言包
      </router-link>
      <a @click="navigate">
        Vuex
      </a>
      <!-- <router-link to="/testVuex">
        Vuex
      </router-link> -->
      <router-link to="/test">
        测试
      </router-link>
    </div>
  </header>
</template>

<script>
import logoImg from '@assets/images/bg.jpg'

export default {
  name: 'GlobalHeader',
  data () {
    return {
      logoImg: logoImg,
      hello: this.$t('hello'),
    }
  },

  methods: {
    navigate () {
      this.$router.push({ name: 'myTestVuex', params: { id: 5678 } })
    },
  },
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.main-header {
  text-align: center;
  background-color: #26292E;
  color: #DE5E60;
  margin-bottom: 40px;
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
}

.main-header h1 {
  font-size: 40px;
  font-weight: 600;
  margin: 0;
}
.main-header img {
  vertical-align: bottom;
}

.main-header .link{
  display: flex;
  align-items: center;
  font-size: 20px;
  a {
    color: bisque;
    text-decoration: none;
    margin-left: 20px;
  }
}
</style>
