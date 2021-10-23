<template>
  <view class="index">
    <!--List of lost-->
    <view class="content">
      <ListRescueCard :list="actclieList" />
    </view>
  </view>
</template>

<script>
import { ref } from "vue";
// import "taro-ui-vue3/dist/style/components/search-bar.scss";
import "./index.less";

export default {
  setup() {
    const msg = ref("救助站开发中");
    return {
      msg,
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
