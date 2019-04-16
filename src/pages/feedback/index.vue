<template>
  <div class="page">

    用户反反馈

  </div>
</template>

<script>
import vfooter from '@/pages/footer'
import navigation from '@/components/navigation'
export default {
  components: {
    vfooter,
    navigation
  },
  data () {
    return {
      isActive: 0,
      servicetime: 10,
      minaAuth: wx.getStorageSync('minaAuth'),
      isVolunteer: false,
      userInfo: wx.getStorageSync('userInfo'),
      authSetting: {
        userInfo: wx.getStorageSync('authSetting.userInfo')
      },
      kindlist: [
        {
          name: '已发布',
          icon: '/static/images/product.png',
          page: '/pages/list/main'
        },
        {
          name: '已关注',
          icon: '/static/images/star.png',
          page: '/pages/volunteer/main'
        },
        {
          name: '收信箱',
          icon: '/static/images/message.png',
          page: '/pages/hr/main'
        },
        {
          name: '客服',
          icon: '/static/images/customer_service.png',
          page: '/pages/hr/main'
        },
        {
          name: '反馈',
          icon: '/static/images/feedback.png',
          page: '/pages/hr/main'
        },
        {
          name: '设置',
          icon: '/static/images/settings.png',
          page: 'setting'
        }
      ]
    }
  },
  onLoad: function (options) {
    console.log('===test_mc onLoad======:')
    console.log('test_mc====onLoad() authSetting.userInfo =', this.authSetting.userInfo)
    console.log('test_mc====onLoad() userInfo =', this.userInfo)
  },
  onShareAppMessage: function () {
    return {
      title: '公益项目',
      path: '/pages/user/profile/main?from=forward',
      imageUrl: '/static/images/home/vr.png'
    }
  },
  async onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  methods: {
    onPostClick () {
      wx.navigateTo({
        url: '/pages/publish/main'
      })
    },
    openUrl (page) {
      console.log('-----', page)
      if (page === 'setting') {
        mpvue.openSetting({})
        return
      }
      wx.navigateTo({
        url: page + '?wxid='
      })
    },
    openSetting () {
      var that = this
      wx.openSetting({
        success: (res) => {
          wx.setStorageSync('authSetting.userInfo', res.authSetting['scope.userInfo'])
          that.authSetting.userInfo = wx.getStorageSync('authSetting.userInfo')
          console.log('test_mc===openSetting() authSetting.userInfo =', that.authSetting.userInfo)
        }
      })
    },
    getUserInfo: function (e) {
      wx.setStorageSync('authSetting.userInfo', true)
      this.authSetting.userInfo = wx.getStorageSync('authSetting.userInfo')
      wx.setStorageSync('userInfo', e.mp.detail.userInfo)
      this.userInfo = wx.getStorageSync('userInfo')
      if (!e.mp.detail.userInfo) {
        wx.setStorageSync('authSetting.userInfo', false)
        this.authSetting.userInfo = wx.getStorageSync('authSetting.userInfo')
        wx.setStorageSync('userInfo', e.mp.detail.userInfo)
        this.userInfo = e.mp.detail.userInfo
      }
      console.log('test_mc===getUserInfo() userinfo =', e.mp.detail.userInfo)
      console.log('test_mc===getUserInfo() authSetting.userInfo =', this.authSetting.userInfo)
    },
    tel: function () {
      wx.makePhoneCall({
        phoneNumber: '0435-3338090'
      })
    },
    naviTo: function () {
      wx.navigateTo({
        url: '/pages/user/list/main'
      })
    },
    kindToggle (e) {
      var id = e.currentTarget.id
      var list = this.list
      for (var i = 0, len = list.length; i < len; ++i) {
        if (list[i].id === id) {
          list[i].open = !list[i].open
        } else {
          list[i].open = false
        }
      }
      this.list = list
    }
  },
  created () {
  }
}
</script>


<style scoped lang='less'>
  @import 'index';
</style>
