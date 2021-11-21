
<template>
  <view class="rescue-card-listContent-item">
    <view class="item-head over-flow-hidden">
      <view class="item-head-name pull-left">{{ item.name }}</view>
      <view class="item-head-address pull-right">{{ item.city }}</view>
    </view>
    <view class="item-content">
      <view class="item-content-btn over-flow-hidden">
        <view class="item-content-btn-item pull-right">
          {{ item.district }}
        </view>
      </view>
      <view class="item-content-time">
        <!-- <view class="item-content-icon"></view> -->
        <view class="item-content-timestr">
          <text class="time-text-color">
            <nut-icon name="notice" size="18" color="#5A5A5A" />
            上班时间：
          </text>
          <text>10:00</text>
        </view>
        <view class="item-content-timestr">
          <text class="time-text-color">
            <nut-icon name="home" size="18" color="#5A5A5A" />
            下班时间：
          </text>
          <text>18:00~20:00不等</text>
        </view>
      </view>
    </view>
    <view class="item-footer over-flow-hidden">
      <view class="item-footer-createAt pull-left">
        更新时间：{{ item.createAt }}
      </view>
      <button
        size="small"
        @tap="jumpToDetail"
        class="pull-right detail-btn"
      >
        > 查看详情
      </button>
    </view>
  </view>
</template>

<script setup>
import { navigateTo } from "@tarojs/taro"
import { toRefs } from "vue"

const props = defineProps(['item'])
const { item } = toRefs(props)

function jumpToDetail() {
  navigateTo({
    url: `/pages/article/detail/index?id=${item.value.id}`,
  })
}
</script>

<style lang="less">
.pull-left {
  float: left;
}
.pull-right {
  float: right;
}
.over-flow-hidden {
  overflow: hidden;
}
.rescue-card-listContent-item {
  border: 1px solid #b5cbfa;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  .item-head {
    border-bottom: 1px solid #e4ebf3;
    height: 2rem;
    line-height: 2rem;
    padding: 0.5rem;
    color: #6e788a;
    font-weight: bolder;
  }
  .item-content {
    .item-content-btn {
      padding: 0.5rem 1rem;
      .item-content-btn-item {
        background: #81a3ee;
        color: #fff;
        width: 5rem;
        font-size: 0.8rem;
        padding: 0.3rem;
        border-radius: 0.2rem;
      }
    }
    .item-content-time {
      padding-left: 1rem;
      .item-content-timestr {
        margin-bottom: 0.5rem;
        .time-text-color {
          color: #7298f9;
        }
      }
    }
  }
  .item-footer {
    padding: 1rem;
    .item-footer-createAt {
      color: #dedede;
    }
    .detail-btn {
      border: none;
      background: none;
      color: #313bd1;
      &::after{
        content: none;
      }
    }
  }
}
</style>
