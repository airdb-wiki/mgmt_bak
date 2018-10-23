import Vue from 'vue'
import App from './App'

import 'mpvue-weui/static/weui/weui.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
