<template>
  <div class="page">
      <div class="after-userifo">
        <div class="weui-head">
          <p class="title">联系我们</p>
          <img src="/static/images/forward/home1.jpg" alt="" class="bbhj_img"> 
        </div>
        <div class="weui-info">
          <div class="weui-item" style="-webkit-user-select:text">官方网站: <p class="weui-p" style='display: inline'>www.baobeihuijia.com</p></div>
          <div class="weui-item" style="-webkit-user-select:text">咨询信箱: <p class="weui-p" style='display: inline'>baobeihuijia@yeah.net</p></div>
          <div class="weui-item" style="-webkit-user-select:text">QQ接待群: <p class="weui-p" style='display: inline'>1840533</p></div>
          <!-- <div class="weui-item" style="-webkit-user-select:text" bindcontact="handleContact"><img class= "cust_service" src="/static/images/customer_service.png">在线客服 <p class="weui-p" style='display: inline'></p></div> -->
          <!-- <button open-type="contact" bindcontact="handleContact" class="weui-item">在线客服</button> -->
          <button class="weui-item" style="-webkit-user-select:text" open-type="contact" 
          bindcontact="handleContact"><img class= "cust_service" src="/static/images/customer_service.png">
          在线客服 <p class="weui-p" style='display: inline'></p></button>
          <div class="weui-item">
            <p style="margin-left:80rpx">站务电话</p> <br>
            <div class="weui-phone" @click="tel">
              <img src="/static/images/phone.png" class="phone_img" alt="">
              0435-3338090</div>
          </div>
        </div>
      </div>
      <!-- weui-cells end -->

      <!-- <button open-type="contact" bindcontact="handleContact" class="btn">在线客服</button> -->

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
