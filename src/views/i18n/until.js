/**
 * @name 测试i18n如何在js文件中调用
 */
import VueI18n from '@/lang'

export const getTitle = () => {
  return VueI18n.t('title')
}
export const getIntroduction = () => {
  return VueI18n.t('introduction')
}
