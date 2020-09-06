/**
 * 配置参考：https://wechat-miniprogram.github.io/kbone/docs/config/
 */

module.exports = {
    // file: src/api/commont.js
    // 接口请求地址示例：//mina.baobeihuijia.com/release/mina/v1/lost/list
    origin: 'https://studygolang.com',
    // origin: 'https://scf.baobeihuijia.com/release',
    entry: '/',
    router: {
        home: [
            '/(home|index)?',
            '/index.html',
            '/test/(home|index)',
        ],
        other: [
            '/test/list/:id',
            '/test/detail/:id',
        ],
        me: [
            '/list/:id',
        ],
        doc: [
            '/doc/index',
        ],
        docDetail: [
            '/doc/detail/:id',
        ],
        article: [
            '/article/:id',
            '/article/:id?',
        ],
    },
    redirect: {
        notFound: 'home',
        accessDenied: 'home',
    },
    generate: {
        autoBuildNpm: 'npm',
  		tabBar: {
			color: '#7F8389',
            selectedColor: '#59BF74',
            backgroundColor: '#ffffff',
            list: [{
                pageName: 'home',
                text: '主页',
	            iconPath: './imgs/tabs/home.png',
                selectedIconPath: './imgs/tabs/home_selected.png'
            }, {
                pageName: 'doc',
                text: '文档',
                iconPath: './imgs/tabs/doc.png',
                selectedIconPath: './imgs/tabs/doc_selected.png'
            }, {
                pageName: 'me',
                text: '我的',
                iconPath: './imgs/tabs/me.png',
                selectedIconPath: './imgs/tabs/me_selected.png'
            }],
        },
    },
    app: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '宝贝回家',
        navigationBarTextStyle: 'black'
    },
    appExtraConfig: {
        sitemapLocation: 'sitemap.json',
    },
    global: {
        share: true,
        windowScroll: false,
        backgroundColor: '#F7F7F7',
        reachBottom: true,
    },
    pages: {
        home: {
            enablePullDownRefresh: true,
            pullDownRefresh: true,
        },
    },
    optimization: {
		domSubTreeLevel: 10,

		elementMultiplexing: true,
		textMultiplexing: true,
		commentMultiplexing: true,
		domExtendMultiplexing: true,

		styleValueReduce: 5000,
		attrValueReduce: 5000,
	},
    projectConfig: {
        projectname: 'mina',
        appid: 'wxc4e11081e3d5bdf7',
    },
}
