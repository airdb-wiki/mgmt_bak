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

    <nut-cell-group class="info">
      <nut-cell
        title="我跟踪的"
        is-link
        class="info-item"
        @tap="toRoute('follow')"
      >
        <template #icon>
          <image class="item-icon" :src="followImg" />
        </template>
      </nut-cell>
      <nut-cell
        title="浏览记录"
        is-link
        class="info-item"
        @tap="toRoute('history')"
      >
        <template #icon>
          <image class="item-icon" :src="historyImg" />
        </template>
      </nut-cell>
      <nut-cell
        title="特别鸣谢"
        is-link
        class="info-item"
        @tap="toRoute('thank')"
      >
        <template #icon>
          <image class="item-icon" :src="historyImg" />
        </template>
      </nut-cell>
      <nut-cell
        title="联系电话"
        is-link
        class="info-item"
        @tap="handleMakingPhoneCallToCustomerSupport"
      >
        <template #icon>
          <image class="item-icon" :src="historyImg" />
        </template>
      </nut-cell>
      <nut-cell title="设置" is-link class="info-item" @tap="handleSetting">
        <template #icon>
          <image class="item-icon" :src="historyImg" />
        </template>
      </nut-cell>
      <nut-cell
        title="公益客服"
        is-link
        class="info-item"
        @tap="toRoute('customer-service')"
      >
        <template #icon>
          <image class="item-icon" :src="historyImg" />
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-button type="info" block @tap="handleOpenCustomerServiceChat">
      技术支持
    </nut-button>

    <!--
    <view class="adContainer">
      <ad unit-id="adunit-6a89174cc83e227f" ad-intervals="30"></ad>
    </view>
    -->
  </view>
</template>

<script>
import { ref } from "vue";
import Taro from "@tarojs/taro";
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
          console.log("setting succ");
        },
        fail(res) {
          console.log("setting fail");
        },
      });
    },
    handleMakingPhoneCallToCustomerSupport() {
      wx.makePhoneCall({
        phoneNumber: "0435-3338090",
      });
    },
    handleOpenCustomerServiceChat() {
      Taro.openCustomerServiceChat({
        extInfo: {
          url: "https://work.weixin.qq.com/kfid/kfc02343d9ba414880a?sence=mp-bbhj",
        },
        corpId: "wx4aaa3fe59423b402",
        success(res) {
          console.log("xx");
          wx.showToast({
            title: "title",
          });
        },
        fail(res) {
          console.log("xxfail");
          wx.showToast({
            title: "fail",
          });
        },
      });
    },
    toRoute(url) {
      console.log(url);
      Taro.navigateTo({
        url: `/pages/me/${url}/index`,
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

  .item-icon {
    margin-right: 20rpx;
    width: 36rpx;
    height: 36rpx;
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
