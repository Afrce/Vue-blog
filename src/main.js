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
import checkNow from "./tools/admin";
import {Notification } from "element-ui"
Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  if(to.path == '/admin/login'){
      localStorage.removeItem('jwt')
      localStorage.removeItem('exp')
  }
  let Reg = /admin/g;
  if(!checkNow() && Reg.exec(to.path) && to.path != '/admin/login'){
      Notification ({
          title: '登录失效请重新登录！',
          message: "",
          type: 'warning'
      })
      next({path: '/admin/login'})
  }
  next()
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
