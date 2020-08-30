import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

// 引用kbone-api
Vue.use(kboneAPI)

sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
