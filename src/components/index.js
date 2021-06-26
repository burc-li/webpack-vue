// import Slider from './Slider'

/**
   * @name 自动化注入
   * directory: 要查找的文件路径
   * useSubdirectories: 是否查找子目录
   * regExp: 要匹配文件的正则
   */
const requireContext = require.context(
  './',
  true,
  /index.vue$/,
)

export default Vue => {
  console.log('require-requireContext', requireContext)
  console.log('require-requireContext.keys()', requireContext.keys())

  // requireContext本身就是一个函数，其接收一个参数request，这个request是指requireContext.keys()的元素key，即可得到对应模块
  const componentModules = requireContext.keys().map(requireContext)
  console.log('require-componentModules', componentModules)

  componentModules.forEach(({ default: componentItem }) => {
    Vue.component(componentItem.name, componentItem)
  })
  // Vue.component(Slider.name, Slider)
}
