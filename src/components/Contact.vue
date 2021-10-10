<template>
  <view class="connect" @click.stop="handleClick">
    <image
      class="img"
      src="https://wechat-1251018873.file.myqcloud.com/images/phone.png"
    />
    <view class="text" @click.stop="getPhoneNum">0435-3338090</view>
  </view>
</template>


<script>
import { computed, defineComponent, PropType, toRefs } from "vue";

export default defineComponent({
  name: "Contact",
  components: {},
});
</script>

<style lang="less">
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