import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import store from './store'
import "./assets/css/global.css"
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL=`http://127.0.0.1:8888/api/private/v1/`
Vue.prototype.$http=axios;

Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
