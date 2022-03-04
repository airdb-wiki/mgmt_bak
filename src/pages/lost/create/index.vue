<template>
  <view> 走失信息录入 </view>

  <view>
    <text>姓名</text>
    <input type="text" placeholder="张三" focus />
  </view>

  <text>性别</text>
  <radio-group>
    <label class="example-body__label" for="1" key="1">
      <radio id="1" value="男" />
      男
    </label>
    <label class="example-body__label" for="2" key="2">
      <radio id="2" value="女" :checked="true" />
      女
    </label>
  </radio-group>

  <view class="page-section">
    <text>>出生日期</text>
    <view>
      <picker mode="date" @change="onDateChange">
        <view class="picker"> 当前选择：{{ dateSel }} </view>
      </picker>
    </view>
  </view>

  <view class="page-section">
    <text>>失踪日期</text>
    <view>
      <picker mode="date" @change="onDateChange">
        <view class="picker"> 当前选择：{{ dateSel }} </view>
      </picker>
    </view>
  </view>

  <text>身高(CM)</text>
  <input type="text" placeholder="170" focus />

  <text>走失详细地址</text>
  <input type="text" placeholder="公益街道0017号" focus />

  <text>特征</text>
  <view class="components-page">
    <rich-text :nodes="nodes"></rich-text>
  </view>

  <text>信息来源</text>
  <input type="text" placeholder="9958救援平台" focus />

  <text>跟进志愿者</text>
  <input type="text" placeholder="邯郸救援队" focus />
</template>

<script>
import "./index.less";

export default {
  setup() {},
  methods: {
    onShareAppMessage() {
      return {
        title: "xx",
      };
    },
    onQueryClear() {},
  },
};
</script>

<style lang="less">
</style>