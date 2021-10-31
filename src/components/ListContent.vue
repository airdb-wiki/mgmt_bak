<template>
  <view class="listContent">
    <AtList v-for="(item, index) in list" :key="index" class="article_list">
      
      <AtCard @click="jumpToDetail(item.id)">
      <view class="article_list_item">
        <view
          class="article_detail"
        >

          <view class="artclie_text_msg">
            <view class="article_author">
              <view class="nickname">{{ item.nickname }}</view>
            </view>
            <view class="article_title"> {{ item.title }}</view>
            
      
            <view>
              <view> <text style="color:red;">失踪时间：</text> {{item.missed_at}}</view>
              <view> <text style="color:red;">失踪地点：</text> {{item.missed_address}}</view>
            </view>
  

          </view>
        </view>
      </view>
      </AtCard>
    </AtList>
  </view>
</template>

<script>
import { computed, defineComponent, PropType, toRefs } from "vue";
import { AtButton, AtList, AtListItem } from "taro-ui-vue3";
import Taro from '@tarojs/taro';

export default defineComponent({
  name: "ListContent",
  props: ["list"],
  components: {
    AtButton,
    AtList,
    AtListItem,
  },
  data() {
    return {};
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
		    url: `/pages/article/detail/index?id=${id}`
        // url: 'pages/article/detail?id='+id
		  })
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
.listContent {
  .article_list_item {
    box-sizing: border-box;
    background: #fff;
    // margin-bottom: 20rpx;
    .article_detail {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f5f6f6;
      padding: 20rpx 40rpx;
      .artclie_text_msg {
        flex: 1;
      }
      .article_author {
        display: flex;
        align-items: center;
        padding-bottom: 16rpx;
        .img {
          height: 40rpx;
          width: 40rpx;
          border-radius: 50%;
        }
        .nickname {
          font-size: 24rpx;
          color: rgba(102, 102, 102, 1);
          margin-left: 11rpx;
        }
      }
      .article_title {
        font-size: 36rpx;
        color: #333333;
        .ellipsis;
      }
      .article_description {
        color: #999999;
        font-size: 28rpx;
        .ellipsis;
      }
       .detail-btn{
           border:none;
           background: none;
           color: #313BD1;
           width :3rem;
           float: right;
         }
    }
    .img_cover {
      width: 160rpx;
      height: 160rpx;
      border-radius: 4px;
      display: inline-block;
      margin-left: 40rpx;
    }
    .article_other {
      display: flex;
      color: #999999;
      font-size: 28rpx;
      height: 88rpx;
      align-items: center;
      view {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .img {
        height: 28rpx;
        width: 30rpx;
        margin-right: 10rpx;
      }
      .acticle_comments {
        .img {
          width: 35rpx;
        }
      }
    }
  }
}

// .listContent {
//   .article_list_item {
//     box-sizing: border-box;
//     background: #fff;
//     margin-bottom: 20rpx;
//     .article_detail {
//       box-sizing: border-box;
//       display: flex;
//       width: 100%;
//       justify-content: space-between;
//       align-items: center;
//       border-bottom: 1px solid #F5F6F6;
//       padding:20rpx 40rpx ;
//       .artclie_text_msg{
//         flex: 1;
//       }
//       .article_author {
//         display: flex;
//         align-items: center;
//         padding-bottom: 16rpx;
//         .img {
//           height: 40rpx;
//           width: 40rpx;
//           border-radius: 50%;
//         }
//         .nickname {
//           font-size: 24rpx;
//           color: rgba(102, 102, 102, 1);
//           margin-left: 11rpx;
//         }
//       }
//       .article_title{
//         font-size: 36rpx;
//         color: #333333;
//         .ellipsis
//       }
//       .article_description{
//         color: #999999;
//         font-size: 28rpx;
//         .ellipsis;
//       }
//     }
//     .img_cover {
//       width: 160rpx;
//       height: 160rpx;
//       border-radius: 4px;
//       display: inline-block;
//       margin-left: 40rpx;
//     }
//     .article_other{
//       display: flex;
//       color: #999999;
//       font-size: 28rpx;
//       height: 88rpx;
//       align-items: center;
//       div{
//         flex: 1;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//       }
//       .img{
//           height: 28rpx;
//           width: 30rpx;
//           margin-right: 10rpx;
//         }
//       .acticle_comments{
//         .img{
//           width: 35rpx;
//         }
//       }
//     }
//   }
// }
</style>
