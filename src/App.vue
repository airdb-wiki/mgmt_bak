
<script>
var QQMapWX = require('../static/qqmap-wx-jssdk.min.js')
export default {
  onLaunch (launch) {
    console.log('app launch scene info: ', launch.scene, launch.path, launch.shareTicket)
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://wechat.baobeihuijia.com/dev/lastest/wechatapi/wechat/login',
            method: 'Get',
            header: {
              'content-type': 'application/json'
            },
            data: {
              code: res.code,
              scene: launch.scene,
              shareTicket: launch.shareTicket,
              path: launch.path
            },
            success: function (res) {
              console.log('xxxx')
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onPageNotFound () {
    wx.redirectTo({
      url: '/pages/home/main'
    })
  },
  created () {
    var env = 'test'
    var userInfo = {} // 微信用户信息
    var loginInfo = {} // 用户登录信息

    wx.setStorageSync('env', env)
    // console.log(wxConfig.envVersion)
    console.log('app created, env:', wx.getStorageSync('env'))

    if (wx.getStorageSync('env') === 'prod') {
      wx.setStorageSync('requestUrl', 'https://wechat.baobeihuijia.com/lastest/wechatapi')
    } else {
      wx.setNavigationBarTitle({
        title: '宝贝回家-体验版'
      })
      wx.setStorageSync('requestUrl', 'https://wechat.baobeihuijia.com/test/lastest/wechatapi')
    }

    // 填写自己的鉴权服务器地址
    var wecosSignatureUrl = wx.getStorageSync('requestUrl') + '/qcloud/wecos/auth'

    wx.setStorageSync('wecosSignatureUrl', wecosSignatureUrl)

    wx.setStorageSync('cdn', 'https://wechat-1251018873.file.myqcloud.com')

    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

    // 用户网络类型
    wx.getNetworkType({
      success: function (res) {
        try {
          loginInfo['networkType'] = res.networkType
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
          loginInfo['system'] = res.system
          wx.setStorageSync('systemInfo', res)
        } catch (e) {
          console.log('getSystemInfo failed App.vue')
        }
      }
    })

    // 获取微信授权信息
    wx.getSetting({
      success: res => {
        // console.log(res)
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

    // 获取用户经纬度
    if (wx.getStorageSync('authSetting.userLocation')) {
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          try {
            loginInfo['longitude'] = res.longitude
            loginInfo['latitude'] = res.latitude
            wx.setStorageSync('userLocation', res)

            // 获取用户的地理位置
            var qqmapsdk = new QQMapWX({
              key: 'F6JBZ-3NM33-LDK3V-3TWWM-KC2N6-WZBCW'
            })

            qqmapsdk.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success: function (addressRes) {
                var address = addressRes.result.ad_info.city
                console.log('position', addressRes.result.ad_info.city)
                wx.setStorageSync('address', address)
              },
              fail: function (e) {
                console.log('fail', e)
              }
            })
          } catch (e) {
            console.log('getLocation failed App.vue')
          }
        }
      })
    }

    // 获取用户信息
    if (wx.getStorageSync('authSetting.userInfo')) {
      wx.getUserInfo({
        success: (res) => {
          try {
            userInfo = res.userInfo
            wx.setStorageSync('userInfo', res.userInfo)
            wx.login({
              success: function (res) {
                if (res.code) {
                  wx.request({
                    url: wx.getStorageSync('requestUrl') + '/small/user/login',
                    method: 'POST',
                    header: {
                      'content-type': 'application/json'
                    },
                    data: {
                      code: res.code,
                      platform: loginInfo['platform'],
                      system: loginInfo['system'],
                      brand: loginInfo['brand'],
                      pmodel: loginInfo['pmodel'],
                      networkType: loginInfo['networkType'],
                      longitude: loginInfo['longitude'],
                      latitude: loginInfo['latitude'],
                      nickName: userInfo.nickName,
                      avatarUrl: userInfo.avatarUrl,
                      // 性别 0：未知、1：男、2：女
                      gender: userInfo.gender,
                      country: userInfo.country,
                      province: userInfo.province,
                      city: userInfo.city,
                      language: userInfo.language
                    },
                    success: function (res) {
                      var obj = JSON.parse(res.data)
                      console.log('wechat login: ', res.data)
                      wx.setStorageSync('minaAuth', obj)
                      var ss = wx.getStorageSync('minaAuth')
                      console.log('access_token is:', ss)
                      wx.showToast({
                        title: '公益时长 +3',
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  })
                }
              }
            })
          } catch (e) {
            console.log('setUserInfo failed App.vue')
          }
        }
      })
    }

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
