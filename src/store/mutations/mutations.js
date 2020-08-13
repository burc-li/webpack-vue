/**
 * @name mutations 修改state数据
 */

/**
 * mutations不能写异步代码, 异步代码写在actions
 * 第一个参数：state
 * 第二个参数：变量或对象
 * 最多只能有两个参数，若想传递多个参数，可把第二个参数设置为对象
 * updateAddress( state, […args] )
 */

export default {
  updateAddress (state, { town, village }) {
    // console.log("store/mutations/mutations.js--",town, village)
    state.address = state.address + town + village
  },
  updateCount (state, data) {
    // console.log('store/mutations/mutations.js--state', state)
    state.count = state.count + data.num
  },
}
