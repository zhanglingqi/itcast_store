// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment';

//elment 导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
import axios from 'axios';

Vue.use(ElementUI);
//Vue.config.productionTip = false
// 全局过滤器，格式化日期
Vue.filter('fmtDate', (value, fmtString) => {
  return moment(value).format(fmtString);
});

//配置全局的axios
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
   render: h => h(App)
})
