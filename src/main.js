import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import Print from 'vue-print-nb'
Vue.use(Print)


import axios from 'axios'
Vue.config.productionTip = false

Vue.prototype.$http = axios

// 配置接口根路径
// axios.defaults.baseURL = 'http://175.6.115.16:8081'
// axios.defaults.baseURL = 'http://122.51.219.123:8083'

axios.defaults.baseURL = 'http://localhost:8083'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
