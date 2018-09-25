<template>


  <div class="page1 bh-topic-page">
    <!--
    <block class="userinfo-address">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{showmessage}}</block>
    -->
      <div class="weui-cells weui-cells_after-title">



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
    </div>
    
    <div class="publish-card-wrap">
      <div class="publish-card-list">
        <publish-card
          v-for="(item, index) in items" :key="index"
          :isFollow="isFollow"
          :publishInfo="item"
          :handleClick="handleClickPubCard"
          :handleFollow="handleFollow">     
          </publish-card>
      </div>
    </div>

  
  </div>


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
      isFollow: false,
      tabs: ['智能推荐', '最新发布', '最近更新', '我的关注'],
      types: ['nearby', 'lastpublish', 'lastupdate', 'recommend'],
      activeIndex: 0,
      fontSize: 30,
      parms: {
        type: 'nearby',
        page: 1
      },
      showmessage: '今年，宝贝回家十岁了，我们促成了近两千家庭的团圆，未来，宝贝回家的下一个十年，我们将见证更多的美满！衷心祝福你们，那些团圆的父母和孩子!',

      items: []
    }
  },
  onLoad: function () {
    console.log('===topic onload test ======:')
    this.getTopicInfo()
  },
  methods: {
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
    bindAccountChange (e) {
      this.accountsIndex = e.mp.detail.value
    },
    clickHandle (uuid) {
      console.log('clickHandle:', uuid)
      wx.navigateTo({
        url: '../article/main?uuid=' + uuid,
        success: function () {
          console.log('clickHandle success:', uuid)
        },
        fail: function () {
          console.log('clickHandle fail:', uuid)
        },
        complete: function () {
          console.log('clickHandle:', uuid)
        }
      })
      // this.$router.push({path: '/pages/logs/main', query: {id: '2'}})
    },
    tabClick (e) {
      console.log(e)
      this.activeIndex = e.currentTarget.id
      this.parms.type = this.types[e.currentTarget.id]
      this.parms.page = 1
      // this.items = []
      this.getTopicInfo()
    },
    onPullDownRefresh: function () {
      wx.showLoading({
        title: '加载中'
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      wx.stopPullDownRefresh()
    },
    getTopicInfo () {
      let vm = this
      wx.request({
        url: wx.getStorageSync('requestUrl') + '/small/article/topics',
        method: 'GET',
        data: {
          type: this.parms.type,
          page: this.parms.page
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].MissedAt = formatTimeMin(new Date(res.data[i].MissedAt))
            res.data[i].BirthedAt = formatTime(new Date(res.data[i].BirthedAt))
          }

          vm.items = vm.items.concat(res.data)
          console.log('not 0, add 5 , xxx', vm.items.length)
        },
        compelte: function (e) {
          console.log('e', e, vm.items)
        }
      })
    },
    openSuccess () {
      wx.navigateTo({
        url: '../uploader/main'
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '公益项目',
      desc: '10岁丢失宝贝',
      path: '/pages/home/main?from=forward'
    }
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '下拉更新'
    })
    this.getTopicInfo()
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    wx.showLoading({
      title: '加载更多'
    })
    this.parms.page += 1
    this.getTopicInfo()
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  }
}
</script>

<style scoped>
.publish-card-wrap {
  position: relative;
  background: #efeff4;
  padding: 25rpx 0;
  margin-top: -12rpx;
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
  float: left;  /* 浮动 */
}

.userinfo-nickname {
  margin-top: 0rpx;
  font-size: 40rpx;
  color: #aaa;
  font-weight: bold;
}
.userinfo-address {
  margin-top: 0rpx;
  font-size: 30rpx;
  color: #aaa;
  padding: 20px;
}
.others30 {
  font-size: 30rpx;
}
.clear {
  clear: both; /*主要使用这个属性来清除浮动*/
  /*为了不让ie具有一定的空间，个人建议加上下面三个属性*/
  height: 0;
  line-height: 0;
  font-size: 0;
}
.bh-topic-page {
  background: #fff;
}
.weui-navbar__slider {
  width: 25%;
}
.weui-navbar__slider_1 {
  transform: translateX(100%);
}
.weui-navbar__slider_2 {
  transform: translateX(200%);
}
.weui-navbar__slider_3 {
  transform: translateX(300%);
}
.weui-navbar__slider_4 {
  transform: translateX(400%);
}
.weui-tab__content {
  height: 80rpx;
  padding: 0 20rpx;
  font-size: 30rpx;
  line-height: 80rpx;
  color: #000;
}
.topic-list-wrap {
  padding: 0 20rpx;
}
.topic-list li:not(:last-child) {
  border-bottom: 1px solid #f5f5f5;
}
</style>