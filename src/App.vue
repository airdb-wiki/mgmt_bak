
<script>
import { weixinUpdate } from '@/utils/update'

export default {
  data () {
    return {
      env: 'test',
      domain: 'https://wechat.baobeihuijia.com',
      userInfo: {},
      loginInfo: {}, // 用户登录信息
      profile: {}
    }
  },
  onLaunch (launch) {
    console.log('app launch scene info: ', launch.scene, launch.path, launch.shareTicket)

    this.$get('/lastest/wechatapi/user/login', '').then((response) => {
      console.log('this.$get=====', response)
    })
    var vm = this
    wx.login({
      success: function (res) {
        if (res.code) {
          // wx.request({
          //   url: wx.getStorageSync('domain') + '/lastest/wechatapi/user/login',
          //   method: 'Get',
          //   header: {
          //     'content-type': 'application/json'
          //   },
          var data = {
            code: res.code,
            scene: launch.scene,
            shareTicket: launch.shareTicket,
            path: launch.path
          }
          //   success: function (userProfile) {
          //     wx.setStorageSync('profile', userProfile.data)
          //     console.log('===================newbg', userProfile)
          //   }
          // })
          vm.$get('/lastest/wechatapi/user/login', data).then((userProfile) => {
            wx.setStorageSync('profile', userProfile.data)
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
    wx.setStorageSync('env', this.env)
    wx.setStorageSync('domain', this.domain + '/' + this.env)
    var userInfo = {} // 微信用户信息
    var loginInfo = {} // 用户登录信息

    // console.log('=====',wxConfig.envVersion)
    // console.log(wxConfig.envVersion)
    console.log('app created, env:', wx.getStorageSync('env'))
    if (wx.getStorageSync('env') === 'prod') {
      // wx.setStorageSync('requestUrl', 'https://wechat.baobeihuijia.com/lastest/wechatapi')
    } else {
      wx.setNavigationBarTitle({
        title: '宝贝回家-体验版'
      })
      // wx.setStorageSync('requestUrl', 'https://wechat.baobeihuijia.com/test/lastest/wechatapi')
    }

    // 填写自己的鉴权服务器地址
    var wecosSignatureUrl = wx.getStorageSync('domain') + '/lastest/wechatapi/qcloud/wecos/auth'

    wx.setStorageSync('wecosSignatureUrl', wecosSignatureUrl)

    wx.setStorageSync('cdn', 'https://wechat-1251018873.file.myqcloud.com')

    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    weixinUpdate()

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
          } catch (e) {
            console.log('getLocation failed App.vue')
          }
        }
      })
    }
    let vm = this
    vm.profile = wx.getStorageSync('profile')

    // 获取用户信息
    if (wx.getStorageSync('authSetting.userInfo')) {
      wx.getUserInfo({
        success: (res) => {
          try {
            userInfo = res.userInfo
            console.log('-----profile', vm.profile.Openid)
            console.log('-----userinfo', userInfo)
            wx.setStorageSync('userInfo', res.userInfo)
            var data = {
              openid: vm.profile.Openid,
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
            }
            // console.log('666666666666666666666')
            vm.$get('/lastest/wechatapi/small/user/updateUserInfo', data).then((res) => {
              // var obj = JSON.parse(res.data)
              var obj = res.data || '{}'
              obj = JSON.parse(obj)
              console.log('wechat login: ', typeof (res.data), res)
              wx.setStorageSync('minaAuth', obj)
              var ss = wx.getStorageSync('minaAuth')
              wx.setStorageSync('wecosUrl', ss.weCosUrl)
              console.log('access_token is:', ss)
              wx.showToast({
                title: '公益时长 +3',
                icon: 'success',
                duration: 2000
                // success: () => { console.log('showToast was called') }
              })
            }).catch((err) => {
              console.log('updateUserInfo Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', err)
            })
          } catch (e) {
            console.log('setUserInfo failed App.vue')
          }
        }
      })
    }
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
