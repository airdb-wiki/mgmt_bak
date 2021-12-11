<template>
  <swiper
    class="banner"
    indicator-color="#999"
    indicator-active-color="#333"
    :vertical="false"
    :circular="true"
    :indicator-dots="true"
    :autoplay="true"
  >
    <swiper-item v-for:="item in background">
      <image :src="item" class="banner-item" mode="widthFix" />
    </swiper-item>
  </swiper>

  <!--Contact for phone calls-->
  <Contact></Contact>

  <NavBar @change="onNavBarChange"></NavBar>

  <view class="lost-list-container">
    <!-- nut-searchbar @search事件失效.. -->
    <nut-searchbar
      v-model="query.keyword"
      placeholder="搜索"
      @clear="onQueryClear"
      @blur="refreshList"> 
    <template v-slot:leftin>
      <nut-icon size="14" name="search2"></nut-icon>
    </template>
  </nut-searchbar>


    
    <!--List of lost info-->
    <view class="content">
      <content-item
        v-for="item in list"
        :key="item.id"
        :item="item"
      />
    </view>
  </view>
</template>

<script>
import Taro, { stopPullDownRefresh } from "@tarojs/taro";
import { ref } from "vue";
import { useList } from "../../composables/index";
import { API_LIST } from "../../utils/api";
import Contact from '../../components/Contact.vue';
import NavBar from '../../components/NavBar.vue';
import ContentItem from '../../components/ContentItem.vue';
import "./index.less";

export default {
  components: { Contact, NavBar, ContentItem },
  onPullDownRefresh() {
    this.refreshList(stopPullDownRefresh)
  },
  onReachBottom() {
    this.loadList()
  },
  setup() {
    const { query, list, loadList, refreshList } = useList({ url: API_LIST.lost,queryDefault:{category:1} })
    const background = [
      "https://wechat-1251018873.file.myqcloud.com/images/banner.png",
      "https://wechat-1251018873.file.myqcloud.com/images/banner.png",
      "https://wechat-1251018873.file.myqcloud.com/images/banner.png",
    ]

    return {
      query,
      list,
      loadList,
      refreshList,
      background
    };
  },
  methods: {
    onShareAppMessage() {
      return {
        title: "xx",
      };
    },
    onNavBarChange(activeBar){
      this.query.category = activeBar
      this.refreshList()
    },
    onQueryClear(){
      this.query = ''
      this.refreshList()
    }
    
  },
};
</script>

<style lang="less">
.lost-list-container {
  flex:1;
  background-color: #97939726;
  padding:24rpx;
  >.nut-searchbar {
    background-color: unset;
  }
}
.miniprogram-root {
  .for-web {
    display: none;
  }
}
.swiper {
  margin-top: 20rpx;
  width: 100%;
  height: 300rpx;
}
.banner-item {
  display: block;
  margin: auto;
  width: 95%;
  border-radius: 20rpx;
}
.content {
  flex: 1;
}

.connect {
  position: fixed;
  width: 180px;
  height: 56px;
  right: 10px;
  top: 48%;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
  background: red;
  .text {
    line-height: 46px;
    position: absolute;
    top: 0;
    left: 20px;
    font-family: PingFangSC-Regular;
    font-size: 36rpx;
    color: #ffffff;
    letter-spacing: 0;
  }
}
</style>