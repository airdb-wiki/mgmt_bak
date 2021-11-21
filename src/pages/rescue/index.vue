<template>
  <!-- TODO: change to `query.keyword` -->
  <nut-searchbar
    v-model="keyword"
    placeholder="城市 | 名称"
    @search="refreshList"
  />
  <view class="rescue-card-content over-flow-hidden">
    <rescue-item
      v-for="item in list"
      :key="item.id"
      :item="item"
    />
  </view>
</template>

<script>
import { stopPullDownRefresh } from "@tarojs/taro";
import { ref } from "vue";
import { useList } from "../../composables/index";
import { API_LIST } from "../../utils/api";
import RescueItem from '../../components/RescueItem.vue';
import "./index.less";

export default {
  components: { RescueItem },
  onPullDownRefresh() {
    this.refreshList(stopPullDownRefresh)
  },
  onReachBottom() {
    this.loadList()
  },
  setup() {
    const { query, list, loadList, refreshList } = useList({ url: API_LIST.rescue })
    const keyword = ref('')

    return {
      keyword,
      query,
      list,
      loadList,
      refreshList,
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

<style lang="less">
.rescue-card-content {
  border: 1ps solid #b5cbfa;
  width: 100%;
  padding: 0 1%;
  box-sizing: border-box;
}
</style>