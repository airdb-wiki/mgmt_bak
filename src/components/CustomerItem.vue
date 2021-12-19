<template>
  <view class="customer-item">
    <view class="item-info">
      <text class="title">{{ item.title }}</text>
      <text class="desc">{{ item.desc }}</text>
    </view>
    <view class="item-btn">
      <nut-button class="btn" @tap="openCustomerService(item.id)">
        客服
      </nut-button>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { openCustomerService } from "../utils/wxkf";

export default defineComponent({
  name: "CustomerItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      openCustomerService,
    };
  },
});
</script>

<style lang="less">
.customer-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15px;
  padding: 45px 25px 20px;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  filter: drop-shadow(0 0 5px rgba(17,17,17,0.06));
  .item-info {
    .title {
      display: block;
      font-size: 36px;
      color: #240e06;
    }
    .desc {
      display: block;
      font-size: 28px;
      color: #4a4341;
    }
  }
  .item-btn {
    text-align: right;
    .btn {
      position: relative;
      width: 177px;
      height: 50px;
      border: 0;
      border-radius: 25px;
      background-image: linear-gradient(180deg, #fd8937 0%, #fd5923 100%);
      font-size: 28px;
      color: #eeeeee;
      &::after {
        content: '>';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 15px;
        font-size: 28px;
        color: #eeeeee;
        font-weight: 600;
        line-height: 50px;
        transform: scaleY(1.5);
      }
    }
  }
}
</style>