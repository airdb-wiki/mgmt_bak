<template>
  <div class="page  bh-article-page">


    <div class="page__bd">
        <div class="weui-article">
            <div class="weui-article__h1">{{article.Babyid}}-{{ article.Nickname }}-{{gender}}</div>

            <div class="weui-article__section">
                <div class="weui-article__p">
                    <image class="weui-article__img" :src="article.AvatarUrl" mode="aspectFit" style="height: 180px" />
                </div>

                <button open-type="contact" session-from="weixin-baobeihuijia">进入客服会话</button>
                <div class="bh-article-group">
                  <span class="bh-article-group__label">姓　　名</span>
                  <p class="bh-article-group__cont">{{ article.Nickname || '--' }}</p>
                </div>
                <div class="bh-article-row">
                  <div class="bh-article-group">
                    <span class="bh-article-group__label">年　　龄</span>
                    <p class="bh-article-group__cont">{{ article.BirthedAt || '--' }} </p>
                  </div>
                  <div class="bh-article-group">
                    <span class="bh-article-group__label">性别</span>
                    <p class="bh-article-group__cont">{{gender || '--'}}</p>
                  </div>
                </div>

                <div class="bh-article-group">
                  <span class="bh-article-group__label">失踪时间</span>
                  <p class="bh-article-group__cont">{{article.MissedAt || '--'}}</p>
                </div>
                <div class="bh-article-group">
                  <span class="bh-article-group__label">失踪地点</span>
                  <p class="bh-article-group__cont">{{article.MissedProvince}}{{article.MissedCity}}-{{article.MissedAddress}}</p>
                </div>
                <div class="bh-article-group">
                  <span class="bh-article-group__label">特征描述</span>
                  <p class="bh-article-group__cont">{{article.Characters || '--'}}</p>
                </div>
                <div class="bh-article-group">
                  <span class="bh-article-group__label">发布详情</span>
                  <p class="bh-article-group__cont">{{article.Details || '--'}}</p>
                </div>
                <div class="bh-article-group">
                  <span class="bh-article-group__label">志  愿  者</span>
                  <p class="bh-article-group__cont">{{ article.Handler || '--' }}</p>
                </div>

                <div class="article-oth-wrap"></span>关注(30K)<span class="line">|</span>线索(1234)</div>
            </div>
        </div>

    </div>

    <!-- 评论区 -->
    <div class="bhui-comments">
        <span class="bhui-comments__btn" @click="clickCommentBtn">提供线索</span>
        <ul class="bhui-comments__list">
          <li class="bhui-comments__item"  v-for="(comment,index) in comments" :key="index" >
            <div class="bhui-comments__avatar">
              <image :src="comment.AvatarUrl" alt="用户头像" />
            </div>
            <p class="bhui-comments__name">{{comment.Nickname || '匿名宝宝'}}</p>
            <p class="bhui-comments__cont">{{comment.Content}}</p>
            <p class="bhui-comments__time">{{comment.CreatedAt}}</p>
            <div class="bhui-comments__opt">
              <p><span class="label">支持</span>({{comment.Like}})</p>
              <p><span class="label">举报</span>({{comment.Blow}})</p>
            </div>
          </li>
        </ul>
    </div>


    <vfooter></vfooter>
</div>
</template>

<script>
import vfooter from '@/pages/footer'
import { formatTime } from '@/utils/index'

export default {
  components: {
    vfooter
  },
  data () {
    return {
      uuid: '',
      gender: '未知',
      article: {},
      comments: [{
        uuid: 'f74f0a2b-8413-4cff-b9cf-5dccdb171b76',
        AvatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK476rqoy0zicVAxv1fJ9v9EaltE42WibKS7btmicQBkbwBFkeB6XVSFHF4CGmFlB5OaPeVft7WJcn9w/0',
        Nickname: 'Dean',
        Content: 'xxxxxxxx test',
        CreatedAt: '2018-04-08 18:00:00',
        Like: 1000,
        Blow: 10
      }]
    }
  },
  onShareAppMessage: function () {
    return {
      title: '宝贝科技',
      desc: '10岁丢失宝贝',
      path: '/pages/article/main?uuid=' + this.article.UUID
    }
  },
  onLoad: function (option) {
    console.log('uuid====', option.uuid)
    this.uuid = option.uuid
    if (option.uuid !== '') {
      this.article.UUID = option.uuid
    }
    this.getArticle(this.article.UUID)
    this.getComments(this.article.UUID)
  },
  mounted () {
  },
  created () {
    // this.getArticle(this.article.UUID)
    // uhis.getComments(this.article.UUID)
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: '更新留言'
    })
    this.getComments(this.article.UUID)
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    wx.stopPullDownRefresh()
  },
  methods: {
    getArticle (uuid) {
      let vm = this
      if (vm.uuid === '') {
        return
      }
      var data = {
        phone_model: 'b'
      }
      vm.$get(`/lastest/wechatapi/small/article/${uuid}`, data).then((res) => {
        console.log(res.data)
        vm.article = res.data
        vm.article.MissedAt = formatTime(new Date(vm.article.MissedAt))
        vm.article.BirthedAt = formatTime(new Date(vm.article.BirthedAt))
        if (vm.article.Gender === 1) {
          vm.gender = '男'
        } else if (vm.article.Gender === 2) {
          vm.gender = '女'
        }
      })
      console.log(vm.article)
    },
    getComments () {
      let vm = this
      if (vm.uuid === '') {
        return
      }
      vm.$get(`/lastest/wechatapi/small/summary/${vm.uuid}`, '').then((res) => {
        if (res.statusCode === 200) {
          vm.comments = res.data
          for (var i = 0; i < vm.comments.length; i++) {
            vm.comments[i].CreatedAt = formatTime(new Date(vm.comments[i].CreatedAt))
          }
        } else {
          wx.showLoading({
            title: '加载失败 : ' + res.statusCode
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        }
      })
    },
    clickCommentBtn () {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxx', this.uuid)
      wx.navigateTo({
        // url: '/pages/comment/main?data=' + JSON.stringify(this.article)
        url: '/pages/comment/main?uuid=' + this.uuid
      })
    }
  }
}
</script>

<style scoped lang='less'>
  @import 'index';
</style>
