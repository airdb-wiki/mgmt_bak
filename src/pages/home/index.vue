<template>
  <div id="app">
    <!-- 自定义navigation -->
    <navigation :search='true'></navigation>
    
    <!-- 内容 -->
    <div style="z-index: 0;margin-top: 79px;">
      <card :items="items"></card>
    </div>

    <!-- 自定义navBar -->
    <div>
      <scroll-view :scroll-x="true" class="navbar">
        <div v-for="tab in tabs" :key="tab.id" class="tab">{{tab}}</div>
      </scroll-view>
    </div>
    
    <!-- 底部登陆按钮 -->
    <div class="login" v-if="!authSetting.userInfo">
      <div class="myModal">
        <div style="font-size: 20px;margin: 12px;">欢迎</div>
        <div style="font-size: 18px;margin: 12px;">请允许授权后放心使用小程序，您的信息和数据将受到保护</div>
        <button open-type="getUserInfo" @click="login" type="primary" class="shou">微信授权登陆{{authSetting.userInfo}}</button>
        <button @click="cancel" type="primary" style="background-color: #fff;color: #000;">回到小程序首页</button>
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
        '精选', '故事', '影像', '数据', '计划', '故事', '影像', '数据', '计划'
      ],
      items: [
        {
          url: '/static/images/home/sls.png',
          title: '一场斗狗的厮杀游戏 曝光了人类的残忍兽性',
          team: '谷雨计划',
          editor: '李娜',
          time: '9月10日',
          avatarUrl: '/static/images/home/sls.png'
        },
        {
          url: '/static/images/home/vr.png',
          title: '一场斗狗的厮杀游戏 曝光了人类的残忍兽性',
          team: '谷雨实验室',
          editor: '李娜',
          time: '9月10日',
          avatarUrl: '/static/images/home/vr.png'
        },
        {
          url: '/static/images/home/xiaolong.jpg',
          title: '一场斗狗的厮杀游戏 曝光了人类的残忍兽性',
          team: '谷雨计划',
          editor: '李娜',
          time: '9月10日',
          avatarUrl: '/static/images/home/xiaolong.jpg'
        }
      ],
      authSetting: false
    }
  },
  onLoad: function () {
  },
  methods: {
    login () {
      console.log('login function')
      setTimeout(function () {
        wx.getSetting({
          success: res => {
            console.log('setting', res)
            console.log('setting', res.authSetting['scope.userInfo'])
            if (res.authSetting['scope.userInfo'] === true) {
              this.getUserInfo = res.authSetting['scope.userInfo']
            }
          }
        })
      }, 2000)
    }
  },
  // 转发
  onShareAppMessage: function () {
  },
  created () {
    this.authSetting = wx.getStorageSync('authSetting.userInfo')
    console.log('create====', this.authSetting.userInfo)
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
    // 获取用户授权
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
  z-index: 999;
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
  width: 60px;
  display: inline-block;
  box-sizing: border-box;
  padding: 2px 0;
}
.tab:hover{
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  width: 60px;
  display: inline-block;
  box-sizing: border-box;
  border-bottom: 4px solid #e2d609;
}
</style>