<template>
  <view class="thank-container">
    <nut-collapse v-model:active="activeName" icon="down-arrow">
      <nut-collapse-item title="公司" :name="1">
        <nut-cell-group>
          <nut-cell v-for="(item, index) in company" :key="index" :title="item.name" />
        </nut-cell-group>
      </nut-collapse-item>
      <nut-collapse-item title="团队" :name="2">
        <nut-cell-group>
          <nut-cell v-for="(item, index) in team" :key="index" :title="item.name" />
        </nut-cell-group>
      </nut-collapse-item>
      <nut-collapse-item title="个人" :name="3">
        <nut-cell-group>
          <nut-cell v-for="(item, index) in person" :key="index" :title="item.name" />
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
          name: '公司名称1',
        },
        {
          name: '公司名称2',
        },
        {
          name: '公司名称3',
        }
      ],
      team: [
        {
          name: '团队名称1',
        },
        {
          name: '团队名称2',
        },
        {
          name: '团队名称3',
        }
      ],
      person: [
        {
          name: 'Dean CN <dean@airdb.com>',
        },
        {
          name: 'bobohuochai <feng1987a@163.com>',
        },
        {
          name: 'Yino <m15829090357@163.com>',
        },
        {
          name: 'jerry-shao <com.jerryshao@jerryshao.com>',
        }
      ]
    };
  },
};
</script>

<style lang="less">
</style>
