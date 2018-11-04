<template>
  <div id="app">
    <!-- 自定义navigation -->
    <navigation :search='true' :propArray="cityList" :yourcity="minaAuth.yourcity ? minaAuth.yourcity : '定位中...'"></navigation>
    
    <!-- swiper轮播图 -->
    <swiper :indicator-dots="true"
      :autoplay="true"
      :circular="circular"
      :interval="interval"
      :duration="duration"
      previous-margin="-10px"
      class="mySwiper">
      <div v-for="item in imgUrls" :key="item.id">
        <swiper-item>
          <navigator url="" open-type="navigate" hover-class="none">
            <image :src="item" class="swiper_img"/>
          </navigator>
        </swiper-item>
      </div>
    </swiper>

    <!-- 内容 -->
    <!-- <form @submit="formSubmit_collect" report-submit="true"> -->
    <div style="z-index: 0;">
      <!-- <button formType="submit"  hover-class="none" class='invisibleclass'></button> -->
      <!-- 在组件中收集formid -->
      <card :items="database"></card>
    </div>
    <!-- </form> -->

    <!-- 自定义navBar -->
    <div class="bar">
      <scroll-view :scroll-x="true" class="navbar">
        <div v-for="tab in tabs" :key="tab.id" class="tab">{{tab}}</div>
      </scroll-view>
    </div>
    <div class="bar1" style="color: rgba(0, 0, 0, 0);">
      <scroll-view :scroll-x="true" class="navbar1">
        <div v-for="tab in tabs" :key="tab.id" class="tab1">{{tab}}</div>
      </scroll-view>
    </div>

    <!-- 底部登陆按钮 -->
    <!--
    <div class="login" v-if="!authSetting.userInfo" :hidden="!showLogin">
      <div class="myModal">
        <div style="font-size: 20px;margin: 12px;">欢迎</div>
        <div style="font-size: 18px;margin: 12px;">请允许授权后放心使用小程序，您的信息和数据将受到保护</div>
        <button open-type="getUserInfo" @click="login" class="shou">微信授权登陆{{authSetting.userInfo}}</button>
        <button @click="cancel" style="background-color: #fff;color: #000;">回到小程序首页</button>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card1'
import navbar from '@/components/navbar'
import navigation from '@/components/navigation'
var fmt = require('../../utils/index.js')

export default {
  components: {
    card,
    navbar,
    navigation
  },
  data () {
    return {
      tabs: [
        '儿童走失', '老人走失', '离家出走', '人贩拐卖', '其他寻人'
      ],
      authSetting: {
        userInfo: wx.getStorageSync('authSetting.userInfo')
      },
      showLogin: true,
      database: [],
      minaAuth: wx.getStorageSync('minaAuth'),
      interval: 5000,
      duration: 1000,
      circular: true,
      imgUrls: [
        '/static/images/home/sls.png',
        '/static/images/home/vr.png',
        '/static/images/home/xiaolong.jpg'
      ],
      cityList: [],
      parms: {
        type: 'nearby',
        page: 1
      }
    }
  },
  onShow () {
    this.minaAuth = wx.getStorageSync('minaAuth')
  },
  methods: {
    // formSubmit_collect (e) {
    //   console.log('form发生了submit事件', e.mp.detail.formId)
    // },
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
    },
    // 隐藏登陆框
    getTopicInfo () {
      var that = this
      that.parms.page++
      wx.request({
        url: wx.getStorageSync('requestUrl') + '/small/article/topics',
        method: 'GET',
        data: {
          type: that.parms.type,
          page: that.parms.page
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].MissedAt = fmt.formatTimeMin(new Date(res.data[i].MissedAt))
            res.data[i].BirthedAt = fmt.formatTime(new Date(res.data[i].BirthedAt))
            if (res.data[i].Title === '') {
              res.data[i].Title = res.data[i].MissedProvince + '-' + res.data[i].MissedCity + ', 寻找' + res.data[i].Nickname
            }
          }
          that.database = that.database.concat(res.data)
          console.log('加载更多后数据为: ', that.database)
          wx.setStorageSync('database', that.database)
        }
      })
    }
    // 下拉刷新后获取更多信息
  },
  // 转发
  onPullDownRefresh: function () {
    var that = this
    wx.request({
      url: wx.getStorageSync('requestUrl') + '/small/article/topics',
      method: 'GET',
      data: {
        type: that.parms.type,
        page: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].Title === '') {
            res.data[i].Title = res.data[i].MissedProvince + '-' + res.data[i].MissedCity + ', 寻找' + res.data[i].Nickname
          }
        }
        that.database = res.data
        wx.setStorageSync('database', that.database)
        console.log('database:', that.database)
      }
    })
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: function () {
    return {
      title: '凝聚每一份爱的力量',
      path: '/pages/home/main?from=forward',
      imageUrl: '/static/images/forward.png'
    }
  },
  onReachBottom () {
    var that = this
    wx.showLoading({
      title: '正在加载...'
    })
    setTimeout(function () {
      wx.hideLoading()
      that.getTopicInfo()
    }, 500)
  },
  // 触底加载更多刷新
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
        // that.database[0] = res.data[0]
        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data[i])
          if (res.data[i].Title === '') {
            res.data[i].Title = res.data[i].MissedProvince + '-' + res.data[i].MissedCity + ', 寻找' + res.data[i].Nickname
          }
          that.database = that.database.concat(res.data[i])
        }
        wx.setStorageSync('database', that.database)
        console.log('database:', that.database)
      }
    })
  }
}
</script>

<style scoped>
#app{
  background-color: #f3f3f3;
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
  z-index: 99;
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
  position: relative;
}
.tab:hover{
  color: #dc2323;;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  width: 100px;
  display: inline-block;
  box-sizing: border-box;
  background-image: linear-gradient(to top, transparent 0, #fff 100%), url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541312159946&di=698558c0ce1040cedf233c39b0d1841e&imgtype=0&src=http%3A%2F%2Fpic38.photophoto.cn%2F20160311%2F0021033817789866_b.jpg');
  background-size: 140px 130px;
  background-position: -20px 82px;
  background-repeat: repeat;
}
.mySwiper{
  margin: auto;
  margin-top: 107px;
  width: 100%;
  height: 165px;
  border-radius: 10px;
}
.swiper_img{
  width: 100%;
  height: 165px;
  margin-left: 10px;
}
.bar::after{
  content: 'ab';
  color: transparent;
  line-height: 28px;
  position: fixed;
  background: linear-gradient(to right, transparent 20%, #fff 80%);
  z-index: 9999;
  height: 30px;
  padding: 0 7px;
  top: 75px;
  right: 0px;
}
</style>
