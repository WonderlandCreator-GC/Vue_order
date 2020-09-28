import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button } from 'mint-ui'
import './mock/mockServer' // 加载mockServer即可
import VueLazyload from 'vue-lazyload' // 引入图片懒加载插件
import loading from './common/images/loading.gif' // 引入懒加载的gif图片
import './filters'

Vue.config.productionTip = false
// 注册Button全局组件标签
Vue.component(Button.name, Button)
// 使用并配置懒加载插件
Vue.use(VueLazyload, {
  loading
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
