<template>
  <div class="bh-profile-page">
    <!-- 自定义navigation -->
    <navigation></navigation>
    <div class="profile-page-main">
      <div class="userinfo">
        <div class="userinfo-avatar" v-if="isLogin" @click="openSetting">
          <image class="img" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        </div>
        <div class="userinfo-avatar" v-else @click="openSetting">
          <image class="img" src="/static/images/user_active.png" background-size="cover" />
        </div>
        <div v-if="!isLogin">
          <button class="weui-btn" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">微信快速登录</button>
        </div>
        <div v-else>
          <div class="userinfo-cont">
            <div class="text-name">{{ userInfo.nickName }}</div>
            <div class="text-time" @click="">公益时长:{{servicetime}}小时 ></div>
          </div>
        </div>
        <div class="userinfo-volunt"><i class="icon-dot"></i>加入志愿者</i></div>
      </div>
      <!-- userinfo end -->
      
      <div class="after-userifo">
        <div class="weui-cell title">
          <div class="weui-label">我的服务</div>
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
            <div class="weui-label">修改信息</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-label">修改信息</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-label">修改信息</div>
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
      isLogin: true,
      servicetime: 10,
      userInfo: wx.getStorageSync('userInfo'),
      items: [{
        name: '家寻宝贝',
        src: '/static/images/mini-logo/1.png'
      }, {
        name: '宝贝寻家',
        src: '/static/images/mini-logo/2.png'
      }, {
        name: '救助寻亲',
        src: '/static/images/mini-logo/3.png'
      }, {
        name: '流浪乞讨',
        src: '/static/images/mini-logo/4.png'
      }, {
        name: '即时寻人',
        src: '/static/images/mini-logo/5.png'
      }, {
        name: '其他寻人',
        src: '/static/images/mini-logo/6.png'
      }]
    }
  },
  onLoad: function () {
    console.log('===test2 onload======:')
    // 检测用户是否授权
    wx.getSetting({
      success: (res) => {
        console.log('test === getSetting success', res)
        if (res['authSetting']['scope.userInfo']) this.isLogin = true
        else this.isLogin = false
      },
      fail: (res) => {
        console.log('test === getSetting fail', res)
      },
      complate: (res) => {
        console.log('test === getSetting complate')
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '公益项目',
      desc: '10岁丢失宝贝',
      path: '/pages/profile/main?from=forward'
    }
  },
  methods: {
    /* binddivTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    }, */
    onPostClick () {
      wx.navigateTo({
        url: '/pages/publish/main'
      })
    },
    openSetting () {
      console.log('test === openSetting')
      var that = this
      wx.openSetting({
        success: (res) => {
          if (!res.authSetting['scope.userInfo']) {
            that.isLogin = false
            console.log('test === openSetting isLogin=false')
          }
        }
      })
    },
    getUserInfo: function (e) {
      console.log('test === getUserInfo success', e.mp.detail.userInfo)
      this.isLogin = true
      if (!e.mp.detail.userInfo) {
        this.isLogin = false
        this.userInfo = e.mp.detail.userInfo
      }
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>


<style scoped>
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
    border-top: 0.5px solid #d9d9d9;
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
    border-left: 0.5px solid #d9d9d9;
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
    border-right: 0.5px solid #d9d9d9;
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
    border-bottom: 0.5px solid #d9d9d9;
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
  font-size: 36rpx;
  color: #aaa;
}
.userinfo-cont .text-name {
  margin-bottom: 10rpx;
  font-size: 32rpx;
  color: #fff;
}
.userinfo-cont .text-time {
  margin-bottom: 10rpx;
  font-size: 28rpx;
  color: #fff;
}
.userinfo-volunt {
  position: absolute;
  top: 200rpx;
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