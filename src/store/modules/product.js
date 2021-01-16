// 商品模块

const state = () => ({
  name: '商品模块',
  count: 0,
})

// getters
const getters = {
  productName: (state, getters, rootState, rootGetters) => {
    return `${state.name} - ${state.count} - ${rootState.cart.name}`
  },
}

// actions
const actions = {
  // 修改本身命名空间Count
  updateProductNameAsync (store, payload) {
    setTimeout(() => {
      store.commit('setProductName', {
        num: payload.num,
      })
    }, payload.time)
  },

  // 修改根命名空间Count
  updateRootCountAsync (store, payload) {
    setTimeout(() => {
      store.commit('updateCount', {
        num: payload.num,
      }, {
        root: true,
      })
    }, payload.time)
  },

  // 修改购物车命名空间count
  updateCartCountAsync (store, payload) {
    setTimeout(() => {
      store.commit('cart/setCartName', {
        num: payload.num,
      }, {
        root: true,
      })
    }, payload.time)
  },
}

// mutations
const mutations = {
  setProductName (state, payload) {
    state.count = state.count + payload.num
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
