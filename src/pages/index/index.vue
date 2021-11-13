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

  <AtSearchBar
    v-model:value="keyword"
    placeholder="姓名 | 编号 | 城市"
    @ActionClick="updatePage(1)"
  />

  <NavBar></NavBar>
  
  <!--List of lost info-->
  <view class="content">
    <ListContent
      :list="actclieList"
      :currentPage="currentPage"
      @updatePage="updatePage"
    />
  </view>
</template>

<script>
import { stopPullDownRefresh } from "@tarojs/taro";
import { ref } from "vue";
import { AtSearchBar } from "taro-ui-vue3";
import { listLost } from "../../utils/api";
import "taro-ui-vue3/dist/style/components/search-bar.scss";
import "./index.less";

export default {
  components: { AtSearchBar },
  async onPullDownRefresh() {
    await this.updatePage(1)
    stopPullDownRefresh()
  },
  setup() {
    const keyword = ref('')
    const currentPage = ref(1)
    const actclieList = ref([])
    const background = [
      "https://wechat-1251018873.file.myqcloud.com/images/banner.png",
      "https://wechat-1251018873.file.myqcloud.com/images/banner.png",
      "https://wechat-1251018873.file.myqcloud.com/images/banner.png",
    ]

    updatePage(1)

    async function updatePage(page) {
      console.log(keyword.value);
      await listLost(page, keyword.value).then((res) => {
        if (res.data.length > 0){
          if (page === 1){
            actclieList.value = res.data;
          }else{
            actclieList.value = actclieList.value.concat(res.data);
          }
          
          currentPage.value = page;
        }
      });
    }

    return {
      keyword,
      currentPage,
      actclieList,
      background,
      updatePage,
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