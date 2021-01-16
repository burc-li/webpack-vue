
const state = () => ({
  name: '购物车模块',
  count: 0,
})

// getters
const getters = {
  cartName: (state, getters, rootState, rootGetters) => {
    return `${state.name} - ${state.count} - ${rootState.product.name}`
  },
  rootCount: (state, getters, rootState, rootGetters) => {
    return `${rootState.count}`
  },
  rootFullName: (state, getters, rootState, rootGetters) => {
    return `${rootGetters.fullName}`
  },
}

// actions
const actions = {
  updateNameAsync (store, payload) {
    setTimeout(() => {
      store.commit('setCartName', {
        num: payload.num,
      })
    }, payload.time)
  },
}

// mutations
const mutations = {
  setCartName (state, payload) {
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
