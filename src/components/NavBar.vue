<template>
  <AtSearchBar
    placeholder="姓名 | 编号 | 城市"
    value=""
    onChange=""
    onActionClick=""
  />

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

  <view>
    <!--
    <AtList>
      <AtListItem title="标题文字" onClick="{this.handleClick}" />
      <AtListItem title="标题文字" arrow="right" />
      <AtListItem title="标题文字" extraText="详细信息" />
      <AtListItem title="禁用状态" disabled extraText="详细信息" />
    </AtList>
    -->

    <!--List of lost-->
    <view class="content">
      <ListContent :list="actclieList" :currentPage="currentPage" @updatePage="updatePage"/>
    </view>
  </view>
</template>

<script>
import { computed, defineComponent, PropType, toRefs } from "vue";

import { AtButton, AtList, AtListItem, AtSearchBar } from "taro-ui-vue3";
import { getArticles, listLost } from "../utils/api";

import "taro-ui-vue3/dist/style/components/search-bar.scss";
import "taro-ui-vue3/dist/style/components/button.scss";
import "taro-ui-vue3/dist/style/components/icon.scss";
import "taro-ui-vue3/dist/style/components/list.scss";
import "taro-ui-vue3/dist/style/components/loading.scss";

export default defineComponent({
  name: "NavBar",
  components: {
    AtButton,
    AtList,
    AtListItem,
    AtSearchBar,
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
    };
  },
  methods: {
    tabChang(activeKey) {
      this.activeKey = activeKey;
      this.$emit("onChange", activeKey);
    },
    handleClick() {
      console.log("handleClick");
    },
    searchLost(e) {
      searchLost().then((res) => {
        console.log("searchLost", res.data);
      });
    },
    updatePage(page){
        listLost(page).then((res) => {
          if (res.data.length > 0){
            if (page == 1){
              this.actclieList = res.data;
            }else{
              this.actclieList = this.actclieList.concat(res.data);
            }
            
            this.currentPage = page;
          }
        });
    },
  },
  created() {
    // console.log("xxx-created", this.currentPage);
    listLost(this.currentPage).then((res) => {
      this.actclieList = res.data;
      console.log("xxx act", this.actclieList);
    });

    // reach bottom envet 上拉触底查看历史
    // window.addEventListener("reachbottom", (evt) => {
    //   console.log("reach_bottom", evt);
    //   this.currentPage += 1;

    //   console.log("pageIndex--->", this.currentPage);
    //   listLost(this.currentPage).then((res) => {
    //     this.actclieList = this.actclieList.concat(res.data.data);
    //   });
    // });

    // // pull down refresh 上拉更新数据
    // window.addEventListener("pulldownrefresh", (evt1) => {
    //   console.log("pull_down", evt1);
    // });

    
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