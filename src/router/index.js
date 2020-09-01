import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import(/* webpackChunkName: "Home" */'@/home/Index.vue')
const List = () => import(/* webpackChunkName: "List" */'@/list/Index.vue')
const Detail = () => import(/* webpackChunkName: "Detail" */'@/detail/Index.vue')
const Doc = () => import(/* webpackChunkName: "Doc" */'@/doc/Index.vue')
const DocDetail = () => import(/* webpackChunkName: "DocDetail" */'@/docDetail/Index.vue')
const Article = () => import(/* webpackChunkName: "Article" */'@/article/Index.vue')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/(home|index)?',
    name: 'Home',
    component: Home,
  }, {
    path: '/index.html',
    name: 'HomeHtml',
    component: Home,
  }, {
    path: '/test/(home|index)',
    name: 'HomeTest',
    component: Home,
  }, {
    path: '/test/list/:id',
    name: 'List',
    component: List,
  }, {
    path: '/test/detail/:id',
    name: 'Detail',
    component: Detail,
  }, {
    path: '/doc/index',
    name: 'Doc',
    component: Doc,
  }, {
    path: '/doc/detail/:id',
    name: 'DocDetail',
    component: DocDetail,
  },{
    path: '/article/:id',
    name: 'Article',
    component: Article,
  }],
})
