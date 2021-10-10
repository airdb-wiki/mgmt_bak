<template>
  <swiper
    class="banner"
    indicator-color="#999"
    indicator-active-color="#333"
    :vertical="false"
    :circular="true"
    :indicator-dots="true"
    :autoplay="true"
  >
    <swiper-item v-for:="item in background">
      <image :src="item" class="banner-item" mode="widthFix" />
    </swiper-item>
  </swiper>

  <view>
    <AtButton>按钮文案</AtButton>
    <AtButton type="primary">按钮文案</AtButton>
    <AtButton type="secondary">按钮文案</AtButton>
  </view>

  <view>
    <AtList>
      <AtListItem title="标题文字" onClick="{this.handleClick}" />
      <AtListItem title="标题文字" arrow="right" />
      <AtListItem title="标题文字" extraText="详细信息" />
      <AtListItem title="禁用状态" disabled extraText="详细信息" />
    </AtList>
  </view>
</template>

<script>
import { ref } from "vue";
import "./index.less";
import { AtButton } from "taro-ui-vue3";
import { AtList, AtListItem } from "taro-ui-vue3";

export default {
  components: {
    AtButton,
    AtList,
    AtListItem,
  },
  setup() {
    const msg = ref("Hello world");
    const bg = "https://wechat-1251018873.file.myqcloud.com/images/banner.png";
    return {
      msg,
      bg,
    };
  },
  data() {
    return {
      background: [
        "https://wechat-1251018873.file.myqcloud.com/images/banner.png",
        "https://wechat-1251018873.file.myqcloud.com/images/banner.png",
        "https://wechat-1251018873.file.myqcloud.com/images/banner.png",
      ],
    };
  },
  methods: {
    onShareAppMessage() {
      return {
        title: "xx",
      };
    },
  },
};
</script>

<style lang="less">
.miniprogram-root {
  .for-web {
    display: none;
  }
}
.swiper {
  margin-top: 20rpx;
  width: 100%;
  height: 300rpx;
}
.banner-item {
  display: block;
  margin: auto;
  width: 95%;
  border-radius: 20rpx;
}
</style>