<template>
  <div class="test-page">

    <div class="navigation">
      <div class="btn">
        <navigator open-type="navigateBack">
          <img src="/static/images/home/back.png" class="back">
        </navigator>

        <div style="border-left: 1px solid #e2e2e2;margin: 2px 10px 0 4px;height: 18px;"></div>

        <navigator open-type="reLaunch" url="/pages/home/main">
          <img src="/static/images/home/home.png" class="home">
        </navigator>
      </div>

      <div v-if="!showTitle" class="title">详情</div>
      <div v-else class="title">{{title}}</div>
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
      title: '成长指标',
      showTitle: false,
      userInfo: wx.getStorageSync('userInfo'),
      authSetting: {
        userInfo: wx.getStorageSync('authSetting.userInfo')
      },
      privilege: 3,
      items: [{
        name: '精美礼品',
        src: '/static/images/mini-logo/1.png'
      }, {
        name: '公仔一个',
        src: '/static/images/mini-logo/2.png'
      }, {
        name: '衣服一件',
        src: '/static/images/mini-logo/3.png'
      }, {
        name: '未解锁',
        src: '/static/images/mini-logo/4.png'
      }, {
        name: '未解锁',
        src: '/static/images/mini-logo/5.png'
      }, {
        name: '未解锁',
        src: '/static/images/mini-logo/6.png'
      }, {
        name: '未解锁',
        src: '/static/images/mini-logo/6.png'
      }, {
        name: '未解锁',
        src: '/static/images/mini-logo/6.png'
      }, {
        name: '未解锁',
        src: '/static/images/mini-logo/6.png'
      }, {
        name: '未解锁',
        src: '/static/images/mini-logo/6.png'
      }, {
        name: '未解锁',
        src: '/static/images/mini-logo/6.png'
      }]
    }
  },
  // data end

  methods: {
  },
  // methods end

  onPageScroll (res) {
    if (res.scrollTop > 40) {
      this.showTitle = true
    } else {
      if (res.scrollTop < 40) {
        this.showTitle = false
      }
    }
  },

  onShareAppMessage: function () {
    return {
      title: '您的公益时长为10小时',
      desc: '公益项目',
      path: '/pages/test_mc/myPrivilege/main?from=forward'
    }
  }
}
</script>

<style scoped>
.weui-grid__label {
  margin-top: 25rpx;
}
.weui-grids {
  border-top:0px;
  border-left:0rpx;
  overflow:hidden;
}
.weui-grid {
  position:relative;
  height:250rpx;
  float:left;
  padding:65rpx 40rpx 60rpx 40rpx;
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
  width: 100%;
  padding: 18pt 0 4pt 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: row;
}
.title{
  width: 50%;
  margin-left: 3pt;
  text-align: center;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30pt;
  font-size: 18px;
}
.btn{
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3pt 0pt 5pt 4pt;
  margin-left: 6pt;
  width: 56pt;
  height: 16pt;
}
.back{
  width: 20pt;
  height: 20pt;
}
.home{
  width: 17pt;
  height: 17pt;
}
</style>