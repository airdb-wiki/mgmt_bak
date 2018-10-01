
<script>
export default {
  created () {
    var env = 'test'
    wx.setStorageSync('env', env)

    if (wx.getStorageSync('env') === 'prod') {
      wx.setStorageSync('requestUrl', 'https://bbs.baobeihuijia.com/lastest/wechatapi')
    } else {
      wx.setNavigationBarTitle({
        title: '宝贝回家-体验版'
      })
      wx.setStorageSync('requestUrl', 'https://wechat.baobeihuijia.com/lastest/wechatapi')
    }

    // 填写自己的鉴权服务器地址
    var wecosSignatureUrl = wx.getStorageSync('requestUrl') + '/qcloud/wecos/auth'

    wx.setStorageSync('wecosSignatureUrl', wecosSignatureUrl)

    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登陆后隐藏登陆页
    wx.getSetting({
      success: res => {
        // console.log(res)
        console.log(res.authSetting['scope.userInfo'])
        wx.setStorageSync('authSetting.userInfo', res.authSetting['scope.userInfo'])
        wx.setStorageSync('authSetting.userLocation', res.authSetting['scope.userLocation'])
        wx.setStorageSync('authSetting.address', res.authSetting['scope.address'])
        wx.setStorageSync('authSetting.invoiceTitle', res.authSetting['scope.invoiceTitle'])
        wx.setStorageSync('authSetting.werun', res.authSetting['scope.werun'])
        wx.setStorageSync('authSetting.record', res.authSetting['scope.record'])
        wx.setStorageSync('authSetting.writePhotosAlbum', res.authSetting['scope.writePhotosAlbum'])
        wx.setStorageSync('authSetting.camera', res.authSetting['scope.camera'])
      }
    })

    // 用户信息
    wx.getUserInfo({
      success: (res) => {
        try {
          wx.setStorageSync('userInfo', res.userInfo)
        } catch (e) {
          console.log('setUserInfo failed App.vue')
        }
        this.userInfo = res.userInfo
        console.log('getUserInfo', res.userInfo)
      }
    })

    var loginInfo = {}
    // 用户网络类型
    wx.getNetworkType({
      success: function (res) {
        try {
          loginInfo['networkType'] = res.networkType
          wx.setStorageSync('networkType', res.networkType)
        } catch (e) {
          console.log('getNetworkType failed App.vue')
        }
      }
    })

    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        try {
          loginInfo['platform'] = res.platform
          loginInfo['brand'] = res.brand
          loginInfo['pmodel'] = res.model
          wx.setStorageSync('systemInfo', res)
        } catch (e) {
          console.log('getSystemInfo failed App.vue')
        }
      }
    })

    // 获取用户经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        try {
          loginInfo['longitude'] = res.longitude
          loginInfo['latitude'] = res.latitude
          wx.setStorageSync('userLocation', res)
        } catch (e) {
          console.log('getSystemInfo failed App.vue')
        }
      }
    })

    wx.request({
      url: wx.getStorageSync('requestUrl') + '/small/config',
      method: 'GET',
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('get config: ', res.data.WeCosUrl)
        wx.setStorageSync('wecosUrl', res.data.WeCosUrl)
      }
    })

    console.log('app created, env:', wx.getStorageSync('env'))
    console.log('cache logs by setStorageSync')

    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: wx.getStorageSync('requestUrl') + '/small/user/login',
            method: 'POST',
            data: {
              code: res.code,
              loginInfo: JSON.stringify(loginInfo),
              userInfo: JSON.stringify(wx.getStorageSync('userInfo'))
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var obj = JSON.parse(res.data)
              console.log('wechat login: ', obj)
              loginInfo['openid'] = obj.openid
              loginInfo['unionid'] = obj.unionid
              console.log('-----', loginInfo)
              wx.setStorageSync('loginInfo', loginInfo)
              console.log('loginInfo add openid', wx.getStorageSync('loginInfo'))
            }
          })
        }
      }
    })
  }
}
</script>

<style>

html, body {
  background: #efeff4;

}
page {
  background: #efeff4;
  font-size: 30rpx;
  color: #353535; 
}

.page__hd {
  height: 80rpx;
}
.page__title {
  padding: 0 30rpx;
  line-height: 80rpx;
}
.weui-cells {
  margin-bottom: 12rpx;
}
.bh-article-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.bh-article-row .bh-article-group:not(:fist-child) {
  margin-left: 50rpx;
}
.bh-article-group {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 10rpx;
}
.bh-article-group__label {
  flex: 0 0 auto;
  width: 130rpx;
  text-align: right;
  color: #777;
}
.bh-article-group__cont {
  flex: 1 1 auto;
  padding-left: 15rpx;
}

.post-panel {
  margin-top: 20rpx;
  background: #fff;
}
.post-panel__hd {
  position: relative;
  height: 80rpx;
  padding: 0 20rpx;
  border-bottom: 1px solid #f5f5f5;
}
.post-panel__title {
  font-size: 34rpx;
  line-height: 80rpx;
  color: #000;
}
.post-panel__bd {
  box-sizing: border-box;
  padding: 0 20rpx 20rpx;
}
.post-panel__ft {
  height: 80rpx;
  border-top: 1px solid #f5f5f5;
  text-align: center;

}
.post-panel__hd .btn-more {
  position: absolute;
  top: 0;
  right: 20rpx;
  line-height: 80rpx;
  color: #aaa;

}

.post-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: top;
}

.post-item {
  box-sizing: border-box;
  flex: 0 0 auto;
  width: 49%;
  padding: 24rpx 0 12rpx;
}

.post-item:nth-child(2n) {
  margin-left: 2%;
}

.post-item__pic {
  overflow: hidden;
  background: #ccc;
  height: 200rpx;
}
.post-item__pic img,
.post-item__pic image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.post-item__title {
  font-size: 28rpx;
  line-height: 2.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.post-item__desc {
  font-size: 24rpx;
}

.fn-align-center {
  text-align: center;
}


.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
