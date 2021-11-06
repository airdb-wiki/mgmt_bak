import { createApp } from 'vue'
import { createUI } from 'taro-ui-vue3'
import { NavBar, Contact, ListContent, ShowArticle, ListRescueCard } from './components/index'
import { mpAutoUpdate } from  './common/utils.js'
import './app.less'
// import 'taro-ui-vue3/dist/style/index.scss'



const App = createApp({

  onShow(options) {
    console.log(options)
    mpAutoUpdate()
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

const tuv3 = createUI()
App.use(tuv3)

App.component(NavBar.name, NavBar)
App.component(Contact.name, Contact)
App.component(ListContent.name, ListContent)
App.component(ListRescueCard.name, ListRescueCard)
App.component(ShowArticle.name, ShowArticle)

export default App
