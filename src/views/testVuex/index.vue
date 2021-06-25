<doc>
  @name: vuex页面
  @description： 测试vuex模块modules页面
</doc>

<template>
  <div class="testVuex">
    <Silder></Silder>
    <section class="modules-item">
      <h1>根命名空间</h1>
      <h3>state: {{ firstName }} {{ lastName }}</h3>
      <h3>getters: {{ fullName }}</h3>
      <el-button
        type="primary"
        size="small"
        @click="clickRootBtn"
      >
        修改根命名空间Count
      </el-button>
    </section>
    <section class="modules-item">
      <h1>购物车命名空间</h1>
      <h3>state: {{ name }} {{ detail }}</h3>
      <h3>getters: {{ cartName }}</h3>
      <h3>rootState: {{ rootCount }}</h3>
      <h3>rootGetters: {{ rootFullName }}</h3>
      <el-button
        type="primary"
        size="small"
        @click="clickCartBtn"
      >
        修改购物车命名空间Count
      </el-button>
    </section>
    <section class="modules-item">
      <h1>商品命名空间</h1>
      <h3>state: {{ aliasName }} {{ aliasDetail }}</h3>
      <h3>getters: {{ productName }}</h3>
      <el-button
        type="primary"
        size="small"
        @click="clickProductBtnUpdateSelf"
      >
        修改商品命名空间Count
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="clickProductBtnUpdateRoot"
      >
        修改根命名空间Count
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="clickProductBtnUpdateCart"
      >
        修改购物车命名空间Count
      </el-button>
    </section>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapState, mapGetters, mapActions } from 'vuex'
import Silder from '../../components/Slider'
// 5.js
const vuerouter = require('vue-router')
const vuex = require('vuex')
const elementui = require('element-ui')
const { mapState: mapStateCart, mapGetters: mapGettersCart, mapActions: mapActionsCart } = createNamespacedHelpers('cart')
const { mapState: mapStateProduct, mapGetters: mapGettersProduct, mapActions: mapActionsProduct } = createNamespacedHelpers('product')
export default {
  comments: { Silder },
  data () {
    return {
    }
  },

  computed: {
    // 根命名空间
    ...mapState(['firstName', 'lastName']),
    ...mapGetters(['fullName']),

    // 购物车命名空间
    ...mapStateCart(['name', 'detail']),
    ...mapGettersCart(['cartName', 'rootCount', 'rootFullName']),

    // 商品命名空间
    ...mapStateProduct({
      aliasName: 'name',
      aliasDetail: 'detail',
    }),
    ...mapGettersProduct(['productName']),
  },

  mounted () {
    console.log('测试路由', this.$route)
  },

  methods: {
    // 根命名空间
    ...mapActions(['updateCountAsync']),
    clickRootBtn () {
      this.updateCountAsync({
        time: 100,
        num: 1,
      })
    },

    // 购物车命名空间
    ...mapActionsCart(['updateNameAsync']),
    clickCartBtn () {
      this.updateNameAsync({
        time: 100,
        num: 1,
      })
    },

    // 商品命名空间
    ...mapActionsProduct(['updateProductNameAsync', 'updateRootCountAsync', 'updateCartCountAsync']),
    clickProductBtnUpdateSelf () {
      this.updateProductNameAsync({
        time: 100,
        num: 1,
      })
    },
    clickProductBtnUpdateRoot () {
      this.updateRootCountAsync({
        time: 100,
        num: 1,
      })
    },
    clickProductBtnUpdateCart () {
      this.updateCartCountAsync({
        time: 100,
        num: 1,
      })
    },
  },

}
</script>

<style lang="less" scoped>
  .testVuex{
    display: flex;
    padding: 0 10%;
    .modules-item{
      width: 33%;
      margin: 0 15px;
      border: 2px solid plum;
    }
    h3{
      margin: 4px;
    }
    button{
      margin: 10px 0 0;
      display: block;
    }
  }
</style>
