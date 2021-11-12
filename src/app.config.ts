export default {
  pages: [
    'pages/index/index',
    'pages/rescue/index',
    'pages/me/index',
    'pages/article/detail/index',
    'pages/mine/thank/index',
    'pages/mine/history/index',
    'pages/mine/follow/index'
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
      "pagePath": "pages/me/index",
      "text": "我的"
    }]
  },
  "quickMenu": {
    "share": true,
    "favorite": true,
    "sendToDesktop": true
  },
  "debug": false,
  "pageAlias": {
    "index": "pages/index/index",
    "me": "pages/me/index"
  }
}
