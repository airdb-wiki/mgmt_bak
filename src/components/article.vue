<template>
  <div>
    <Header class="cnt">
    <wx-button @click="onClickBack">上一页</wx-button>
    <wx-button @click="onClickBack">下一页</wx-button>
    </Header>


    <img class="bg" src=""/>
    <img class="head" :src="item.avatar_url" />

    <view class="name">{{item.nickname}}</view>
    <view class="id">档案ID：{{item.babyid}}</view>

        <view class="info">
            <view class="info-item">
                <view class="info-title">性别</view>
                <view class="info-content">{{item.gender}}</view>
            </view>
            <view class="info-item">
                <view class="info-title">出生日期</view>
                <view class="info-content">{{item.birthed_at}}</view>
            </view>
            <view class="info-item">
                <view class="info-title">户籍地点</view>
                <view class="info-content">
                  {{item.birthed_province + item.birthed_city + item.birthed_country}}
                </view>
            </view>
        </view>


              <view class="tag">失踪时信息</view>
        <view class="info">
            <view class="info-item">
                <view class="info-title">失踪时间</view>
                <view class="info-content">{{item.missed_at}}</view>
            </view>
            <view class="info-item">
                <view class="info-title">失踪地点</view>
                <view class="info-content">{{item.missed_address}}</view>
            </view>
            <view class="info-item">
                <view class="info-title">失踪时身高</view>
                <view class="info-content">{{item.Height}}</view>
            </view>
            <view class="info-item feature">
                <view class="info-title">失踪人特征</view>
                <view class="info-content">{{item.subject}}</view>
            </view>
        </view>

                <view class="tag">寻亲信息</view>
        <view class="info">
            <view class="info-item">
                <view class="info-title">寻亲编号</view>
                <view class="info-content">{{item.babyid}}</view>
            </view>
            <view class="info-item">
                <view class="info-title">寻亲类别</view>
                <view class="info-content">{{item.category}}</view>
            </view>
            <view class="info-item feature">
                <view class="info-title">信息来源</view>
                <view class="info-content" @tap="handleLongPress">{{item.data_from}}</view>
            </view>
            <view class="info-item">
                <view class="info-title">跟进志愿者</view>
                <view class="info-content">{{item.volunteer}}</view>
            </view>
        </view>

        <view class="tag">其他资料</view>
        <view class="info">
            <view class="info-item feature">
                <view class="info-title">其他资料</view>
                <view class="info-content">{{item.details}}</view>
            </view>
        </view>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ShowArticle',
  props: ['item'],
  data() {
    return {}
  },
  created() {
    console.log('xxxxxxxxxxxxxcomponent_article', this.item)
    // window.addEventListener('wxshow', (options) => console.log('wxshow:', options))
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    })
  },
  methods: {
    onClickBack() {
      console.log('onClickBack')
    },
    handleLongPress() {
      console.log('handleLongPress')
    },
    jumpToDetail(jurl) {
      this.url = '/article/111?data={aaa=11,bb=22}'
      console.log('xxxurl', jurl)
      window.location.href = '/article/111'
      // window.location.href = jurl
    },
    share(article) {
      window.onShareAppMessage = (res) => {
        console.log(res)
        if (res.from === 'button') {
          return {
            title: article.title,
            path: `/article/${article.id}`,
            imageUrl: article.cover,
          }
        }
        return null
      }
    }
  },
})
</script>

<style lang="less">
    .bg {
        width: 100%;
        position: absolute;
        z-index: 1;
        height: 140px;
        top: 0;
    }
    .head {
        display: block;
        z-index: 2;
        margin: 13px auto 0;
        width: 110px;
        height: 110px;
        border-radius: 110px;
    }
    .name {
        display: block;
        z-index: 2;
        margin-top: 20px;
        width: 100%;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: 22px;
    }
    .id {
        display: block;
        z-index: 2;
        margin-top: 20px;
        margin-bottom: 13px;
        width: 100%;
        text-align: center;
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: 22px;
    }
    .info {
        margin-bottom: 24px;
        width: 100%;
        border-top: .5px solid #DCDEDF;
        background: white;
    }
    .info-item {
        width: 100%;
        min-height: 50px;
        position: relative;
        border-bottom: .5px solid #DCDEDF;
    }
    .info-title {
        position: absolute;
        left: 17px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: 50px;
    }
    .info-content {
        margin-left: 135px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #737B7F;
        letter-spacing: 0;
        line-height: 50px;
        text-align: right;
        width: 226px;
        word-wrap: break-word;
    }
    .feature {
        min-height: 50px;
        .info-content {
            padding-top: 10px;
            padding-bottom: 10px;
            line-height: 20px;
        }
    }
    .tag {
        margin-bottom: 8px;
        line-height: 20px;
        margin-left: 17px;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #454F55;
        letter-spacing: 0;
    }
</style>
