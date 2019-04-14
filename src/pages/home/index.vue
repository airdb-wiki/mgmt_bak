<template>
  <div class="bh-profile-page">
    <!-- 自定义navigation -->
    <div class="profile-page-main">
      11111111
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <img src="/static/images/heart.png" alt="">
            <div class="weui-label">爱心接力</div>
            <p>15次</p>
          </div>
          <!-- <div class="weui-cell__ft weui-cell__ft_in-access"></div> -->
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <img src="/static/images/clock.png" alt="">
            <div class="weui-label">公益时长</div>
            <p>102小时</p>
          </div>
          <!-- <div class="weui-cell__ft weui-cell__ft_in-access"></div> -->
        </div>
        <div class="weui-cell" @click="naviTo">
          <div class="weui-cell__bd">
            <img src="/static/images/bell.png" alt="">
            <div class="weui-label">我的消息</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>

      <div class="after-userifo">
        <div class="weui-cell title">
          <div class="weui-label-contract">联系我们</div>
        </div>
        <div class="weui-info">
          <div class="weui-item" style="-webkit-user-select:text">官方网站: <p class="weui-p" style='display: inline'>www.baobeihuijia.com</p></div>
          <div class="weui-item" style="-webkit-user-select:text">咨询信箱: <p class="weui-p" style='display: inline'>baobeihuijia@yeah.net</p></div>
          <div class="weui-item">站务电话: <p class="weui-phone" style='display: inline' @click="tel">0435-3338090</p></div>
          <div class="weui-item" style="-webkit-user-select:text">QQ接待群: <p class="weui-p" style='display: inline'>1840533</p></div>
        </div>
      </div>
      <!-- weui-cells end -->

    </div>
    <!-- profile-page-main end -->
    <!-- 右下角加号新建 -->
    <!-- <button open-type="contact" session-from="weixin-baobeihuijia">
      <img src="/static/images/CustomerService.png" class="btn-post">
    </button> -->
    <vfooter></vfooter>


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
      }
    }
  },
  onLoad: function () {
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
    }
  },
  created () {
  }
}
</script>


<style scoped lang='less'>
  @import 'index';
</style>
