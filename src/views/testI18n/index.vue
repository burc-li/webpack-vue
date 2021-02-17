<doc>
  @name: i18n页面
  @description： 测试i18n国际化语言包页面
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

    <template>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table>
    </template>
  </div>
</template>

<script>
import { getTitle, getIntroduction } from './until'
export default {
  inject: ['reload'],
  data () {
    return {
      title: '',
      radioLabel: localStorage.getItem('lang') || 'zh',
      selectValue: '请选择',
      tableData: [
        {
          date: '2016-05-02',
          name: this.$t('hello'),
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
      ],
    }
  },
  computed: {
    introduction () {
      return getIntroduction()
    },
  },
  mounted () {
    this.initTitle()
    console.log('i18n/index.vue--初始化')
  },
  methods: {
    changeLanguage (val) {
      this.$i18n.locale = val
      localStorage.setItem('lang', val)
      this.$router.replace({ path: '/refresh', query: {} })

      // 刷新页面
      // this.reload()
      // location.reload()
      // this.$router.go(0)
    },
    initTitle () {
      this.title = getTitle()
    },
  },
}
</script>
<style lang="less" scoped>
.i18n-wrap {
  width: 75vw;
  margin: 0 auto;
}
</style>
