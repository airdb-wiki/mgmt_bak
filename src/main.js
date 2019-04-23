import Vue from 'vue'
import App from './App'
import '../static/weui/weui.css'

import {get, post} from './api/data'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$post = post
Vue.prototype.$get = get

const app = new Vue(App)
app.$mount()
