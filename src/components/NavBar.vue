<template>
  <view class="self_tabs">
    <view class="tab_header">
      <AtButton
        v-for="item in tabList"
        :key="item.key"
        @click.stop="tabChang(item.key)"
        :class="item.key === activeKey ? 'item_active' : 'item'"
      >
        {{ item.label }}
        <image
          class="icon"
          v-if="item.icon || item.activeIcon"
          :src="item.key === activeKey ? item.activeIcon : item.icon"
          style="height: 30rpx; width: 30rpx"
        />
      </AtButton>
    </view>
  </view>
</template>

<script>
import { computed, defineComponent, PropType, toRefs } from "vue";

import { AtButton } from "taro-ui-vue3";

import "taro-ui-vue3/dist/style/components/button.scss";
import "taro-ui-vue3/dist/style/components/icon.scss";

export default defineComponent({
  name: "NavBar",
  components: {
    AtButton,
  },
  data() {
    return {
      tabList: [
        {
          label: "家寻",
          key: "newest",
          // icon: "http://static.gocoder.top/unfold.png",
          // activeIcon: "http://static.gocoder.top/unfold_active.png",
        },
        { label: "寻家", key: "column" },
        { label: "其他", key: "pay" },
      ],
      activeKey: "newest",
      actclieList: [],
      currentPage: 1, // default currentPage is 1
      keyword: "",
    };
  },
  methods: {
    tabChang(activeKey) {
      this.activeKey = activeKey;
      this.$emit("onChange", activeKey);
    },
  },
});
</script>

<style lang="less">
.self_tabs {
  display: flex;
  flex-direction: column;
  .tab_header {
    display: flex;
    align-items: center;
    height: 88rpx;
    align-items: center;
    color: #999;
    border-bottom: 1rpx solid #f6f5f8;
    box-sizing: border-box;
    background: #fff;
    justify-content: space-around;

    .item {
      font-size: 32rpx;
      text-align: center;
      width: 120rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
      position: relative;
      height: 100%;
      box-sizing: border-box;

      .icon {
        margin-left: 8rpx;
      }
    }
    .item_active {
      .item;
      color: #59bf74;
      border-bottom: 4rpx solid #59bf74;
    }
  }
}
</style>