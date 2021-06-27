/**
 * @name Store实例
 */

import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

import cartModules from './modules/cart'
import productModules from './modules/product'

export default () => {
  const store = new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      cart: cartModules,
      product: productModules,
    },
  })

  // 热更新功能 不用每次刷新页面
  // 缺点：配置vuex热更新后，直接手动更改state中的数据，无效果，页面不会自动刷新
  if (module.hot) {
    module.hot.accept([
      './mutations/mutations',
      './actions/actions',
      './getters/getters',
    ], () => {
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        mutations: newMutations,
        actions: newActions,
        getters: newGetters,
      })
    })
  }

  return store
}
