<template>
  <view class="page_me">
    <image class="bg" :src="bgImg" />
    <view class="baseinfo1">
      <!-- <image class="head" src="{{headUrl}}"/> -->
      <open-data class="head" type="userAvatarUrl"></open-data>
      <view class="name">
        <open-data type="userNickName"></open-data>
      </view>
    </view>

    <view class="info">
      <view class="info-item">
        <image class="item-icon" :src="followImg" />
        <view class="info-title">我跟踪的</view>
        <image class="right-icon" :src="narrowImg" />
      </view>
      <view class="info-item">
        <image class="item-icon" :src="historyImg" />
        <view class="info-title">浏览记录</view>
        <image class="right-icon" :src="narrowImg" />
      </view>

      <view class="info-item" @click.stop="hello">
        <image class="item-icon" :src="historyImg" />
        <view class="info-title">联系我们</view>
        <image class="right-icon" :src="narrowImg" />
      </view>

      <AtButton class="info-item setting" @click="handleSetting">
        <image class="item-icon" :src="historyImg" />
        <view class="info-title">设置</view>
        <image class="right-icon" :src="narrowImg" />
      </AtButton>
    </view>

    <AtButton type="primary"  @click="handleMakingPhoneCallToCustomerSupport">
      联系我们
    </AtButton>

    <!--
    <view class="adContainer">
      <ad unit-id="adunit-6a89174cc83e227f" ad-intervals="30"></ad>
    </view>
    -->
  </view>
</template>

<script>
import { ref } from "vue";

import {
  AtButton,
  AtList,
  AtListItem,
  AtSearchBar,
  AtIcon,
} from "taro-ui-vue3";

import Taro from "@tarojs/taro";

import "taro-ui-vue3/dist/style/components/button.scss";

import "./index.less";

export default {
  setup() {
    const msg = ref("救助站功能开发中");
    return {
      msg,
    };
  },
  data() {
    return {
      bgImg: "https://wechat-1251018873.file.myqcloud.com/images/bg.png",
      followImg:
        "https://wechat-1251018873.file.myqcloud.com/images/me/follow.png",
      narrowImg:
        "https://wechat-1251018873.file.myqcloud.com/images/narrow.png",
      historyImg:
        "https://wechat-1251018873.file.myqcloud.com/images/me/history.png",
    };
  },
  methods: {
    handleSetting() {
      console.log("xx");
      Taro.openSetting({
        success: function (res) {
          console.log('setting succ')
        },
        fail(res){
          console.log('setting fail')
        }
      })
    },
    handleMakingPhoneCallToCustomerSupport() {
      wx.makePhoneCall({
        phoneNumber: "0435-3338090",
      });
    },
  },
};
</script>


<style lang="less">
.page_me {
  .bg {
    width: 100%;
    position: absolute;
    z-index: 1;
    height: 352rpx;
    top: 0;
  }
  .baseinfo1 {
    width: 94%;
    height: 240rpx;
    margin: 40px auto 23px;
    background: #ffffff;
    box-shadow: 0 2px 10px 4px rgba(239, 68, 49, 0.12);
    border-radius: 10px;
    position: relative;
    z-index: 2;
  }
  .head {
    display: block;
    margin: 21px auto 0;
    padding-top: 21px;
    width: 164rpx;
    height: 164rpx;
    border-radius: 82px;
  }
  .name {
    display: block;
    margin-top: 14px;
    width: 100%;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 32rpx;
    color: #4a4a4a;
    letter-spacing: 0;
    line-height: 32rpx;
  }
  .info {
    margin-bottom: 24px;
    width: 100%;
    border-top: 0.5px solid #dcdedf;
    background: white;
  }
  .info-item {
    width: 100%;
    display: flex;
    align-items: center;
    height: 82rpx;
    position: relative;
    border-bottom: 0.5px solid #dcdedf;
  }

  .info-item.setting {
    border-top:unset;
    .item-icon {
      line-height: 32rpx;
      top: 28rpx;
    }
    .info-title {
      top:0px
    }
  }
  

  .item-icon {
    position: absolute;
    width: 36rpx;
    left: 34rpx;
    height: 32rpx;
  }
  .info-title {
    position: absolute;
    left: 75px;
    font-family: PingFangSC-Regular;
    font-size: 32rpx;
    color: #4a4a4a;
    letter-spacing: 0;
  }
  .right-icon {
    position: absolute;
    width: 24rpx;
    height: 30rpx;
    top: 34rpx;
    right: 32rpx;
  }
}

/* 外层组件的宽度可设置成100%或具体数值 */
.adContainer {
  width: 100%;
}
</style>