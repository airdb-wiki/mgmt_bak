<template>
  <view class="customer-service">
    <view class="customer-list">
      <customer-item
        v-for="item in list"
        :key="item.id"
        :item="item"
      />
    </view>
  </view>
</template>

<script>
import { defineComponent } from 'vue'
import {
  WXKF_ZUOHAOSHI,
  WXKF_YINGJIJIUYUAN,
  WXKF_JINJIXUNREN,
  WXKF_BBHJ,
} from '../../../utils/wxkf'
import CustomerItem from '../../../components/CustomerItem.vue'

export default defineComponent({
  components: { CustomerItem },
  setup() {
    const list = [
      {
        id: WXKF_ZUOHAOSHI,
        title: '一块做好事',
        desc: '简单的描述',
      },
      {
        id: WXKF_YINGJIJIUYUAN,
        title: '应急救援',
        desc: '简单的描述',
      },
      {
        id: WXKF_JINJIXUNREN,
        title: '紧急寻人',
        desc: '简单的描述',
      },
      {
        id: WXKF_BBHJ,
        title: '宝贝回家',
        desc: '简单的描述',
      },
    ]

    return {
      list,
    }
  }
})
</script>

<style lang="less">
.customer-service {
  padding: 20px;
  min-height: 100vh;
  background-color: #f8f8f8;
  box-sizing: border-box;
  .customer-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .customer-item {
      flex: 1 1 49%;
      max-width: 49%;
      box-sizing: border-box;
    }
  }
}
</style>