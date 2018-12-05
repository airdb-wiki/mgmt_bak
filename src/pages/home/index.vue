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

      <!-- 自定义navBar -->
      <div class="bar">
        <scroll-view :scroll-x="true" class="navbar">
          <div v-for="(tab, index) in tabs" :key="tab.id" :class="[index == activeIndex ? 'item_on' : 'tab']" :id="index" @click="changeTab">{{tab}}</div>
        </scroll-view>
      </div>
      
      <!-- <div style="z-index: 0;">
        <card :items="database"></card>
      </div> -->

      <div style="z-index: 0;">
        <!-- 监听切换事件 -->
        <card2 :items="database" @toggleDetail="toggleDetail"></card2>
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
    <div class="shade" v-if="hidden">
      <div class="t_w">
        <!--右上角图标开始-->
        <div class="t_image"  bindtap="conceal">
          <img class="t_image1" src="/images/camera.png" >
        </div>
        <!--右上角图标结束-->
        <!--弹出框开始-->
        <div class="tanchu_view">
          <div>
            <div class="bg_view">遮罩层</div>
            <div class="txtys">点击确定遮罩层</div>
            <!--确定开始-->
            <div class="txtsure"  >
              <div class="txtsurebg" @click="conceal">
                  <text class="txtsurename">确定</text>
              </div>        
            </div>
            <!--确定结束-->
          </div>
        </div>
        <!--弹出框结束-->
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime, formatTimeMin, jsGetAge } from '@/utils/index'
import card from '@/components/card1'
import card2 from '@/components/card2'
import navbar from '@/components/navbar'
import navigation from '@/components/navigation'

export default {
  components: {
    card,
    navbar,
    navigation,
    card2
  },
  data () {
    return {
      hidden: 1,
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
        '/static/images/adsBanner/home1.jpg',
        '/static/images/adsBanner/home2.jpg'
      ],
      cityList: [],
      parms: {
        type: 'nearby',
        tag: '',
        category: '',
        page: 1
      },
      activeIndex: 0
    }
  },
  onShow () {
    this.minaAuth = wx.getStorageSync('minaAuth')
  },
  methods: {
    conceal: function () {
      this.hidden = 0
      console.log('666')
    },
    changeTab (e) {
      this.database = []
      this.parms.page = 1
      this.activeIndex = e.currentTarget.id
      this.parms.category = this.tabs[e.currentTarget.id]
      console.log('-----------changeTab', e.currentTarget.id, this.parms.category)
      this.request()
    },
    // 切换状态
    toggleDetail (index) {
      this.database[index].show = !this.database[index].show
    },
    request () {
      var that = this
      console.log(that.parms)
      wx.request({
        url: wx.getStorageSync('requestUrl') + '/small/article/topics',
        method: 'GET',
        data: that.parms,
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
            res.data[i].show = false
            res.data[i].MissedAt = formatTimeMin(new Date(res.data[i].MissedAt))
            res.data[i].Age = jsGetAge(res.data[i].BirthedAt)
            if (res.data[i].Age > 150) {
              res.data[i].Age = '不详'
            }
            that.database = that.database.concat(res.data[i])
          }
          wx.setStorageSync('database', that.database)
          console.log('database:', that.database)
        }
      })
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
            if (res.data[i].Title === '') {
              res.data[i].Title = res.data[i].MissedProvince + '-' + res.data[i].MissedCity + ', 寻找' + res.data[i].Nickname
            }
            res.data[i].show = false
            res.data[i].MissedAt = formatTimeMin(new Date(res.data[i].MissedAt))
            res.data[i].Age = jsGetAge(res.data[i].BirthedAt)
            if (res.data[i].Age > 150) {
              res.data[i].Age = '不详'
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
    wx.showLoading({
      title: '正在更新...'
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)

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
          res.data[i].show = false
          res.data[i].MissedAt = formatTimeMin(new Date(res.data[i].MissedAt))
          res.data[i].Age = jsGetAge(res.data[i].BirthedAt)
          if (res.data[i].Age > 150) {
            res.data[i].Age = '不详'
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
      imageUrl: '/static/images/forward/home1.jpg'
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

    this.request()
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
.item_on{
  color: #dc2323;;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  width: 100px;
  display: inline-block;
  box-sizing: border-box;
  background-image: url('https://wechat-1251018873.file.myqcloud.com/mina/base/icon/love-select.png');
  background-size: 50px 30px;
  background-position: 23px 0px;
  background-repeat: no-repeat;
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
  content: '';
  font-size: 20px;
  font-weight: bold;
  line-height: 35px;
  position: fixed;
  background: rgba(255, 255, 255, .8);
  z-index: 9999;
  height: 35px;
  padding: 0 13px;
  top: 68px;
  right: 0px;
}
/*測試版遮罩樣式*/
.shade{
  position:fixed;
  width:100%;
  height:100%;
  top:0px;
  background:rgba(0,0,0,0.4);
  overflow: hidden;
  }
.t_w{
  position:relative;
  }
.tanchu_view{
  width: 80%;
  margin:25% auto;
  overflow: hidden;
  background-color: #fff1e6;
  border-radius: 10rpx;
  padding: 4rpx;
  }
 
 
.bg_view{
  margin:30rpx auto 30rpx auto;
  color:#fcb712;
  font-size:50rpx;
  background-color: #fff1e6;
  padding:0rpx 30rpx;
  text-align: center;
  }
 
 
  .txtys{
    font-size: 50rpx;
    text-align: center;
    margin-bottom: 200rpx;
  }
 
.txtsure{
 width: 100%;
 height: 100%;
 display: flex;
 justify-content: center;
 margin: 20rpx;
}
 
/*确定背景*/
.txtsurebg{
  width: 300rpx;
  height: 300rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 50rpx;
  background-color: burlywood;
   flex-direction: column;
}
 
/*确定图标*/
.txtsureimg{
  display:block;
  width:120rpx;
  height:120rpx;
}
 
/*确定文本*/
.txtsurename{
   margin-bottom: 0rpx;
   color: white;
   font-size: 70rpx;
}
 
/*右上角图标*/
.t_image{
  width:204rpx;
  height:200rpx;
  position: absolute;
  top: -6%;
  left:88%;
  }
 
/*右上角图标*/
.t_image1{
  display:block;
  width:60rpx;
  height:60rpx;
  }
</style>
