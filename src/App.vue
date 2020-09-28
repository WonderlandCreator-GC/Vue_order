<template>
  <div id="app">
    <router-view />
    <footer-guide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuide from 'components/footerGuide/FooterGuide'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  created() {
    // 解决刷新页面时vuex中用户状态信息丢失的问题
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.app
  width 100%
  height 100%
  background #f5f5f5
</style>
