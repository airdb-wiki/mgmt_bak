<template>
  <div id="app">
    <div style="z-index: 0;">
      <navbar :tabs="tabs"></navbar>
      <card :items="items"></card>
    </div>
    <div class="login" v-if="hide" style="display: none">
      <button open-type="getUserInfo" @click="login" type="primary">登陆</button>
    </div>
    <div v-else class="login">
      <div>
        <img src="/static/images/h2.png" style="width: 200px;height: 150px;">
        <button open-type="getUserInfo" @click="login" type="primary">登陆</button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card1'
import navbar from '@/components/navbar'

export default {
  components: {
    card,
    navbar
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
      hide: false
    }
  },
  methods: {
    // 登陆后隐藏登陆页
    login () {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            this.hide = true
          } else {
            wx.showToast({
              title: '您拒绝了授权',
              icon: 'none',
              duration: 1500
            })
          }
        }
      })
    }
  },
  // 转发
  onShareAppMessage: function () {
  },
  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
    // 获取用户授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.hide = true
        }
      }
    })
  }
}
</script>

<style scoped>
#app{
  background-color: #f2f2f2;
}
.login{
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
}
.login div{
  margin: 200px 50px;
  background-color: #fff;
  border-radius: 10px;
}
</style>