/**
 * 配置参考：https://wechat-miniprogram.github.io/kbone/docs/config/
 */

module.exports = {
    origin: 'https://mina.baobeihuijia.com',
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
            '/detail/:id',
        ],
    },
    redirect: {
        notFound: 'home',
        accessDenied: 'home',
    },
    generate: {
        autoBuildNpm: 'npm',
  		tabBar: {
			color: '#333',
            selectedColor: '#EF4431',
            backgroundColor: '#ffffff',
            list: [{
                pageName: 'home',
                text: '主页',
	            iconPath: './imgs/tabs/home.png',
                selectedIconPath: './imgs/tabs/home_selected.png'
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
    },
    pages: {},
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
