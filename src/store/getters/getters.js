/**
 * @name getters 获取state数据
 */

export default {
  fullName (state) {
    return `${state.firstName} --- ${state.lastName}`
  },
}
