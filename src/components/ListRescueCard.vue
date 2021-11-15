<template>
  <view class="rescue-card-content over-flow-hidden">
    <view class="rescue-card-search">
      <AtSearchBar
        placeholder="城市 | 名称"
        :value="keyword"
        :onChange="changeKeyword"
        :onActionClick="search"
      />
    </view>
    <view class="rescue-card-listContent">
      <scroll-view :scroll-y="true" style="height: 1200rpx;" @scrolltoupper="upper" @scrolltolower="lower">
      <AtList
        v-for="(item, index) in rescueCards"
        :key="index"
        class="article_list"
      >
        <view class="rescue-card-listContent-item">
          <view class="item-head over-flow-hidden">
            <view class="item-head-name pull-left">{{ item.name }}</view>
            <view class="item-head-address pull-right">{{ item.city }}</view>
          </view>
          <view class="item-content">
            <view class="item-content-btn over-flow-hidden">
              <view class="item-content-btn-item pull-right">{{
                item.district
              }}</view>
            </view>
            <view class="item-content-time">
              <!-- <view class="item-content-icon">
                  
                  </view>   -->
              <view class="item-content-timestr">
                <text class="time-text-color">
                  <AtIcon value="bell" size="18" color="#5A5A5A"></AtIcon>
                  上班时间：
                </text>
                <text>10:00</text>
              </view>
              <view class="item-content-timestr">
                <text class="time-text-color">
                  <AtIcon value="home" size="18" color="#5A5A5A"></AtIcon>
                  下班时间：
                </text>
                <text>18:00~20:00不等</text>
              </view>
            </view>
          </view>
          <view class="item-footer over-flow-hidden">
            <view class="item-footer-createAt pull-left"
              >更新时间：{{ item.createAt }}</view
            >
            <AtButton
              size="small"
              @click="jumpToDetail(item.id)"
              class="pull-right detail-btn"
              >> 查看详情</AtButton
            >
          </view>
        </view>
      </AtList>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { computed, defineComponent, PropType, toRefs } from "vue";
import {
  AtButton,
  AtList,
  AtListItem,
  AtSearchBar,
  AtIcon,
} from "taro-ui-vue3";
import Taro from "@tarojs/taro";

import { listRescue, queryRescue, searchRescue } from "../utils/api";

import "taro-ui-vue3/dist/style/components/search-bar.scss";
import "taro-ui-vue3/dist/style/components/button.scss";
import "taro-ui-vue3/dist/style/components/icon.scss";
import "taro-ui-vue3/dist/style/components/list.scss";
import "taro-ui-vue3/dist/style/components/loading.scss";

export default defineComponent({
  name: "ListRescueCard",
  props: ["list"],
  components: {
    AtButton,
    AtList,
    AtListItem,
    AtSearchBar,
  },
  data() {
    return {
      cards: [
        {
          id: 1,
          name: "xxx 救助站123",
          is24Hours: true,
          startedAt: 1635007882,
          endedAt: 1635007882,
          province: "深圳",
          createAt: 1635007882,
        },
        {
          id: 2,
          name: "yyy 救助站",
          is24Hours: true,
          startedAt: 1635007882,
          endedAt: 1635007882,
          province: "深圳",
          createAt: 1635007882,
        },
        {
          id: 3,
          name: "zzz 救助站",
          is24Hours: true,
          startedAt: 1635007882,
          endedAt: 1635007882,
          province: "深圳",
          createAt: 1635007882,
        },
        {
          id: 3,
          name: "zzz 救助站",
          is24Hours: true,
          startedAt: 1635007882,
          endedAt: 1635007882,
          province: "深圳",
          createAt: 1635007882,
        },
        {
          id: 3,
          name: "zzz 救助站",
          is24Hours: true,
          startedAt: 1635007882,
          endedAt: 1635007882,
          province: "深圳",
          createAt: 1635007882,
        },
      ],
      currentPage: 1, // default currentPage is 1
      rescueCards: [],
      keyword: "",
    };
  },
  created() {
    console.log("xxxxxxxxxxxxxxcreated_list_content");
    listRescue(this.currentPage).then((res) => {
      this.rescueCards = res.data;
      console.log("xxx act", this.rescueCards);
    });
    // window.addEventListener('wxshow', (options) => console.log('wxshow:', options))
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  methods: {
    searchRescue(e) {
      searchRescue().then((res) => {
        console.log("search rescue", res.data);
      });
    },
    jumpToDetail(id) {
      Taro.navigateTo({
        url: `/pages/article/detail/index?id=${id}`,
        // url: 'pages/article/detail?id='+id
      });
    },
    share(article) {
      window.onShareAppMessage = (res) => {
        console.log(res);
        if (res.from === "button") {
          return {
            title: article.title,
            path: `/article/${article.id}`,
            imageUrl: article.cover,
          };
        }
        return null;
      };
    },
    //  获取字符长度
    getLength(str) {
      return str.replace(/[\u0391-\uFFE5]/g, "aa").length; //先把中文替换成两个字节的英文，在计算长度
    },
     // 重新加载
    upper(e) {
      listRescue(1).then((res) => {
            this.rescueCards = res.data;
            this.currentPage = 1
      });
    },

    // 加载分页
    lower(e) {
      let page = this.currentPage + 1
      listRescue(page).then((res) => {
        if (res.data.length > 0) {
            this.rescueCards = this.rescueCards.concat(res.data);
            this.currentPage = page
        }
      });
    },
    changeKeyword(val){
        this.keyword = val
    },
    search(){
      listRescue(1,this.keyword).then((res) => {
          this.rescueCards = res.data;
          this.currentPage = 1
      });
    },
  },
});
</script>

<style lang="less">
.ellipsis {
  display: -webkit-box;

  overflow: hidden;

  text-overflow: ellipsis;

  word-wrap: break-word;

  white-space: normal !important;
  word-break: break-all;

  -webkit-line-clamp: 2;

  -webkit-box-orient: vertical;
}
.pull-left {
  float: left;
}
.pull-right {
  float: right;
}
.over-flow-hidden {
  overflow: hidden;
}
.rescue-card-content {
  border: 1ps solid #b5cbfa;
  width: 100%;
  padding: 0 1%;
  .rescue-card-search {
    position: fixed;
    height: 2.4rem;
    width: 98%;
    z-index: 100;
    padding: 1% 0;
    background: #fff;
  }

  .rescue-card-listContent {
    width: 98%;
    margin-top: 4rem;
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
        }
      }
    }
  }
}
</style>
