<template>
  <div class="container" @click="">
    <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">微信登录</button>
    <button open-type="contact">进入客服会话</button>

    <vfooter></vfooter>
  </div>
</template>

<script>
import card from '@/components/card'
import vfooter from '@/pages/footer'
export default {
  components: {
    vfooter,
    card
  },
  data () {
    return {
      userInfo: wx.getStorageSync('userInfo'),
      systemInfo: {},
      networkType: '',
      userLocation: wx.getStorageSync('userLocation')
    }
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: function (res) {
          console.log('login====', wx.getStorageSync('userInfo'))
          if (res.code) {
            wx.request({
              url: wx.getStorageSync('requestUrl') + '/small/user/login',
              method: 'POST',
              data: {
                code: res.code,
                longitude: wx.getStorageSync('userLocation').longitude,
                latitude: wx.getStorageSync('userLocation').latitude,
                phone_network: wx.getStorageSync('networkType'),
                phone_brand: wx.getStorageSync('systemInfo').brand,
                phone_model: wx.getStorageSync('systemInfo').model,
                userInfo: JSON.stringify(wx.getStorageSync('userInfo'))
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res.data)
              }
            })
          }
        }
      })
      let flag = false
      if (flag) {
        wx.reLaunch({
          url: '/pages/home/main'
        })
      }
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)

    wx.switchTab({
      url: '/pages/home/main'
    })
  },
  created () {
    // 获取系统信息
    wx.getSetting({
      success: function (res) {
        console.log(res.authSetting)
      }
    })
  }
}
</script>


<style>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  margin-top: 20rpx;
  font-size: 38rpx;
  color: #aaa;
}
</style>
