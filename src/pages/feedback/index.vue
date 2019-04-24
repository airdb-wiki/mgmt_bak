<template>
  <div class="page">

    <div>
      运行环境: {{env}}
    </div>

    <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">phone</button>

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
      env: process.env.NODE_ENV,
      isActive: 0,
      servicetime: 10,
      isVolunteer: false,
      userInfo: wx.getStorageSync('userInfo'),
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
    getPhoneNumber (e) {
      console.log(e.detail.errMsg)
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
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
