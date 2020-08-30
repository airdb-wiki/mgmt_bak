<template>
  <div class="page_article">
    <!-- <header class="header">
        <h1 class="title">
            {{ article.title }}
        </h1>
        <p class="desc">
        </p>
    </header> -->
    <wx-web-view :src="url"></wx-web-view>
    <!-- <article class="content" v-html="article.content">
    </article> -->
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Article',
  data() {
    return {
      articleId: null,
      url: 'https://studygolang.com/articles/'
    }
  },
  created() {
    // 页面创建时取到文章的ID
    this.articleId = this.$route.params.id
    // 组装URL
    this.url = this.url + this.articleId
    // 开启分享
    this.openShare(this.articleId)
  },
  methods: {
    openShare(articleId) {
      console.log(articleId)
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline'],
      })
      window.onShareAppMessage = (res) => {
        console.log(res)
        return {
          path: `/article/${articleId}`,
        }
      }
      window.onShareTimeline = (res) => {
        console.log(res)
        return {
          path: `/article/${articleId}`,
        }
      }
    }
  }
})
</script>
<style lang="less">
.page_article {
    padding: 0 20px;
    .header {
        .title {
            color:#333;
            font-size: 34rpx;
            border-bottom: 2px solid #eee;
            padding: 10px 0;
        }
        .desc {
            color:#555;
            font-size: 30rpx;
            margin: 20px 0 30px;
        }
    }
}
</style>
