/* eslint-disable vue/no-shared-component-data */
<template>
    <view>
        <img class="bg" :src="bgImg"/>
        <view class="baseinfo1">
            <!-- <image class="head" src="{{headUrl}}"/> -->
            <wx-open-data class="head" type="userAvatarUrl"></wx-open-data>
            <view class="name">
                <wx-open-data type="userNickName"></wx-open-data>
            </view>
        </view>

        <view class="info">
            <view class="info-item">
                <wx-image class="item-icon" :src="followImg"/>
                <view class="info-title">我跟踪的</view>
                <img class="right-icon" :src="narrowImg"/>
            </view>
            <view class="info-item">
                <img class="item-icon" :src="historyImg"/>
                <view class="info-title">浏览记录</view>
                <img class="right-icon" :src="narrowImg"/>
            </view>
            <view class="info-item">
                <img class="item-icon" :src="historyImg"/>
                <view class="info-title">联系我们</view>
                <img class="right-icon" :src="narrowImg"/>
            </view>
            <view class="info-item">
                <img class="item-icon" :src="historyImg"/>
                <view class="info-title">设置</view>
                <img class="right-icon" :src="narrowImg"/>
            </view>
        </view>
        <!-- <confirm-auth isShow='false'/> -->
    </view>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
// import ConfirmAuth from '../components/confir-auth'
export default Vue.extend({

  data() {
    return {
      bgImg: 'https://wechat-1251018873.file.myqcloud.com/images/bg.png',
      followImg: 'https://wechat-1251018873.file.myqcloud.com/images/me/follow.png',
      narrowImg: 'https://wechat-1251018873.file.myqcloud.com/images/narrow.png',
      historyImg: 'https://wechat-1251018873.file.myqcloud.com/images/me/history.png',
      headUrl: '',
      nickName: '',
      isAuthShow: 'show'
    }
  },

  props: {
    cndurl: {
      type: String,
      required: true,
      default: 'https://static.baobeihuijia.com',
    }
  },

  events: {
    getUserInfo(userInfo) {
      const headUrl = userInfo.avatarUrl
      const nickName = userInfo.nickName
      this.headUrl = headUrl
      this.nickName = nickName
      this.isAuthShow = 'hidden'
      // this.$apply()
    }
  },

  methods: {

  }

})
</script>
<style lang="less">
    .bg {
        width: 100%;
        position: absolute;
        z-index: 1;
        height: 146px;
        top: 0;
    }
    .baseinfo1 {
        width: 94%;
        height: 170px;
        margin: 40px auto 23px;
        background: #FFFFFF;
        box-shadow: 0 2px 10px 4px rgba(239,68,49,0.12);
        border-radius: 10px;
        position: relative;
        z-index: 2;
    }
    .head {
        display: block;
        margin: 21px auto 0;
        padding-top: 21px;
        width: 82px;
        height: 82px;
        border-radius: 82px;
    }
    .name {
        display: block;
        margin-top: 14px;
        width: 100%;
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: 25px;
    }
    .info {
        margin-bottom: 24px;
        width: 100%;
        border-top: .5px solid #DCDEDF;
        background: white;
    }
    .info-item {
        width: 100%;
        min-height: 46px;
        position: relative;
        border-bottom: .5px solid #DCDEDF;
    }
    .item-icon {
        position: absolute;
        width: 18px;
        top: 14px;
        left: 17px;
        height: 18px;
    }
    .info-title {
        position: absolute;
        left: 54px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: 46px;
    }
    .right-icon {
        position: absolute;
        width: 12px;
        height: 15px;
        top: 17px;
        right: 16px;
    }
</style>
