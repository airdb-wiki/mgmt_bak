<template>
  <div class="test-page">

    <div class="navigation">
      <div @click="back">
        <img src="/static/images/home/back.png" class="back">
      </div>
    </div>
    <!-- navigation end -->

    <div class="test-page-main">
      <div class="user">
        <div v-if="authSetting.userInfo" class="user-avatar">
          <image class="img" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
        </div>
        <div v-else class="user-avatar">
          <image class="img" src="/static/images/user_active.png" background-size="cover" />
        </div>
        <!-- user-avatar end -->
        <div class="user-cont">
          <div class="text-name">我的专属特权</div>
          <div class="text-time">{{privilege}}/13</div>
        </div>
        <!-- user-cont end -->
      </div>
      <!-- user end -->

      <div class="after-user">
        <div class="weui-grids">
          <div class="weui-grid" v-for="(item, index) in items" :key="index">
            <navigator :url="item.url">
              <image :src="item.src" class="weui-grid__icon"/>
              <text class="weui-grid__label">{{item.name}}</text>
            </navigator>
          </div>
        </div>
        <!-- grids end -->
      </div>
      <!-- after-user end -->
    </div>
    <!-- test-page-main end -->
  </div>
</template>

<script>
import vfooter from '@/pages/footer'
export default{
  components: {
    vfooter
  },

  data () {
    return {
      userInfo: wx.getStorageSync('userInfo'),
      authSetting: {
        userInfo: wx.getStorageSync('authSetting.userInfo')
      },
      privilege: 0,
      items: [{
        name: '特权1',
        src: '/static/images/mini-logo/1.png'
      }, {
        name: '特权2',
        src: '/static/images/mini-logo/2.png'
      }, {
        name: '特权3',
        src: '/static/images/mini-logo/3.png'
      }, {
        name: '特权4',
        src: '/static/images/mini-logo/4.png'
      }, {
        name: '特权5',
        src: '/static/images/mini-logo/5.png'
      }, {
        name: '特权6',
        src: '/static/images/mini-logo/6.png'
      }, {
        name: '特权7',
        src: '/static/images/mini-logo/6.png'
      }, {
        name: '特权8',
        src: '/static/images/mini-logo/6.png'
      }, {
        name: '特权9',
        src: '/static/images/mini-logo/6.png'
      }, {
        name: '特权10',
        src: '/static/images/mini-logo/6.png'
      }, {
        name: '特权11',
        src: '/static/images/mini-logo/6.png'
      }]
    }
  },
  // data end

  methods: {
    back: function () {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  // methods end

  onShareAppMessage: function () {
    return {
      title: '您的公益时长为10小时',
      desc: '公益项目',
      path: '/pages/test_mc/myPrivilege/main?from=forward'
    }
  }
}
</script>

<style scope>
.weui-grids {
  border-top:0px;
  border-left:0rpx;
  border-bottom:1rpx solid #d9d9d9;
  overflow:hidden;
}
.weui-grid {
  position:relative;
  height:200rpx;
  float:left;
  padding:40rpx 20rpx;
  width:33.33333333%;
  border-right:0rpx;
  border-bottom:1rpx solid #d9d9d9;
}
.after-user {
  background: #fff;
}
.user-cont {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 20rpx;
  font-size: 36rpx;
  color: #aaa;
}
.user-cont .text-name {
  margin-bottom: 10rpx;
  font-size: 32rpx;
  color: #fff;
}
.user-cont .text-time {
  margin-bottom: 10rpx;
  font-size: 28rpx;
  color: #fff;
}
.user {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f35336;
  min-height: 230rpx;
}
.user-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
  overflow: hidden;
  background: #ccc;
}
.user-avatar .img,
.user-avatar image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.test-page-footer {
  box-sizing: border-box;
  flex: 0 0 auto;
  padding-top: 30rpx;
}
.test-page-main {
  flex:1 1 auto;
  margin-top:140rpx;
}
.test-page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #fff;
  margin: 0 0;
}
.navigation{
  width:100%;
  height:70rpx;
  position:fixed;
  background-color:#fff;
  padding:55rpx 0 20rpx 0rpx;
  z-index:9999;
}
.back{
  width:100rpx;
  height:70rpx;
}
</style>