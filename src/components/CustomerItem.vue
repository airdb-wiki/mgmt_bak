<template>
  <view class="customer-item">
    <view class="item-info">
      <text class="title">{{ item.title }}</text>
      <text class="desc">{{ item.desc }}</text>
    </view>
    <nut-button type="primary" @tap="openCustomerService(item.id)">联系</nut-button>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { openCustomerService } from '../utils/wxkf'

export default defineComponent({
  name: 'CustomerItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      openCustomerService,
    }
  }
})
</script>

<style lang="less">
.customer-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  .item-info {
    .title {
      display: block;
      margin-bottom: 20px;
      font-size: 32px;
    }
    .desc {
      display: block;
      font-size: 24px;
    }
  }
}
</style>