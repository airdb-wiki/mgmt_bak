<template>
  <div class="bh-profile-page">
    <!-- 自定义navigation -->
    <navigation></navigation>
    <div class="profile-page-main">
      <div class="userinfo">
        <div v-if="authSetting.userInfo" class="userinfo-avatar" @click="openSetting">
          <image class="img" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
        </div>
        <div v-else class="userinfo-avatar" @click="openSetting">
          <image class="img" src="/static/images/user_active.png" background-size="cover" />
        </div>
        <div v-if="authSetting.userInfo">
          <div class="userinfo-cont">
            <div class="text-name">{{ userInfo.nickName }}</div>
          </div>
        </div>
        <div v-else>
          <button class="weui-btn" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">微信快速登录</button>
        </div>
      </div>

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
        <div class="weui-cell">
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
    }
  },
  created () {
  }
}
</script>


<style scoped>
.after-userifo{
  background: #fff;
}
.weui-cells{
  margin-top: 0;
}
.weui-info{
  width: 100%;
  height: 300rpx;
  border: 0.2px solid #d9d9d9;
  font-size: 16px;
}
.weui-p{
  user-select:text;
  color:#576b95;
  font-size: 17px;
  font-weight: 400;
  /* font-weight:bold; */
}
.weui-item{
  margin-top: 17rpx;
  margin-left:40px;
  font-weight: 700;
}
.weui-phone{
  color:#576b95;;
  font-size: 17px;
  font-weight: 400;
}
.weui-cell__bd{
  display: flex;
  flex-direction: row; 
  align-items: center;
}     
.weui-cell__bd img{
  width: 45rpx;
  height: 45rpx;
}     
.weui-cell__bd p{
  color: #c2c4cc;
  margin-left: 290rpx;
  font-size: 15px;
}
.weui-label {
    color: #000;
    font-size: 16px;
    margin-left: 30rpx;
    font-family: Helvetica;
} 
.weui-label-contract{
  color: #000;
  font-size: 16px;
  /* margin-left: 30rpx; */
  font-family: Helvetica;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 300rpx;
  /* margin-bottom: 20rpx; */
  /* border-bottom: 1px solid #d9d9d9; */
  background: #fff;
  /* border-bottom: solid #d9d9d9 1px;  */
}
.userinfo-avatar {
  margin-top:30rpx;
}
.img
 {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
}
.userinfo-cont {
  color: #000;
  margin-bottom:10rpx;
  font-size:34rpx;
  font-family: Helvetica
}
.bh-profile-page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100%;
  background: #efeff4;
  margin: 0 0;
}
.profile-page-main {
  flex: 1 1 auto;
  margin-top: 70px;
}
.btn-post {
    float: right;
    position: fixed;
    bottom: 40rpx;
    right: 20rpx;  
    height: 120rpx;
    width: 120rpx;
}
</style>