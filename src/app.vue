<doc>
  @name: 根组件
</doc>

<template>
  <div id="app">
    <Header />
    <h1>{{ `${burcAddress}--${hello}` }}</h1>
    <section class="router-wrap">
      <transition mode="out-in" name="fade">
        <!-- <router-view />显示的是当前路由地址所对应的内容 -->
        <router-view v-if="isRouterAlive" />
      </transition>
    </section>
    <Footer />
  </div>
</template>
<script>
import Header from '@components/Header/index'
import Footer from '@components/Footer/index'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    Header,
    Footer,
  },
  provide () {
    return {
      reload: this.reload,
    }
  },
  data () {
    return {
      isRouterAlive: true,
      hello: this.$t('hello'),
    }
  },
  computed: {
    // 原生调用vuex中 state 中的值
    // address() {
    //   return this.$store.state.address;
    // },

    // 原生调用vuex中 getters 中的方法
    // fullName() {
    //   return this.$store.getters.fullName;
    // },

    // 通过 mapState 方法调用vuex中 state 中的值
    // ...mapState(["address"])
    ...mapState({
      // burcAddress: "address"
      burcAddress: state => state.address,
      burcCount: 'count',
    }),

    // 通过 mapGetters 方法调用vuex中 getters 中方法
    // ...mapGetters(["fullName"])
    ...mapGetters({
      burcFullName: 'fullName',
    }),
  },
  mounted () {
    // 获取route参数
    console.log('app.vue--route路由对象', this.$route)

    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    console.log('process.env.VERSION', process.env.VERSION)
    console.log('process.env.GLOBAL_CONFIG', process.env.GLOBAL_CONFIG)

    // 原生执行vuex中 mutations中的方法 (不建议在store外部使用mutations方法)
    // this.$store.commit("updateAddress", {
    //   town: "郑路镇",
    //   village: "扒牯李村"
    // });

    // 原生执行vuex中 actions中的方法
    // setInterval(() => {
    //   this.$store.dispatch('updateCountAsync', {
    //     num: 1,
    //     time: 500,
    //   })
    // }, 1000)

    // 通过 mapMutations 方法调用vuex中 mutatios 中方法(不建议在store外部使用mutations方法)
    // setInterval(() => {
    this.updateAddress({
      town: '郑路镇',
      village: '扒牯李村',
    })
    // }, 1000)

    // 通过 mapActions 方法调用vuex中 actions 中方法
    // setInterval(() => {
    //   this.updateCountAsync({
    //     num: 1,
    //     time: 500,
    //   })
    // }, 1000)
  },

  methods: {
    // 通过 mapMutations 方法调用vuex中 mapMutations 中方法 (不建议在store外部使用mutations方法)
    ...mapMutations(['updateAddress']),
    // 通过 mapActions 方法调用vuex中 mapActions 中方法
    ...mapActions(['updateCountAsync']),

    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
  },
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#app {
  position: relative;
  width: 100%;
  margin: 0px auto 40px;
  h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #de5e60;
  }
  a {
    position: absolute;
    left: 50%;
    transform: translateX(calc(-50% - 100px));
    font-size: 22px;
    line-height: 30px;
  }
  section.router-wrap {
    margin-top: 20vh;
    position: absolute;
    top: 60px;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
  }
  #footer {
    position: fixed;
    bottom: 5vh;
    left: 50%;
    transform: translateX(-50%);
  }
  // .animate__animated {
  //   --animate-duration: .4s;
  // }
  .fade-enter {
    opacity: 0;
    transform: translateX(20px);
  }
  .fade-enter-active {
    transition: all 0.5s;
  }
  .fade-enter-to {
    opacity: 1;
  }
  .fade-leave {
    opacity: 1;
  }
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
}
</style>
