import Vue from 'vue'
import App from './App'

import LightTimeline from 'vue-light-timeline'
import 'mpvue-weui/static/weui/weui.css'

Vue.use(LightTimeline)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
