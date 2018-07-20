import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import marked from 'marked'
import scroll from 'vue-scroll'
Vue.use(scroll)
import hljs from '../static/js/highlight.min.js'
import range from '../static/js/rangeFn.js'

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
