<script>
import { weixinUpdate } from '@/utils/update'
import { weixinSetting } from '@/api/weixin'
import {
  weixinlogin,
  weixincodelogin,
  weixinLoginScene

} from './api/store'

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
      userInfo: {},
      loginInfo: {}, // 用户登录信息
      profile: {},
      prams: {}
    }
  },
  onLaunch (launch) {
    console.log('app launch scene info: ', launch.scene, launch.path, launch.shareTicket)
    // var vm = this

    mpvue.login({
      success: function (res) {
        if (res.code) {
          weixincodelogin(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    let user = mpvue.getStorageSync('user')
    let parms = {
      openid: user.openid,
      scene: launch.scene,
      path: launch.path,
      shareTicket: launch.shareTicket
    }

    weixinLoginScene(parms)
    // <!--广告开始-->
    // 在页面中定义插屏广告
    let interstitialAd = null

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-1a35266b79a02a85'
      })
    }

    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
    // <!--广告结束-->

    // vm.prams.code = res.code
    // vm.prams.scene = launch.scene
    // vm.prams.shareTicket = launch.shareTicket
    // vm.prams.path = launch.path
    // vm.$get('/lastest/wechatapi/user/login', vm.prams).then((userProfile) => {
    //   wx.setStorageSync('profile', userProfile.data)
    // })
    //
    // // console.log('profile=======', wx.getStorageSync('profile'))
  },
  onPageNotFound () {
    wx.redirectTo({
      url: '/pages/home/main'
    })
  },
  created () {
    var userInfo = {} // 微信用户信息
    var loginInfo = {} // 用户登录信息

    console.log('app created, NODE_ENV:', process.env.NODE_ENV, process.env)

    console.log('------', wx.getAccountInfoSync())

    // 填写自己的鉴权服务器地址
    var wecosSignatureUrl = process.env.BaseUrl + '/lastest/wechatapi/qcloud/wecos/auth'
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
          console.log('----network----', res)
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

    weixinSetting()
    console.log('weixin setting: ', mpvue.getStorageSync('setting'))
    let setting = mpvue.getStorageSync('setting')

    // 获取用户经纬度
    if (setting.userLocation) {
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
    if (setting.userInfo) {
      wx.getUserInfo({
        success: (res) => {
          try {
            userInfo = res.userInfo
            console.log('-----userinfo', userInfo)
            wx.setStorageSync('userInfo', res.userInfo)
            // wx.checkSession({
            //   success: function () {
            //     console.log('session_key 未过期，并且在本生命周期一直有效')
            //   },
            //   fail: function () {
            //     console.log('登录中...')
            //
            //   }
            // })
            wx.login({
              success: function (res) {
                if (res.code) {
                  let data = {
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
                  }

                  weixinlogin(data)
                  console.log('====over!!!')

                  wx.showToast({
                    title: '公益时长 +3',
                    icon: 'success',
                    duration: 2000
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
  }
}
</script>


<style scoped>
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
