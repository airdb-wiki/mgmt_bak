<template>
  <view class="thank-container">
    <nut-collapse v-model:active="activeName" icon="down-arrow">
      <nut-collapse-item title="公司" :name="1">
        <nut-cell-group>
          <nut-cell
            v-for="(item, index) in company"
            :key="index"
            :title="item.name"
          />
        </nut-cell-group>
      </nut-collapse-item>
      <nut-collapse-item title="团队" :name="2">
        <nut-cell-group>
          <nut-cell
            v-for="(item, index) in team"
            :key="index"
            :title="item.name"
          />
        </nut-cell-group>
      </nut-collapse-item>
      <nut-collapse-item title="个人" :name="3">
        <nut-cell-group>
          <nut-cell
            v-for="(item, index) in person"
            :key="index"
            :title="item.name"
          />
        </nut-cell-group>
      </nut-collapse-item>
    </nut-collapse>
  </view>
</template>

<script>
import { ref } from "vue";
import Taro from "@tarojs/taro";
import "./index.less";

export default {
  setup() {
    const activeName = ref([]);

    return {
      activeName,
    };
  },
  data() {
    return {
      company: [
        {
          name: "西部数码",
        },
        {
          name: "四川基因格司法鉴定中心",
        },
        {
          name: "腾讯",
        },
        {
          name: "百度",
        },
        {
          name: "亚洲诚信",
        },
      ],
      team: [
        {
          name: "宝贝回家技术公益团队",
        },
        {
          name: "宝贝回家 X 微信搜一搜 项目组",
        },
        {
          name: "宝贝回家 X 微信客服 项目组",
        },
        {
          name: "宝贝回家 X 百度AI寻人 项目组",
        },
      ],
      person: [
        {
          name: "Dean CN <dean@airdb.com>",
        },
        {
          name: "bobohuochai <feng1987a@163.com>",
        },
        {
          name: "Yino <m15829090357@163.com>",
        },
        {
          name: "jerry-shao <com.jerryshao@jerryshao.com>",
        },
        {
          name: "hsluoyz <hsluoyz@qq.com>",
        },
      ],
    };
  },
};
</script>

<style lang="less">
</style>
