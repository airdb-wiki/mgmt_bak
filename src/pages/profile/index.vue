<template>
  <div class="bh-profile-page">
    <div class="profile-page-main">
      <div class="userinfo" @click="">
        <div class="userinfo-avatar">
          <image class="img" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />  
        </div>
        <div v-if="!isLogin">
            <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">微信登录</button>
        </div>
        <div v-else>
          <div class="userinfo-cont">
            <div class="text-name">{{ userInfo.nickName }}</div>
            <div>公益时长：{{servicetime}}小时</div>
          </div>
        </div>

        <div class="userinfo-volunt"><i class="icon-dot"></i>加入志愿者</i></div>
      </div>
      
      <!-- s -->
      <div class="post-panel">
        <div class="post-panel__hd">
          <h3 class="post-panel__title">登记信息</h3>
        </div>
        <div class="post-panel__bd">
          <div class="kind-list">
            <div class="kind-item" v-for="(item, index) in items" :key="index" @click="onPostClick">
              <div class="kind-item__pic">
                <img class="img" v-if="userInfo.avatarUrl" :src="item.src" background-size="cover"/>  
              </div>
              <div class="kind-item__cont">
                <div>{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <!-- end -->

      <div class="notice-card">
        <div class="notice-card__pic">
          <img class="img" src="/static/images/mini-logo/1.png" alt="">
        </div>
        <div class="notice-card__cont">
          <p>第2388例 | 二十一年苦寻，夺子之痛难愈</p>
          <p>寻找曾华起</p>
        </div>
      </div>
      <div class="notice-card">
        <div class="notice-card__pic">
          <img class="img" src="/static/images/mini-logo/2.png" alt="http://http://bbs2.baobeihuijia.com">
        </div>
        <div class="notice-card__cont">
          <p>第2397例 | 残纸寄乡愁</p>
          <p>高杉回家</p>
        </div>
      </div>
    </div>


    <!-- 右下角加号新建 -->
    <img src="/images/addition_fill.png" class="btn-post" @click="onPostClick"/>
    <div class="profile-page-footer">
      <vfooter></vfooter>
    </div>
    
  </div>
</template>

<script>
import card from '@/components/card'
import vfooter from '@/pages/footer'
export default {
  components: {
    vfooter,
    card
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
  onShareAppMessage: function () {
    return {
      title: '公益项目',
      desc: '10岁丢失宝贝',
      path: '/pages/profile/main?from=forward'
    }
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    onPostClick () {
      wx.navigateTo({
        url: '/pages/publish/main'
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>


<style scoped>
.notice-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20rpx;
  padding: 30rpx 20rpx;
  background: #fff;
}
.notice-card__pic {
  flex: 0 0 auto;
  width: 110rpx;
  height: 110rpx;
  border-radius: 8rpx;
  background: #ccc;
  margin-right: 20rpx;
  overflow: hidden;
}
.notice-card__pic .img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.notice-card__cont {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.kind-list {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 20rpx 0;
}
.kind-item {
  flex: 0 0    auto;
  width: 25%;
  padding: 20rpx 0;
}
.kind-item__pic {
  width: 100rpx;
  height: 100rpx;
  margin: 0 auto;
  border-radius: 100%;
  overflow: hidden;
  background: #ccc;
}
.kind-item__pic .img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.kind-item__cont {
  margin-top: 10rpx;
  text-align: center;
  color: #aaa;
}
.userinfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20rpx;
  background: #fff;
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
  color: #000;
}
.userinfo-volunt {
  position: absolute;
  top: 50rpx;
  right: 20rpx;
  color: #56abe4;
}
.userinfo-volunt .icon-dot {
  display: inline-block;
  vertical-align: 3rpx;
  width: 16rpx;
  height: 16rpx;
  margin-right: 6rpx;
  border-radius: 100%;
  background: #ed462f;
}
.bh-profile-page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100%;
  background: #efeff4;
  margin: 20rpx 0;
}
.profile-page-main {
  flex: 1 1 auto;
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