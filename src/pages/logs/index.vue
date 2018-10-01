<template>
  <div class="page bh-index-page">
    <div class="bh-search-mod">
      <div class="weui-search-bar">
        <div class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
            <input type="text" class="weui-search-bar__input" placeholder="搜索" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
            <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
              <icon type="clear" size="14"></icon>
            </div>
          </div>

          <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
            <icon class="weui-icon-search" type="search" size="14"></icon>
            <div class="weui-search-bar__text">搜索</div>
          </label>

        </div>
        <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
      </div>
      <!--
      <div class="weui-cells searchbar-result" :hidden="!inputShowed" v-for="(word,index) in items">
        <div class="weui-cell" hover-class="weui-cell_active" @click="chooseResult">
          <div class="weui-cell__bd">
            <div>{{word.Babyid}}-{{word.Nickname}}</div>
          </div>
        </div>
      </div>
      -->
      <div class="weui-cells searchbar-result" :hidden="!inputShowed" v-for="(word,index) in items">
        <div class="weui-cell" hover-class="weui-cell_active" @click="chooseResult">
          <div class="weui-cell__bd">
            <div>{{word.Babyid}}-{{word.Nickname}}</div>
          </div>
        </div>
      </div>
    </div>

    <!--
      <div class="page" :hidden="inputShowed">
        <div class="publish-card-wrap" >
          <publish-card
            :isFollow="isFollow"
            :publishInfo="showItem"
            :handleClick="handleClickPubCard"
            :handleFollow="handleFollow">     
            </publish-card>
        </div>
      </div>
      -->



    <!--
      <div class="weui-tab">
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
              <div class="weui-navbar__title">{{item}}</div>
            </div>
          </block>
          <div :class="['weui-navbar__slider', 'weui-navbar__slider_' + activeIndex]"></div>
        </div>
        <div class="weui-tab__panel">
        </div>
      </div>


     <div class="page" :hidden="!inputShowed" v-show="!isShowCard">
      <div class="page__bd page__bd_spacing">
        <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
          <div v-for="(item, index) in imgUrls" :key="index">
            <swiper-item>
              <image :src="item" class="slide-image"   />
            </swiper-item>
          </div>
        </swiper>
      </div>
      </div>
    -->


   <map
     id="map"
     scale="14"
     show-location
     style="width: 100%; height: 300px;"
     :longitude="userLocation.longitude"
     :latitude="userLocation.latitude"
     :markers="markers"
     :circles="circles"
     @markertap="markertap"
     >
   </map>
  <!-- 分类面板1
  <div class="post-panel">
    <div class="post-panel__hd">
      <h3 class="post-panel__title">寻找丢失宝贝</h3>
      <a href="javascript:;" class="btn-more">更多 &gt;</a>
    </div>
    <div class="post-panel__bd">
      <ul class="post-list">
        <li class="post-item" v-for="(item, index) in items" :key="index" @click="clickHandle(item.UUID, $event)">
          <div class="post-item__pic">
            <image :src=item.PicUrl />
          </div>
          <div class="post-item__detail">
            <p class="post-item__title">{{item.Title}}</p>
            <p class="post-item__desc">{{item.desc}}</p>
          </div>
        </li>
      </ul>  
    </div>
  </div>
  分类面板1 end -->

  <!-- 右下角加号新建 -->
  <img src="/static/images/addition_fill.png" class="btn-post" @click="onPostClick"/>

  </div>
</template>

<script>
import card from '@/components/card'
import PublishCard from '@/components/publish-card'
import { formatTime, formatTimeMin } from '@/utils/index'
export default {
  components: {
    card,
    PublishCard
  },
  data () {
    return {
      tabs: ['家寻宝贝', '宝贝寻家', '救助寻亲', '流浪乞讨', '等着我寻人', '其他寻人'],
      activeIndex: 0,
      isFollow: false,
      isShowCard: true,
      apiurl: wx.getStorageSync('requestUrl') + '/small/article/:',
      from: '',
      inputShowed: false,
      inputVal: '',
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,

      userLocation: wx.getStorageSync('userLocation'),
      markers: [{
        iconPath: '/static/images/map.png',
        id: 0,
        title: 'dean',
        label: '455112c2-cd5b-4bd5-9bfa-3687c0802da6',
        latitude: wx.getStorageSync('userLocation').latitude,
        longitude: wx.getStorageSync('userLocation').longitude,
        width: 50,
        height: 50
      }, {
        iconPath: '/static/images/map.png',
        id: 1,
        title: 'dean right',
        label: 'c266c63f-c49b-4433-964e-7c4cf64a7ba2',
        latitude: wx.getStorageSync('userLocation').latitude,
        longitude: wx.getStorageSync('userLocation').longitude + 0.02,
        width: 50,
        height: 50
      }, {
        iconPath: '/static/images/map.png',
        id: 2,
        title: 'dean  left',
        label: 'fbaab284-c43f-4fb0-8861-4de9850375e5',
        latitude: wx.getStorageSync('userLocation').latitude,
        longitude: wx.getStorageSync('userLocation').longitude - 0.02,
        width: 50,
        height: 50
      }, {
        iconPath: '/static/images/map.png',
        id: 3,
        title: 'dean  up',
        label: 'fbaab284-c43f-4fb0-8861-4de9850375e5',
        latitude: wx.getStorageSync('userLocation').latitude + 0.02,
        longitude: wx.getStorageSync('userLocation').longitude,
        width: 50,
        height: 50
      }, {
        iconPath: '/static/images/map.png',
        id: 4,
        title: 'dean  down',
        label: 'fbaab284-c43f-4fb0-8861-4de9850375e5',
        latitude: wx.getStorageSync('userLocation').latitude - 0.02,
        longitude: wx.getStorageSync('userLocation').longitude,
        width: 50,
        height: 50
      }],
      circles: [{
        latitude: wx.getStorageSync('userLocation').latitude,
        longitude: wx.getStorageSync('userLocation').longitude,
        color: '#FF0000DD',
        fillColor: '#7cb5ec88',
        radius: 3000,
        strokeWidth: 1
      }],

      imgUrls: [
        '/static/images/h2.png'
      ],

      keyWords: {
        nickname: '',
        babyid: ''
      },
      src: '',
      showItem: {},
      items: []
    }
  },
  onShareAppMessage: function () {
    return {
      title: '公益项目',
      desc: '10岁丢失宝贝',
      path: '/pages/home/main?from=forward'
    }
  },
  onLoad: function (option) {
    this.from = option.from
    console.log('=============!!!!!====', this.items)
    this.getHotTopic()
    this.showItem = this.items[0]
  },
  created: function () {
    this.getLocationMarkers()
    // this.getSummary()
    wx.getStorage({
      key: 'nickname',
      success: function (res) {
        console.log('get storage home created===', res.data)
      }
    })
  },
  mounted () {
  },
  methods: {
    tabClick (e) {
      console.log(e)
      this.activeIndex = e.currentTarget.id
    },
    markertap (e) {
      var vm = this
      vm.markers.forEach(function (marker, i) {
        if (marker['id'] === e.mp.markerId) {
          console.log('========', marker['id'], marker['label'])
          // uuid = marker['label']
          vm.getArticle(marker['label'])
          vm.isShowCard = true
          // vm.getArticle('fbaab284-c43f-4fb0-8861-4de9850375e5')
        }
      })
    },
    controltap (e) {
      console.log(e.controlId)
    },
    // 点击卡片
    handleClickPubCard (publishInfo) {
      console.log(publishInfo)
      this.clickHandle(publishInfo.UUID)
    },
    // 点击卡片关注按钮
    handleFollow (publishInfo) {
      console.log('handleFollow----', this.isFollow)
      this.isFollow = !this.isFollow
    },
    swiperChange (e) {
      // console.log('第' + e.mp.detail.current + '张轮播图发生了滑动')
    },
    animationfinish (e) {
      // console.log('第' + e.mp.detail.current + '张轮播图滑动结束')
    },
    showInput () {
      this.inputShowed = true
    },
    hideInput () {
      this.inputVal = ''
      this.inputShowed = false
    },
    clearInput () {
      this.inputVal = ''
    },
    inputTyping (e) {
      this.IsShowCard = false
      console.log(e)
      this.inputVal = e.mp.detail.value
      console.log('输入信息为：' + e.mp.detail.value)
    },
    clickHandle (uuid, ev) {
      // console.log('clickHandle:', uuid, ev)
      wx.navigateTo({
        url: '/pages/article/main?uuid=' + uuid,
        success: function () {
          // console.log('clickHandle success:', uuid, ev)
        },
        fail: function () {
          console.log('clickHandle fail:', uuid, ev)
        },
        complete: function () {
          // console.log('clickHandle:', uuid, ev)
        }
      })
    },
    getHotTopic () {
      let vm = this
      console.log('debug=====start')
      wx.request({
        url: wx.getStorageSync('requestUrl') + '/small/article/keywords',
        method: 'GET',
        data: {
          nickname: '',
          babyid: ''
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('debug=====sucess')
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].MissedAt = formatTimeMin(new Date(res.data[i].MissedAt))
            res.data[i].BirthedAt = formatTime(new Date(res.data[i].BirthedAt))
          }
          vm.items = vm.items.concat(res.data)
          console.log('debug=====', vm.items)
        },
        fail: function (res) {
          console.log('debug=====fail')
        },
        compelte: function (e) {
          console.log('==', this.keyWords)
          // console.log('e', e, vm.items)
        }
      })
    },
    getArticle (uuid) {
      if (uuid === '') {
        return
      }
      console.log('getArticle====', uuid)
      let vm = this

      wx.request({
        url: vm.apiurl + uuid,
        method: 'GET',
        data: {
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.statusCode === 200) {
            vm.items = res.data
            vm.items.MissedAt = formatTimeMin(new Date(vm.items.MissedAt))
            vm.items.BirthedAt = formatTime(new Date(vm.items.BirthedAt))
            console.log('getArticle====items', vm.items)
          } else {
            wx.showLoading({
              title: '加载失败 : ' + res.statusCode
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
          }
        },
        fail: function (res) {
          wx.showLoading({
            title: '网络 : ' + res.statusCode
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        }
      })
    },
    chooseResult (e) {
      this.inputShowed = false
      console.log('chooseResult xxxxxxx', e.mp)
    },
    getLocationMarkers () {
      let vm = this
      wx.request({
        url: wx.getStorageSync('requestUrl') + '/small/location/markers' + '?latitude=' + wx.getStorageSync('userLocation').latitude + '&longitude=' + wx.getStorageSync('userLocation').longitude,
        method: 'GET',
        data: {
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.statusCode === 200) {
            vm.markers = res.data
            console.log('getLocationMarkers====items', vm.markers)
          } else {
            wx.showLoading({
              title: '加载失败 : ' + res.statusCode
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
          }
        },
        fail: function (res) {
          wx.showLoading({
            title: '网络 : ' + res.statusCode
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        }
      })
    },
    openSuccess () {
      wx.navigateTo({
        url: '../uploader/main'
      })
    },
    onPostClick () {
      wx.navigateTo({
        url: '/pages/publish/main'
      })
    }
  }
}
</script>

<style scoped>
.searchbar-result {
  margin-top: 0;
  font-size: 14px;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12px 15px 12px 35px;
}

.slide-image {
  width: 100%;
  height: 100%;
}

.btn-post {
    float: right;
    position: fixed;
    bottom: 40rpx;
    right: 20rpx;  
    height: 120rpx;
    width: 120rpx;
}
.bh-index-page {
  padding-bottom: 20rpx;
}
.bh-search-mod .weui-icon-search {
  vertical-align: -6rpx;
}
</style>