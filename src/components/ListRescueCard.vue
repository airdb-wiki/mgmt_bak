<template>
  
  <view class="rescue-card-content over-flow-hidden">
    <view class="rescue-card-search">
      <AtSearchBar
        placeholder="城市 | 名称"
        value=""
        onChange=""
        onActionClick=""
      />
    </view>
    <view class="rescue-card-listContent">
      <AtList v-for="(item, index) in cards" :key="index" class="article_list">
        
          <view class="rescue-card-listContent-item">
              <view class="item-head over-flow-hidden">
                <view class="item-head-name pull-left">{{item.name}}</view>
                <view class="item-head-address pull-right">{{item.province}}</view>
              </view>
              <view class="item-content">
              <view class="item-content-btn over-flow-hidden">
                  <view class="item-content-btn-item pull-right">区域解决方案</view>
              </view>
                <view class="item-content-time">
                  <view class="item-content-icon">
                  
                  </view>  
                  <view class="item-content-timestr">
                    <text>个人上班时间</text>
                    <text>10:00</text>
                  </view>  
                  <view class="item-content-timestr">
                    <text>个人下班时间</text>
                    <text>18:00~20:00不等</text>
                  </view>  
                </view>
                
              </view>
              <view class="item-footer">
                <view class="item-footer-createAt">上传时间:</view>
                <!-- <AtButton size='small'>前往详情界面</AtButton> -->
                <!-- <AtButton @click="jumpToDetail(item.id)"  size='small'></AtButton> -->
              </view>
          </view>
        
      </AtList>
  </view>
  </view>

  
</template>

<script>
import { computed, defineComponent, PropType, toRefs } from "vue";
import { AtButton, AtList, AtListItem, AtSearchBar } from "taro-ui-vue3";
import Taro from "@tarojs/taro";

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
      ],
    };
  },
  created() {
    console.log("xxxxxxxxxxxxxxcreated_list_content");
    // window.addEventListener('wxshow', (options) => console.log('wxshow:', options))
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  methods: {
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
.pull-left{
  float:left;
}
.pull-right{
  float:right;
}
.over-flow-hidden{
  overflow: hidden;
}
.rescue-card-content {
  border: 1ps solid #B5CBFA;
  width:100%;
  padding: 0 1%;
  .rescue-card-search{
    border: 1px solid #B5CBFA;
    position: fixed;
    height:2.4rem;
    width:98%;
    z-index: 100;
    padding: 1% 0;
  }

  .rescue-card-listContent{
    width:98%;
    margin-top:4rem;
   
     
     .rescue-card-listContent-item{
      border: 1px solid #B5CBFA;
      border-radius:.5rem;
      margin-top: .5rem;
       .item-head{
          border-bottom: 1px solid #E4EBF3;
          height: 2rem;
          line-height: 2rem;
          padding:.5rem;
          color:#6E788A;
          font-weight: bolder;
       }
      .item-content-btn{
          padding:2rem;
          
         .item-content-btn-item{
          background: #81A3EE;
          color:#fff;
          width:5rem;
          font-size: .8rem;
          padding: .3rem;
          border-radius:.2rem;
          margin-right: 1rem;
          
        }
      
      }
      
     }
  }
}
</style>
