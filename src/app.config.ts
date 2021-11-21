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
    'pages/rescue/index',
    'pages/article/detail/index',
    'pages/me/index/index',
    'pages/me/thank/index',
    'pages/me/history/index',
    'pages/me/follow/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '宝贝回家',
    navigationBarTextStyle: 'black'
  },
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/rescue/index",
      "text": "救助站"
    }, {
      "pagePath": "pages/me/index/index",
      "text": "我的"
    }]
  },
  "debug": false,
}
