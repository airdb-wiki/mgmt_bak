import { createApp } from 'vue'
import { createUI } from 'taro-ui-vue3'
import { Tab2, Contact, ListContent } from './components/index'

import './app.less'


const App = createApp({
  onShow(options) {
    console.log(options)
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

const tuv3 = createUI()
App.use(tuv3)

App.component(Tab2.name, Tab2)
App.component(Contact.name, Contact)
App.component(ListContent.name, ListContent)


export default App
