/*
 * @Author: your name
 * @Date: 2021-11-13 11:01:17
 * @LastEditTime: 2021-11-13 11:56:04
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /mp-bbhj/src/app.config.ts
 */
export default {
  pages: [
    'pages/index/index',
    'pages/index/query/index',
    'pages/index/create/index',
    'pages/rescue/index',
    'pages/me/index/index',
    'pages/me/thank/index',
    'pages/me/history/index',
    'pages/me/follow/index',
    'pages/me/customer-service/index'
  ],
  "pageAlias": {
    "pages/lost/create/index": "pages/index/create/index",
    "pages/index/xx": "pages/index/index",
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '宝贝回家',
    navigationBarTextStyle: 'black'
  },
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": 'imgs/tabs/home.png',
      "selectedIconPath": 'imgs/tabs/home_selected.png'
    }, {
      "pagePath": "pages/rescue/index",
      "text": "救助站",
      "iconPath": 'imgs/tabs/doc.png',
      "selectedIconPath": 'imgs/tabs/doc_selected.png'
    }, {
      "pagePath": "pages/me/index/index",
      "text": "我的",
      "iconPath": 'imgs/tabs/me.png',
      "selectedIconPath": 'imgs/tabs/me_selected.png'
    }]
  },
  "debug": false,
}
