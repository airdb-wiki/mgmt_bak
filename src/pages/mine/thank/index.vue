<template>
  <view class="thank-container">
      <AtAccordion
        @click="onClick('companyShow')"
        title='公司'
        :isAnimation='false'
        :open="companyShow"
      >
        <AtList :hasBorder="false">
          <AtListItem
            v-for="(item, index) in company"
            :key="index"
            :title="item.name"
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          />
        </AtList>
      </AtAccordion>
      <AtAccordion
        @click="onClick('teamShow')"
        title='团队'
        :isAnimation='false'
        :open="teamShow"
      >
        <AtList :hasBorder="false">
          <AtListItem
            v-for="(item, index) in team"
            :key="index"
            :title="item.name"
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          />
        </AtList>
      </AtAccordion>
      <AtAccordion
        @click="onClick('personShow')"
        title='个人'
        :isAnimation='false'
        :open="personShow"
      >
        <AtList :hasBorder="false">
          <AtListItem
            v-for="(item, index) in person"
            :key="index"
            :title="item.name"
          />
        </AtList>
      </AtAccordion>
  </view>
</template>

<script>
import { ref } from "vue";

import {
  AtButton,
  AtList,
  AtListItem,
  AtSearchBar,
  AtIcon,
  AtAccordion
} from "taro-ui-vue3";

import Taro from "@tarojs/taro";
import "taro-ui-vue3/dist/style/components/accordion.scss";
import "./index.less";

export default {
  setup() {
    
    return {
     
    };
  },
  data() {
    return {
      value1: false,
      companyShow: false,
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
      teamShow: false,
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
      personShow: false,
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
  methods: {
    onClick(type) {
      console.log(this[type])
      this[type] = !this[type]
      console.log(this.companyShow)
    }
  },
};
</script>


<style lang="less">
  .thank-container{
    
  }
</style>
