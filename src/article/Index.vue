<template>
  <KView class>
    <ShowArticle :item="article" />
  </KView>

  <!--<div class="page_article">
    <header class="header">
        <h1 class="title">
            {{ article.title }}
        </h1>
        <p class="desc">
        </p>
    </header>
    <Footer class="cnt">
    <wx-button @click="onClickBack">上一页</wx-button>
    <wx-button @click="onClickBack">下一页</wx-button>
    </Footer>
    <article class="content" v-html="article.content">
    </article> 
  </div>-->
</template>

<script>
import Vue from "vue";
import ShowArticle from "../components/article.vue";
import { articleDetail } from '../api/commont'
export default Vue.extend({
  name: "ArticleShow",
  // props: ['article'],
  components: {
    ShowArticle,
  },
  data() {
    return {
      articleId: null,
      detail: null,
      article: {
        // id: 6,
        // uuid: "083e0dd4-3e70-4ca3-9bd0-1f52d4d34c3e",
        // avatar_url: "https://attachment-10016990.file.myqcloud.com/forum/201311/26/1934101woty11pyt1pvzvj.jpg",
        // nickname: "唐达敏",
        // gender: 2,
        // title: "约1982年11月出生,1982年11月5日被遗弃在湖南长沙韭菜园派出所门口的唐达敏寻亲 7670",
        // subject: "约1982年11月出生,1982年11月5日被遗弃在湖南长沙韭菜园派出所门口的唐达敏寻亲 7670",
        // characters: "",
        // details: "（鼠尔草 跟进）收养人姓唐，一对年轻未生育的夫妇，住长沙市八一桥，现已搬家，地址不详",
        // data_from: "https://bbs.baobeihuijia.com/thread-39063-1-1.html",
        // birthed_province: "",
        // birthed_city: "",
        // birthed_country: "",
        // birthed_address: "",
        // birthed_at: "1982-11-05T00:00:00Z",
        // missed_country: "",
        // missed_province: "",
        // missed_city: "",
        // missed_address: "湖南省长沙市韭菜园办事处",
        // missed_at: "1982-11-05T00:00:00Z",
        // handler: "",
        // babyid: "7670",
        // category: "宝贝寻家",
        // Height: "未知",
        // sync_status: 0,
      },
    };
  },
  created() {
    // this.article = article
    console.log("xxx", this.article);
    console.log("xxx article onload", this.$route.params.id);
    console.log("xxx article onload", this.$route.params.data);
    // this.detail = article
    // 页面创建时取到文章的ID
    this.articleId = this.$route.params.id;
    // 组装URL
    this.url = this.url + this.articleId;
    // 开启分享
    this.openShare(this.articleId);

    articleDetail(this.$route.params.id).then((res) => {
      console.log('article detail ---->', res.data.article)
      this.article = res.data.article
    }).catch((err) => {
      console.log('article error--->', err)
    })
  },
  methods: {
    openShare(articleId) {
      console.log(articleId);
      wx.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"],
      });
      window.onShareAppMessage = (res) => {
        console.log(res);
        return {
          path: `/article/${articleId}`,
        };
      };
      window.onShareTimeline = (res) => {
        console.log(res);
        return {
          path: `/article/${articleId}`,
        };
      };
    },
  },
});
</script>

<style lang="less">
.cnt {
  margin-top: 20px;
}

.page_article {
  padding: 0 20px;
  .header {
    .title {
      color: #333;
      font-size: 34rpx;
      border-bottom: 2px solid #eee;
      padding: 10px 0;
    }
    .desc {
      color: #555;
      font-size: 30rpx;
      margin: 20px 0 30px;
    }
  }
}
</style>
