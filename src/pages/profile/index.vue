<template>
  <div class="page">

    <div class="userinfo">
      <div v-if="setting.userInfo" class="userinfo-avatar" @click="openUrl('/pages/privilege/main')">
        <image class="img" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
      </div>
      <div v-if="setting.userInfo">
        <div class="userinfo-cont">
          <div class="text-name">{{ userInfo.nickName }}</div>
        </div>
      </div>
      <div v-else>
        <button class="userlogin" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">登录</button>
      </div>
    </div>



    <div class="kind-list">
      <div v-for="(item, index) in kindlist" :key="index">
        <div class="weui-flex kind-list__item" @click="openUrl(item.page)">
          <img class="kind-list__img" :src="item.icon">
          <div class="kind-list__item-hd" >{{item.name}}</div>
          <img class="kind-list__img_right" :src="'/static/images/big.png'">
        </div>
      </div>
    </div>

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
      user: wx.getStorageSync('user'),
      setting: wx.getStorageSync('setting'),
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
          page: '/pages/customerservice/main'
        },
        {
          name: '版本',
          icon: '/static/images/feedback.png',
          page: '/pages/feedback/main'
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
      title: '',
      path: '/pages/profile/main',
      imageUrl: '/static/images/forward/home2.jpg'
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
          that.setting.userInfo = res.authSetting['scope.userInfo']
        }
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
