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
  z-index: 160;
  width: 160px;
  height: 28px;
  right: 10px;
  top: 48%;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
  background: red;
  .img {
    position: absolute;
    left: 8px;
    top: 4px;
    width: 20px;
    height: 20px;
  }
  .text {
    line-height: 28px;
    position: absolute;
    top: 0;
    left: 40px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0;
  }
}
</style>