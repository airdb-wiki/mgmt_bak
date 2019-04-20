<template>
  <div class="bh-profile-page">
    <navigation></navigation>
    <div class="profile-page-main" style="margin-top: 60px;">
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
    <img src="/static/images/addition_fill.png" class="btn-post" @click="onPostClick"/>
    <div class="profile-page-footer">
      <vfooter></vfooter>
    </div>
    
  </div>
</template>

<script>
import card from '@/components/card'
import vfooter from '@/pages/footer'
import navigation from '@/components/navigation'
export default {
  components: {
    vfooter,
    card,
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
    console.log('===profile onLoad()===')
    // 检测用户是否授权
    wx.getSetting({
      success: (res) => {
        console.log('profile===onLoad() success', res)
        if (res['authSetting']['scope.userInfo']) this.isLogin = true
        else this.isLogin = false
      },
      fail: (res) => {
        console.log('profile===onLoad() fail', res)
      },
      complate: (res) => {
        console.log('profile===onLoad()')
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
    binddivTap () {
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
    },
    openSetting () {
      console.log('profile === openSetting')
      var that = this
      wx.openSetting({
        success: (res) => {
          if (!res.authSetting['scope.userInfo']) {
            that.isLogin = false
            console.log('profile === openSetting isLogin=false')
          }
        }
      })
    },
    getUserInfo: function (e) {
      console.log('profile === getUserInfo() userInfo =', e.mp.detail.userInfo)
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



<style scoped lang='less'>
  @import 'index';
</style>