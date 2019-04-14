<template>
  <div class="page">
    <div class="userinfo">
      <div v-if="authSetting.userInfo" class="userinfo-avatar" @click="openUrl('index')">
        <image class="img" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
      </div>
      <div v-if="authSetting.userInfo">
        <div class="userinfo-cont">
          <div class="text-name">{{ userInfo.nickName }}</div>
        </div>
      </div>
      <div v-else>
        <button class="userlogin" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">登录</button>
      </div>
    </div>



      <div class="kind-list">
        <div class="kind-list__item">
          <img class="kind-list__img" :src="'/static/images/history.png'">
          <div class="kind-list__item-hd" @click="openUrl('index')">我的发布</div>
        </div>



        <div>
        <img class="kind-list__img" :src="'/static/images/history.png'">
        <div class="weui-flex,kind-list__item-hd" @click="openUrl('index')">我的关注</div>
        </div>

        <div>
        <img class="kind-list__img" :src="'/static/images/history.png'">
        <div class="weui-flex,kind-list__item-hd" @click="openUrl('index')">救助站</div>
        </div>

        <div class="kind-list__item">
          <img class="kind-list__img" :src="'/static/images/customer_service.png'">
          <div class="wkind-list__item-hd" @click="openUrl('index')">客服</div>
        </div>

        <div class="kind-list__item">
          <img class="kind-list__img" :src="'/static/images/feedback.png'">
          <div class="kind-list__item-hd" @click="openUrl('index')">反馈</div>
        </div>

        <div class="kind-list__item">
          <img class="kind-list__img" :src="'/static/images/setting.png'">
          <div class="kind-list__item-hd" @click="openUrl('setting')">设置</div>
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
      authSetting: {
        userInfo: wx.getStorageSync('authSetting.userInfo')
      },
      list: [
        {
          id: 'feedback',
          name: '操作反馈',
          open: false,
          pages: ['actionsheet', 'dialog', 'msg', 'picker', 'toast']
        },
        {
          id: 'nav',
          name: '设置',
          open: false,
          pages: ['navbar', 'tabbar']
        }
      ]
    }
  },
  onLoad: function (options) {
    mpvue.setNavigationBarTitle({
      title: '我的帐户',
      success: function (res) {
      }
    })
    console.log('===test_mc onLoad======:')
    console.log('test_mc====onLoad() authSetting.userInfo =', this.authSetting.userInfo)
    console.log('test_mc====onLoad() userInfo =', this.userInfo)
  },
  onShareAppMessage: function () {
    return {
      title: '公益项目',
      path: '/pages/profile/main?from=forward',
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
        wx.openSetting({})
        return
      }
      wx.navigateTo({
        url: '/pages/' + page + '/main?id=1'
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
        url: '/pages/list/main'
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
