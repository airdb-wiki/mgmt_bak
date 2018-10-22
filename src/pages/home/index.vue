<template>
  <div id="app">
    <!-- 自定义navigation -->
    <navigation :search='true' :yourcity=minaAuth.yourcity></navigation>
    
    <!-- swiper轮播图 -->
    <swiper :indicator-dots="true"
      :autoplay="true"
      :interval="interval"
      :duration="duration"
      previous-margin="-10px"
      class="mySwiper">
      <div v-for="item in imgUrls" :key="item.id">
        <swiper-item style="border-radius: 10px;">
          <navigator url="" open-type="navigate" hover-class="none">
            <image :src="item" class="swiper_img"/>
          </navigator>
        </swiper-item>
      </div>
    </swiper>

    <!-- 内容 -->
    <form @submit="formSubmit_collect" report-submit="true">
    <div style="z-index: 0;">
      <button formType="submit"  hover-class="none" class='invisibleclass'></button>
      <card :items="database"></card>
    </div>
    </form>

    <!-- 自定义navBar -->
    <div class="bar">
      <scroll-view :scroll-x="true" class="navbar">
        <div v-for="tab in tabs" :key="tab.id" class="tab">{{tab}}</div>
      </scroll-view>
    </div>

    <!-- 底部登陆按钮 -->
    <div class="login" v-if="!authSetting.userInfo" :hidden="!showLogin">
      <div class="myModal">
        <div style="font-size: 20px;margin: 12px;">欢迎</div>
        <div style="font-size: 18px;margin: 12px;">请允许授权后放心使用小程序，您的信息和数据将受到保护</div>
        <button open-type="getUserInfo" @click="login" class="shou">微信授权登陆{{authSetting.userInfo}}</button>
        <button @click="cancel" style="background-color: #fff;color: #000;">回到小程序首页</button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card1'
import navbar from '@/components/navbar'
import navigation from '@/components/navigation'

export default {
  components: {
    card,
    navbar,
    navigation
  },
  data () {
    return {
      tabs: [
        '家寻宝贝', '宝贝寻家', '救助寻亲', '流浪乞讨', '实时寻人', '其他寻人'
      ],
      authSetting: {
        userInfo: wx.getStorageSync('authSetting.userInfo')
      },
      showLogin: true,
      database: [],
      minaAuth: wx.getStorageSync('minaAuth'),
      interval: 5000,
      duration: 1000,
      imgUrls: [
        '/static/images/home/sls.png',
        '/static/images/home/vr.png',
        '/static/images/home/xiaolong.jpg'
      ]
    }
  },
  onload () {
    this.minaAuth = wx.getStorageSync('minaAuth')
  },
  methods: {
    formSubmit_collect (e) {
      console.log('form发生了submit事件', e.mp.detail.formId)
    },
    login () {
      var that = this
      console.log('login function', wx.getStorageSync('authSetting.userInfo'))
      setTimeout(function () {
        wx.getSetting({
          success: res => {
            console.log('setting', res)
            console.log('setting', res.authSetting['scope.userInfo'])
            if (res.authSetting['scope.userInfo'] === true) {
              // this.getUserInfo = res.authSetting['scope.userInfo']
              console.log('====', res.authSetting['scope.userInfo'])
              that.authSetting.userInfo = res.authSetting['scope.userInfo']
              wx.setStorageSync('authSetting.userInfo', res.authSetting['scope.userInfo'])
            }
          }
        })
      }, 2000)
    },
    cancel () {
      console.log('hover')
      this.showLogin = false
    }
  },
  // 转发
  onShareAppMessage: function () {
    return {
      title: '凝聚每一份爱的力量',
      path: '/pages/hr/main?from=forward',
      imageUrl: '/static/images/forward.png'
    }
  },
  created () {
    console.log('==authSetting==', wx.getStorageSync('authSetting.userInfo'), this.authSetting.userInfo)
    this.authSetting.userInfo = wx.getStorageSync('authSetting.userInfo')
    console.log('create====', this.authSetting.userInfo)
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
    // 获取用户授权

    var that = this
    wx.request({
      url: wx.getStorageSync('requestUrl') + '/small/article/topics',
      method: 'GET',
      data: {
        type: 'nearby',
        page: '1'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.database[0] = res.data[0]
        for (var i = 1; i < res.data.length; i++) {
          that.database = that.database.concat(res.data[i])
        }
        wx.setStorageSync('database', that.database)
        console.log('database:', that.database)
      }
    })
    // 从数据库请求数据
  }
}
</script>

<style scoped>
#app{
  background-color: #f2f2f2;
}
.login{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 9999;
  position: fixed;
  bottom: 0px;
  left: 0;
}
.myModal{
  width: 280px;
  margin: auto;
  margin-top: 220px;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
}
.shou{
  margin-bottom: 10px;
  background-color: #a7b0f0;
  color: #fff;
}
.navbar{
  width: 100%;
  white-space: nowrap;
  position: fixed;
  top: 53pt;
  left: 0;
  z-index: 9999;
  background-color: #fff;
  overflow: hidden;
}
::scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.tab{
  text-align: center;
  font-size: 20px;
  width: 100px;
  display: inline-block;
  box-sizing: border-box;
  padding: 2px 0;
}
.tab:hover{
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  width: 100px;
  display: inline-block;
  box-sizing: border-box;
  border-bottom: 4px solid #e2d609;
}
.mySwiper{
  margin: auto;
  margin-top: 107px;
  width: 330px;
  height: 165px;
  border-radius: 10px;
}
.swiper_img{
  width: 330px;
  height: 165px;
  border-radius: 10px;
  margin-left: 10px;
}
.bar::after{
  content: '+';
  font-size: 20px;
  font-weight: bold;
  line-height: 28px;
  position: fixed;
  background-color: rgba(255, 255, 255, .85);
  z-index: 9999;
  height: 30px;
  padding: 0 7px;
  top: 75px;
  right: 0;
}
</style>