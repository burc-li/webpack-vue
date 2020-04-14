<template>
  <div id="app">
    <Header />
    <h1>{{ burcCount }}</h1>
    <el-button type="primary">主要按钮</el-button>
    <el-tag type="success">标签二</el-tag>
    <!-- <router-link :to="{name: 'burcTodo'}">跳转todo</router-link> -->
    <router-link to="/todo/2">跳转todo</router-link>
    <!-- <router-link to="/todo">跳转todo</router-link> -->
    <router-link to="/login">跳转login</router-link>
    <!-- <router-view />显示的是当前路由地址所对应的内容 -->
    <router-view />
    <Footer />
  </div>
</template>
<script>
import Header from "./layout/header.vue";
import Footer from "./layout/footer.jsx";
import {mapState, mapGetters, mapMutations, mapActions} from "vuex";

export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    // 获取route参数
    console.log(this.$route);

    // 执行mutations中的方法
    // this.$store.commit("updateAddress", {
    //   town: "郑路镇",
    //   village: "扒牯李村"
    // });
    // this.updateAddress({
    //   town: "郑路镇",
    //   village: "扒牯李村"
    // });

    // 执行actions中的方法
    // setInterval(() => {
    //   this.$store.dispatch("updateCountAsync", {
    //     num: 1,
    //     time: 500
    //   });
    // }, 1000);
    setInterval(() => {
      this.updateCountAsync({
        num: 1,
        time: 500
      });
    }, 1000);
  },

  computed: {
    // address() {
    //   return this.$store.state.address;
    // },
    // fullName() {
    //   return this.$store.getters.fullName;
    // },

    // ...mapState(["address"])
    ...mapState({
      // burcAddress: "address"
      burcAddress: state => state.address,
      burcCount: "count"
    }),

    // ...mapGetters(["fullName"])
    ...mapGetters({
      burcFullName: "fullName"
    })
  },

  methods: {
    ...mapMutations(["updateAddress"]),
    ...mapActions(["updateCountAsync"])
  }
};
</script>

<style scoped>
#app {
  margin: auto;
}
</style>
