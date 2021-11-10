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

  <!--Contact for phone calls-->
  <Contact></Contact>
  
  <!--List of lost info-->
  <NavBar></NavBar>
  
</template>

<script>
import { ref } from "vue";
import "./index.less";

import { AtList, AtListItem } from "taro-ui-vue3";

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
.content {
  flex: 1;
}

.connect {
  position: fixed;
  width: 180px;
  height: 56px;
  right: 10px;
  top: 48%;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
  background: red;
  .text {
    line-height: 46px;
    position: absolute;
    top: 0;
    left: 20px;
    font-family: PingFangSC-Regular;
    font-size: 36rpx;
    color: #ffffff;
    letter-spacing: 0;
  }
}
</style>