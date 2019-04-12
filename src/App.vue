
<script>
import { weixinUpdate } from '@/utils/update'

export default {
  // 调用API从本地缓存中获取数据
  /*
   * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
   * 微信：mpvue === wx, mpvuePlatform === 'wx'
   * 头条：mpvue === tt, mpvuePlatform === 'tt'
   * 百度：mpvue === swan, mpvuePlatform === 'swan'
   * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
   */

  data () {
    return {
      env: 'test',
      domain: 'https://mina.baobeihuijia.com',
      userInfo: {},
      loginInfo: {}, // 用户登录信息
      profile: {},
      prams: {}
    }
  },
  onLaunch (launch) {
    console.log('app launch scene info: ', launch.scene, launch.path, launch.shareTicket)

    var vm = this
    wx.login({
      success: function (res) {
        if (res.code) {
          vm.prams.code = res.code
          vm.prams.scene = launch.scene
          vm.prams.shareTicket = launch.shareTicket
          vm.prams.path = launch.path
          vm.$get('/lastest/wechatapi/user/login', vm.prams).then((userProfile) => {
            wx.setStorageSync('profile', userProfile.data)
          })
          console.log('profile=======', wx.getStorageSync('profile'))
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
    if (wx.getStorageSync('env') !== 'prod') {
      wx.setNavigationBarTitle({
        title: '宝贝回家-体验版'
      })
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
            wx.login({
              success: function (res) {
                if (res.code) {
                  wx.request({
                    url: wx.getStorageSync('domain') + '/lastest/wechatapi/small/user/login',
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
            // var data = {
            //   openid: vm.profile.Openid,
            //   platform: loginInfo['platform'],
            //   system: loginInfo['system'],
            //   brand: loginInfo['brand'],
            //   pmodel: loginInfo['pmodel'],
            //   networkType: loginInfo['networkType'],
            //   longitude: loginInfo['longitude'],
            //   latitude: loginInfo['latitude'],
            //   nickName: userInfo.nickName,
            //   avatarUrl: userInfo.avatarUrl,
            //   // 性别 0：未知、1：男、2：女
            //   gender: userInfo.gender,
            //   country: userInfo.country,
            //   province: userInfo.province,
            //   city: userInfo.city,
            //   language: userInfo.language
            // }
            // vm.$get('/lastest/wechatapi/small/user/updateUserInfo', data).then((res) => {
            //   // var obj = JSON.parse(res.data)
            //   var obj = res.data || '{}'
            //   obj = JSON.parse(obj)
            //   console.log('wechat login: ', typeof (res.data), res)
            //   wx.setStorageSync('minaAuth', obj)
            //   var ss = wx.getStorageSync('minaAuth')
            //   wx.setStorageSync('wecosUrl', ss.weCosUrl)
            //   console.log('access_token is:', ss)
            //   wx.showToast({
            //     title: '公益时长 +3',
            //     icon: 'success',
            //     duration: 2000
            //     // success: () => { console.log('showToast was called') }
            //   })
            // }).catch((err) => {
            //   console.log('updateUserInfo Error!!!!!!!!!!!', err)
            // })
          } catch (e) {
            console.log('setUserInfo failed App.vue')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
  @import 'App';
</style>
