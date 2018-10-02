<template>
  <div id="app">
    <!-- 自定义navigation -->
    <navigation></navigation>
    
    <!-- 自定义navBar -->
    <div style="z-index: 0;margin-top: 70px;">
      <navbar :tabs="tabs"></navbar>
      <card :items="items"></card>
    </div>
    
    <div class="login" v-if="!authSetting.userInfo">
      <div>
        <button open-type="getUserInfo" @click="login" type="primary">登陆{{authSetting.userInfo}}</button>
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
        '精选', '故事', '影像', '数据', '计划'
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
      authSetting: {}
    }
  },
  onLoad: function () {
  },
  methods: {
    login () {
      console.log('login function')
    }
  },
  // 转发
  onShareAppMessage: function () {
  },
  created () {
    this.authSetting.userInfo = wx.getStorageSync('authSetting.userInfo')
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
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 9999;
  position: fixed;
  bottom: 0px;
  left: 0;
}
.login div{
  background-color: #fff;
  border-radius: 10px;
}
</style>