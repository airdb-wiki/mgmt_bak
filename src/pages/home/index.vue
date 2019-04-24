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
    <!-- <div class="bar">
      <scroll-view :scroll-x="true" class="navbar">
        <div v-for="(tab, index) in tabs" :key="tab.id" :class="[index == activeIndex ? 'item_on' : 'tab']" :id="index" @click="changeTab">{{tab}}</div>
      </scroll-view>
    </div> -->

    <!-- 卡片效果 -->
    <div style="z-index: 0;">
      <card2 :items="database"></card2>
    </div>

    <!-- 遮罩效果 -->
    <div class="shade" v-if="isFirstShow" catchtouchmove='preventTouchMove'>
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
// import card from '@/components/card1'
import card2 from '@/components/card2'
import navbar from '@/components/navbar'
import navigation from '@/components/navigation'

export default {
  components: {
    // card,
    navbar,
    navigation,
    card2
  },
  data () {
    return {
      isFirstShow: true,
      tabs: [
        '儿童走失', '老人走失', '离家出走', '人贩拐卖', '其他寻人'
      ],
      setting: wx.getStorageSync('setting'),
      showLogin: false,
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
        page: 0,
        pullData: 'old'
      },
      activeIndex: 0
    }
  },
  // 控制遮罩显示状态
  onLoad () {
    var profile = wx.getStorageSync('profile')
    this.isFirstShow = profile.isFirstLogin
    // console.log('profile information:', profile)
  },
  // 获取缓存
  onShow () {
    // this.minaAuth = wx.getStorageSync('minaAuth')
    console.log('minaAuth=========', this.minaAuth)
    var db = wx.getStorageSync('database')
    if (db.length === 0) {
      this.database = []
    } else {
      this.database = db
    }
    // console.log('home first show================', this.database.length)
    // console.log(typeof (this.database))
  },
  methods: {
    // 隐藏遮罩
    conceal: function () {
      this.isFirstShow = false
    },
    //  顶部tab栏切换
    changeTab (e) {
      // this.database = []
      this.parms.page = 1
      this.activeIndex = e.currentTarget.id
      this.parms.category = this.tabs[e.currentTarget.id]
      // console.log('-----------changeTab', e.currentTarget.id, this.parms.category)
      // this.request()
    },
    cancel () {
      console.log('hover')
      this.showLogin = false
    },
    // 隐藏登陆框
    getArticleOverview (parms) {
      var vm = this
      // 每次取一页, 每页默认是5条数据.
      this.$get('/lastest/wechatapi/small/article/summary', parms).then((res) => {
        if (res.data === null) {
          console.log('没有新数据了。')
          return
        }
        console.log('res.data=======', res.data)
        // console.log('typeof(res.data)', typeof (res.data))
        for (var i = 0; i < res.data.length; i++) {
          // if (res.data[i].MissedCity === '') {
          //   res.data[i].MissedCity = '不详'
          // }
          // if (res.data[i].Nickname === '') {
          //   res.data[i].Nickname = '姓名 空'
          // }
          if (res.data[i].Characters === '') {
            res.data[i].Characters = '不详'
          }
          if (res.data[i].Title === '') {
            res.data[i].Title = res.data[i].MissedProvince + '-' + res.data[i].MissedCity + ', 寻找' + res.data[i].Nickname
          }
          if (res.data[i].AvatarUrl === '') {
            res.data[i].AvatarUrl = '/static/images/forward/home1.jpg'
          }
          // if (res.data[i].MissedCity === '') {
          //   res.data[i].MissedAddress = res.data[i].MissedCity
          // } else {
          //   res.data[i].MissedAddress = res.data[i].MissedCity + res.data[i].MissedAddress
          // }
          // res.data[i].MissedAddress = res.data[i].MissedCity + res.data[i].MissedAddress
          res.data[i].MissedAt = formatTimeMin(new Date(res.data[i].MissedAt))
          res.data[i].BirthedAt = formatTimeMin(new Date(res.data[i].BirthedAt))
          res.data[i].Age = jsGetAge(res.data[i].BirthedAt)
          if (res.data[i].Age > 150) {
            res.data[i].Age = '不详'
          }
          // console.log('======datafrom', res.data[i].DataFrom)
          var tmpurl = res.data[i].DataFrom.split('/')
          if (tmpurl.length > 3) {
            res.data[i].DataFrom = tmpurl[2]
          }
          // console.log('==-----datafrom---', res.data[i].DataFrom)
        }
        var db = []
        var data = res.data
        data.map((item, index) => {
          if (vm.database.findIndex(elem => (elem.Babyid === item.Babyid)) === -1) {
            db.push(item)
            // console.log('filtered item===================', item)
          }
        })
        // 当重新打开页面时,缓存仍存在(缓存数据无需reachdown即可全部显示),如果db为空,则已经加载全部内容
        if (db.length === 0) {
          // 拉取不到新数据
          // console.log('=====', vm.parms.pullData)
          if (vm.parms.pullData === 'new') {
            wx.showToast({
              title: '已是最新数据',
              icon: 'success',
              duration: 1500
            })
          } else {
            console.log('拉到底了！ server return data is null.')
            wx.showToast({
              title: '已加载全部内容',
              icon: 'success',
              duration: 1500
            })
            // 应该弹框通知下用户
          }
        } else {
          // 拉取到新数据
          if (vm.parms.pull === 'new') {
            vm.database = db.concat(vm.database)
          } else {
            vm.database = vm.database.concat(db)
          }
        }
        // 历史数据是追加，所以放在最后。 新增加数据放在最前。 默认是历史数据，进行追加。
        console.log('加载更多后数据为: ', vm.database)
        wx.setStorageSync('database', vm.database)
      }).catch((err) => {
        // 当res返回的数据为空,即加载全部内容,执行err函数
        console.log('error:  ', err)
        console.log('拉到底了！ server return data is null.')
        // 应该弹框通知下用户
        wx.showToast({
          title: '已加载全部内容',
          icon: 'success',
          duration: 1000
        })
      })
    }
  },
  // 转发
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '正在更新...'
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    var vm = this
    // 第次都拉第一页， 对应后台需要倒序，返回最新的数据
    vm.parms.page = 0
    vm.parms.pullData = 'new'
    vm.getArticleOverview(vm.parms)
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
    // 触底加载历史数据,  默认就是这种模式
    var vm = this
    vm.parms.page++
    vm.parms.pullData = 'old'
    wx.showLoading({
      title: '正在加载...'
    })
    setTimeout(function () {
      wx.hideLoading()
      vm.getArticleOverview(vm.parms)
    }, 500)
  },
  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
    // 获取用户授权
    this.getArticleOverview(this.parms)
  }
}
</script>


<style scoped lang='less'>
  @import 'index';
</style>
