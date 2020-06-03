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
  updateCountAsync (store, data) {
    // console.log('store', store)
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num,
      })
    }, data.time)
  },
  // updateCountAsync({ dispatch, commit, state }, data) {
  //   console.log("store", store)
  //   setTimeout(() => {
  //     commit('updateCount', {
  //       num: data.num
  //     })
  //   }, data.time)
  // }
}
