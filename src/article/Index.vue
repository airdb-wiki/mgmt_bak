<template>
  <div class="page_article">
    <header class="header">
        <h1 class="title">
            {{ article.title }}
        </h1>
        <p class="desc">
        </p>
    </header>

    <KView class="">
      <ShowArticle :item="article" />
    </KView>

    <!--
    <Footer class="cnt">
    <wx-button @click="onClickBack">上一页</wx-button>
    <wx-button @click="onClickBack">下一页</wx-button>
    </Footer>
    -->

    <!-- <article class="content" v-html="article.content">
    </article> -->
  </div>
</template>

<script>
import Vue from 'vue'
import ShowArticle from '../components/article.vue'
import { articleDetail } from '../api/commont'

export default Vue.extend({
  name: 'ArticleShow',
  // props: ['article'],
  components: {
    ShowArticle,
  },
  data() {
    return {
      articleId: null,
      detail: null,
      article: {
        // AvatarURL: 'https://wechat-1251018873.file.myqcloud.com/images/banner.png',
        // BabyID: 32519,
        // Gender: 1,
        // BirthedAt: 1599305851,
        // BirthedProvince: '北京',
        // BirthedCity: '北京',
        // BirthedCountry: '中国',
        // MissedAt: 1599305851,
        // MissedProvince: '广东',
        // MissedCity: '深圳',
        // MissedCountry: '中国',
        // MissedAddress: '测试测试',
        // Nickname: '王姑娘',
        // Height: '172厘米左右',
        // Subject: '1988年3月3日(农历）出生于江苏省宿迁市人民医院，被送养的王姑娘寻亲 32519',
        // DataFrom: 'https://bbs.baobeihuijia.com/thread-151906-1-1.html',
        // Category: '宝贝寻家',
        // Volunteer: '鼠尔草 跟进',
        // Details: '测试测试'
      },
    }
  },
  created() {
    // this.article = article
    console.log('xxx', this.article)
    console.log('xxx article onload', this.$route.params.id)
    console.log('xxx article onload', this.$route.params.data)
    // this.detail = article
    // 页面创建时取到文章的ID
    this.articleId = this.$route.params.id
    // 组装URL
    this.url = this.url + this.articleId
    // 开启分享
    this.openShare(this.articleId)

    articleDetail(this.$route.params.id).then((res) => {
      console.log('article detail ---->', res.data.article)
      this.article = res.data.article
    }).catch((err) => {
      console.log('article error--->', err)
    })
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
.cnt {
  margin-top: 20px;
}

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
