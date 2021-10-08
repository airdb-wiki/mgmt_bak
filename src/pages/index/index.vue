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
</template>

<script>
import { ref } from "vue";
import "./index.less";

export default {
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