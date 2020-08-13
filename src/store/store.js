/**
 * @name Store实例
 */

import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

export default () => {
  const store = new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions,
  })
  // plugins: [
  //   (store) => {
  //     console.log('store/store.js--my plugin invoked')
  //   }
  // ]
  // modules: {
  //   a: {
  //     namespaced: true,
  //     state: {
  //       text: 1
  //     },
  //     mutations: {
  //       updateText (state, text) {
  //         console.log('store/store.js--a.state', state)
  //         state.text = text
  //       }
  //     },
  //     getters: {
  //       textPlus (state, getters, rootState) {
  //         return state.text + rootState.b.text
  //       }
  //     },
  //     actions: {
  //       add ({ state, commit, rootState }) {
  //         commit('updateCount', { num: 56789 }, { root: true })
  //       }
  //     }
  //   },
  //   b: {
  //     namespaced: true,
  //     state: {
  //       text: 2
  //     },
  //     actions: {
  //       testAction ({ commit }) {
  //         commit('a/updateText', 'test text', { root: true })
  //       }
  //     }
  //   }
  // }

  // 热更新功能 不用每次刷新页面
  // 缺点：配置vuex热更新后，直接手动更改state中的数据，无效果，页面不会自动刷新
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters',
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        actions: newActions,
        getters: newGetters,
      })
    })
  }

  return store
}
