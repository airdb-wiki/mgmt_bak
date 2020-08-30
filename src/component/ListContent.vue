<template>
  <div class="listContent">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="article_list"
    >
      <div class="article_list_item" >
        <div class="article_detail" @click="jumpToDetail('/article/' + item.id)">
          <div class="artclie_text_msg">
            <div class="article_author">
              <!-- <img class="img"  :src="item.author.avatar" mode='widthFix' alt="" /> -->
              <div class="nickname">{{item.author}}</div>
            </div>
            <div class="article_title">{{item.title}}</div>
            <!-- <div class="article_description">{{item.description}}</div> -->
          </div>
          <img class="img_cover" v-if="item.cover" :src="item.cover" alt mode='widthFix' />
        </div>
        <div class="article_other">
          <div class="like">
            <img class="img" src="http://static.gocoder.top/like.png" alt="" mode="widthFix">
            {{item.likenum}}
          </div>
          <div class="acticle_comments">
            <img class="img" src="http://static.gocoder.top/comment.png" style="" alt="" mode="widthFix" >
            {{item.cmtnum}}
          </div>
          <div class="acticle_share">
            <wx-button open-type="share" @click="share(item)" style="background:#fff">
              <img class="img" src="http://static.gocoder.top/share.png" style="" alt="" mode="widthFix">
            </wx-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ListContent',
  data() {
    return {}
  },
  created() {
    // window.addEventListener('wxshow', (options) => console.log('wxshow:', options))
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    })
  },
  methods: {
    jumpToDetail(url) {
      window.location.href = url
    },
    share(article) {
      window.onShareAppMessage = (res) => {
        console.log(res)
        if (res.from === 'button') {
          return {
            title: article.title,
            path: `/article/${article.id}`,
            imageUrl: article.cover,
          }
        }
        return null
      }
    }
  },
  props: ['list']
})
</script>
<style lang="less">
.ellipsis{
  display: -webkit-box;

overflow: hidden;

text-overflow: ellipsis;

word-wrap: break-word;

white-space: normal !important;
word-break:break-all;

-webkit-line-clamp: 2;

-webkit-box-orient: vertical;

}
.listContent {
  .article_list_item {
    box-sizing: border-box;
    background: #fff;
    margin-bottom: 20rpx;
    .article_detail {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #F5F6F6;
      padding:20rpx 40rpx ;
      .artclie_text_msg{
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
      .article_title{
        font-size: 36rpx;
        color: #333333;
        .ellipsis
      }
      .article_description{
        color: #999999;
        font-size: 28rpx;
        .ellipsis;
      }
    }
    .img_cover {
      width: 160rpx;
      height: 160rpx;
      border-radius: 4px;
      display: inline-block;
      margin-left: 40rpx;
    }
    .article_other{
      display: flex;
      color: #999999;
      font-size: 28rpx;
      height: 88rpx;
      align-items: center;
      >div{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .img{
          height: 28rpx;
          width: 30rpx;
          margin-right: 10rpx;
        }
      .acticle_comments{
        .img{
          width: 35rpx;
        }
      }
    }
  }
}
</style>
