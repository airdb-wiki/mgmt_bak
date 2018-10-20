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
            <div class="text-time" @click="ClickServiceTime">公益时长: {{servicetime}}小时 ></div>
          </div>
        </div>
        <div v-else>
          <button class="weui-btn" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">微信快速登录</button>
        </div>
        <div class="userinfo-privilege" @click="ClickJoinVolunteer" v-if="!minaAuth.isVolunteer"><i class="icon-dot"></i>加入志愿者</i></div>
        <div class="userinfo-privilege" @click="ClickMyPrivilege" v-else>我的特权></div>
      </div>
      <!-- userinfo end -->
      
      <div class="after-userifo">
        <div class="weui-cell title">
          <div class="weui-label">登记信息</div>
        </div>
        <div class="weui-grids">
          <div class="weui-grid" v-for="(item, index) in items" :key="index">
            <navigator :url="item.url">
              <div class='weui-grid__bg'>
                <div class="weui-grid__icon">
                    <image :src="item.src"/>
                </div>
                <text class="weui-grid__label">{{item.name}}</text>
              </div>
            </navigator>
          </div>
        </div>
      </div>
      <!-- after-userifo end -->

      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-label">我的保存</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-label">我的发布</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-label">我的关注</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
      <!-- weui-cells end -->

    </div>
    <!-- profile-page-main end -->

    <!-- 右下角加号新建 -->
    <img src="/static/images/addition_fill.png" class="btn-post" @click="onPostClick"/>
    <div class="profile-page-footer">
      <vfooter></vfooter>
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
      servicetime: 10,
      minaAuth: wx.getStorageSync('minaAuth'),
      isVolunteer: false,
      userInfo: wx.getStorageSync('userInfo'),
      authSetting: {
        userInfo: wx.getStorageSync('authSetting.userInfo')
      },
      items: [{
        name: '家寻宝贝',
        src: '/static/images/mini-logo/1.png',
        url: '/pages/publish/main'
      }, {
        name: '宝贝寻家',
        src: '/static/images/mini-logo/2.png',
        url: '/pages/publish/main'
      }, {
        name: '救助寻亲',
        src: '/static/images/mini-logo/3.png',
        url: '/pages/publish/main'
      }, {
        name: '流浪乞讨',
        src: '/static/images/mini-logo/4.png',
        url: '/pages/publish/main'
      }, {
        name: '即时寻人',
        src: '/static/images/mini-logo/5.png',
        url: '/pages/publish/main'
      }, {
        name: '其他寻人',
        src: '/static/images/mini-logo/6.png',
        url: '/pages/publish/main'
      }]
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
    // 点击志愿时长
    ClickServiceTime: function () {
      wx.navigateTo({
        url: '/pages/test_mc/serviceTime/main'
      })
    },
    ClickJoinVolunteer: function () {
      wx.navigateTo({
        url: '/pages/volunteer/main'
      })
    },
    ClickMyPrivilege: function () {
      wx.navigateTo({
        url: '/pages/test_mc/myPrivilege/main'
      })
    }
  },
  created () {
  }
}
</script>


<style scoped>
.userinfo-privilege {
  position:absolute;
  top:40%;
  right:0;
  width:145rpx;
  height:50rpx;
  background:#FFCC00;
  color:#fff;
  border-top-left-radius:25rpx;
  border-bottom-left-radius:25rpx;
  padding:0 0 0 20rpx;
}
.after-userifo .title{
  border-top: 0.5px solid #d9d9d9;
  border-left: 0.5px solid #d9d9d9;
  border-right: 0.5px solid #d9d9d9;
}
.weui-cells{
  margin-top: 10px;
}
.after-userifo{
  background: #fff;
}
.weui-grids {
    position: relative;
    overflow: hidden;
}
.weui-grids:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 0.2rpx solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
} 
.weui-grids:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-left: 0.2rpx solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
} 
.weui-grid {
    position: relative;
    float: left;
    padding: 20px 10px;
    width: 33.33333333%;
    box-sizing: border-box;
}
.weui-grid:before {
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 0.2rpx solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
} 
.weui-grid:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 0.2px solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
} 
.weui-grid:active {
    background-color: #ECECEC;
}  
.weui-grid__bg {
    position: relative;
    float: left;
    padding: 0px 0px;
    width: 100%;
    box-sizing: border-box;
}
.weui-grid__icon {
    width: 32px;
    height: 32px;
    margin: 0 auto;
}
.weui-grid__icon image {
    display: block;
    width: 100%;
    height: 100%;
}
.weui-grid__icon + .weui-grid__label {
    margin-top: 5px;
}
.weui-grid__label {
    display: block;
    text-align: center;
    font-weight: bold;
    color: #000;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.userinfo {
  display: flex;
  position:relative;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20rpx;
  border-bottom: 1px solid #d9d9d9;
  background: #f35336;
  min-height: 250rpx;
}
.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
  overflow: hidden;
  background: #ccc;
}
.userinfo-avatar .img,
.userinfo-avatar image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.userinfo-cont {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 20rpx;
  color: #aaa;
}
.userinfo-cont .text-name {
  margin-bottom:10rpx;
  font-size:38rpx;
  color:#fff;
  width:250rpx;
  overflow:hidden;
  height:50rpx;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.userinfo-cont .text-time {
  margin-bottom: 10rpx;
  font-size: 24rpx;
  color: #fff;
}
.userinfo-volunt {
  position: absolute;
  top: 50rpx;
  right: 20rpx;
  color: #fff;
}
.userinfo-volunt .icon-dot {
  display: inline-block;
  vertical-align: 3rpx;
  width: 16rpx;
  height: 16rpx;
  margin-right: 6rpx;
  border-radius: 100%;
  background: #fff;
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
.profile-page-footer {
  box-sizing: border-box;
  flex: 0 0 auto;
  padding-top: 30rpx;
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