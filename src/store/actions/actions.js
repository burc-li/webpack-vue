/**
 * @name actions 异步操作
 */

/**
 * store对象值
 * {getters: {…}, state: {…}, rootGetters: {…}, dispatch: ƒ, commit: ƒ, …}
 * dispatch: ƒ boundDispatch(type, payload)
 * commit: ƒ boundCommit(type, payload, options)
 * getters: {}
 * state: {…}
 * rootGetters: {}
 * rootState: {…}
 * __proto__: Object
 * updateCountAsync( store, […args] )
 */
export default {
  updateAddressAsync (store, data) {
    // console.log('store/actions/actions.js--store', store)
    setTimeout(() => {
      store.commit('updateAddress', {
        town: '商河县',
        village: '郑路镇',
      })
    }, data.time)
  },
  updateCountAsync (store, data) {
    // console.log('store/actions/actions.js--store', store)
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num,
      })
    }, data.time)
  },
  // updateCountAsync({ dispatch, commit, state }, data) {
  //   console.log("store/actions/actions.js--store", store)
  //   setTimeout(() => {
  //     commit('updateCount', {
  //       num: data.num
  //     })
  //   }, data.time)
  // }
}
