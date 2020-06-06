<doc>
  @name: 测试i18n国际化语言包页面
</doc>

<template>
  <div class="i18n-wrap">
    <el-radio-group
      v-model="radioLabel"
      size="small"
      @change="changeLanguage"
    >
      <el-radio-button label="zh">
        中文
      </el-radio-button>
      <el-radio-button label="en">
        English
      </el-radio-button>
    </el-radio-group>
    <h1>{{ $t('hello') }}</h1>
    <h1>{{ title }}</h1>
    <h1>{{ introduction }}</h1>

    <el-select
      v-model="selectValue"
      placeholder="请选择"
    />
  </div>
</template>

<script>
import { getTitle, getIntroduction } from './until'

export default {
  inject: ['reload'],
  data() {
    return {
      title: '',
      radioLabel: localStorage.getItem('lang') || 'zh',
      selectValue: '请选择',
    }
  },
  computed: {
    introduction() {
      return getIntroduction()
    },
  },
  mounted() {
    this.title = getTitle()
  },
  methods: {
    changeLanguage(val) {
      this.$i18n.locale = val
      localStorage.setItem('lang', val)
      // 刷新页面
      this.reload()
      // location.reload()
      // this.title = getTitle()
    },
  },
}
</script>
<style lang="less" scoped>
.i18n-wrap{
  width: 85vw;
}
</style>
