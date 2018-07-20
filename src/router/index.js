import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/App'
import Main from '../components/main.vue'
import ArticleMain from '../page/article.vue'

import Admin from '../page/admin.vue'

import Login from '../page/login.vue'

import Type from '../components/type.vue'
import Log from "../components/logs.vue"
import artEdit from '../components/artEdit.vue'
import article from '../components/artList.vue'
import keyWord from '../components/keyWords.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
      {
        path: "/article/:id",
        name: "ArticleMain",
        component: ArticleMain
      },
      {
        path: "/admin",
        name: "admin",
        component: Admin,
        children: [
            {
                path: '/',
                name: "type",
                component: Type
            },
            {
                path: "/admin/logs",
                name: "logs",
                component:Log
            },
            {
                path: "/admin/keyWord",
                name: "keyWord",
                component:keyWord
            },
            {
                path: "/admin/article",
                name: "article",
                component:article
            },
            {
                path: "/admin/articleEdit/:id?",
                name: "Edit",
                component:artEdit
            }
        ]
      },
      {
          path: "/admin/login",
          name: "login",
          component: Login,
      }
  ]
})
