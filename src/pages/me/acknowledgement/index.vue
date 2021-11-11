<template>
  <view>
    <view class="row_container">
      <view class="row_item small_row">
        <view class="label"><text>个人:</text></view>
      </view>
    </view>
    <view class="row_container">
      <view class="row_item small_row">
        <view class="label"><text>团队:</text></view>
      </view>
    </view>
    <view class="row_container">
      <view class="row_item small_row">
        <view class="label"><text>公司:</text></view>
      </view>
    </view>
  </view>
  <AtButton type="primary"  @click="handleOpenCustomerServiceChat">
    加入技术志愿者
  </AtButton>
</template>


<script>
import AtButton from "taro-ui-vue3";
import Taro from "@tarojs/taro";
export default {
  data() {
    return {
      item: {},
    };
  },
  methods: {
    handleOpenCustomerServiceChat() {
      Taro.openCustomerServiceChat({
        extInfo: { url: "https://work.weixin.qq.com/kfid/kfc02343d9ba414880a?sence=mp-bbhj" },
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
  },
  created() {
    // 建议在页面初始化时把 getCurrentInstance() 的结果保存下来供后面使用，
    // 而不是频繁地调用此 API
    this.$instance = Taro.getCurrentInstance();
  },
};
</script>