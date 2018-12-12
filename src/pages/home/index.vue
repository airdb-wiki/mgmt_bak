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
      
      <!-- 卡片效果 -->
      <div style="z-index: 0;">
        <card2 :items="database" @toggleDetail="toggleDetail"></card2>
      </div>

      <!-- 遮罩效果 -->
      <div class="shade" v-if="hidden" catchtouchmove='preventTouchMove'>
        <div class="container_one">
          <div class="trans_text">1.点击</div>
          <img src="/static/images/trans1.jpg" alt="" class="trans1">
        </div>
        <div class="container_two">
          <div class="trans_text">2.点击 [添加到我的小程序]</div>
          <img src="/static/images/trans2.jpg" alt="" class="trans2">
        </div>
        <div class="container_three">
          <div class="trans_text">3.在微信首页下拉,快速进入"宝贝回家"</div>
          <img src="/static/images/trans3.jpg" alt="" class="trans3">
        </div>
      <div class="container_four" @click="conceal">我知道了</div>
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
  onLoad () {
    // var profile = wx.getStorageSync('profile')
    // this.hidden = profile.data.isFirstLogin
    // console.log('profile:666', profile.data.isFirstLogin)
  },
  onShow () {
    this.minaAuth = wx.getStorageSync('minaAuth')
  },
  methods: {
    conceal: function () {
      this.hidden = 0
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
      console.log('parms:', that.parms)
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
            console.log('res.data:', res.data[i])
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
/*正式版遮罩样式*/
  .shade{
    z-index: 9999;
    position:fixed;
    width:100%;
    height:100%;
    top:0rpx;
    background:rgba(0,0,0,0.4);
    overflow: hidden;
    color: #fff;
    font-size:16px;
    font-weight: 400;
    font-family: Microsoft Yahei;
    letter-spacing:6px;
  }
  .container_one{
    display: flex;
    flex-direction: row;
    margin-top: 65rpx;
    /* justify-content: center; */
  }
  .container_two{
    margin-top: 12px;
    margin-left: 0px;
  }
  .trans_text{
    margin-left: 30px;
    margin-right: 5px;
  }
  .container_three{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 12px;
   }
  .container_four{
    border:solid 1px;
    width: 150px;
    height: 35px;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 60rpx;
    margin-left: 100px;
  }
  .trans1{
    width: 150px;
    height: 40px;
    margin-left: 10px;
  }
  .trans2{
    margin-left: 25px;
    width: 84%;
    height: 140px;
    margin-top: 10px;
  }
  .trans3{
    width:84%;
    height: 350rpx;
    margin-top: 10px;
  }
</style>
