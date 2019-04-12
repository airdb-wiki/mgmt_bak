import Vue from 'vue'
import App from './App'

import {get, post} from './utils/http'

import LightTimeline from 'vue-light-timeline'

Vue.use(LightTimeline)

Vue.prototype.$post = post
Vue.prototype.$get = get

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
