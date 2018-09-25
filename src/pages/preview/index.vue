<template>
  <div class="page">
    <div class="page__hd">
    </div>

    <div class="page__bd">
        <div class="weui-article">
            <div class="weui-article__h1">{{article.title}}</div>

            <div class="weui-article__section">
                <div class="weui-article__p">
                    <image class="weui-article__img" :src="article.imageFiles" mode="aspectFit" style="height: 180px" />
                </div>

                <div class="bh-article-row">
                  <div class="bh-article-group">
                    <span class="bh-article-group__label">姓　　名</span>
                    <p class="bh-article-group__cont">{{ article.nickName || '--' }}</p>
                  </div>
                  <div class="bh-article-group">
                    <span class="bh-article-group__label">性别</span>
                    <div v-if="article.gender === 1"> <p class="bh-article-group__cont" >男</p> </div>
                    <div v-else-if="article.gender === 2"> <p class="bh-article-group__cont" >女</p> </div>
                    <div v-else> <p class="bh-article-group__cont" >未知</p> </div>                      
                  </div>
                </div>

                <div class="bh-article-group">
                  <span class="bh-article-group__label">出生日期</span>
                  <p class="bh-article-group__cont">{{ article.birthedAt || '--' }}</p>
                </div>
                
                <div class="bh-article-group">
                  <span class="bh-article-group__label">失踪时间</span>
                  <p class="bh-article-group__cont">{{article.missedAt || '--'}}</p>
                </div>
                <div class="bh-article-group">
                  <span class="bh-article-group__label">失踪地点</span>
                  <p class="bh-article-group__cont">{{article.province}}{{article.city}}-{{article.address}}</p>
                </div>
                <div class="bh-article-group">
                  <span class="bh-article-group__label">特征描述</span>
                  <p class="bh-article-group__cont">{{article.characters || '--'}}</p>
                </div>
                <div class="bh-article-group">
                  <span class="bh-article-group__label">发布详情</span>
                  <p class="bh-article-group__cont">{{article.details || '--'}}</p>
                </div>
            </div>
        </div>

    </div>


    <checkbox-group @click="bindAgreeChange">
        <label class="weui-agree" for="weuiAgree">
          <div class="weui-agree__text">
            <checkbox class="weui-agree__checkbox" id="weuiAgree" value="agree" checked="isAgree" />
            <div class="weui-agree__checkbox-icon">
              <icon class="weui-agree__checkbox-icon-check" type="success_no_circle" size="9" v-if="isAgree"></icon>
            </div>
            阅读并同意
            <navigator url="/pages/licence/main" class="weui-agree__link">《相关条款》</navigator>
          </div>
        </label>
      </checkbox-group>

      <div class="weui-btn-area">
        <button class="weui-btn" type="primary" @click="publish">保存至草稿箱</button>
        <button class="weui-btn" type="primary" @click="publish">发布</button>
      </div>


    <vfooter></vfooter>
</div>
</template>

<script>
import vfooter from '@/pages/footer'
export default {
  components: {
    vfooter
  },
  onLoad: function (option) {
    console.log('preview===onload==:', option.data)
    console.log('preview===onload==:', option.files)
    var article = JSON.parse(option.data)
    this.article = JSON.parse(option.data)
    this.article.title = article.title
    this.article.content = article.content
    this.files = option.files
  },
  data () {
    return {
      article: {},
      files: [],
      showTopTips: false,
      time: '09:01',
      date: '2015-09-01',

      isAgree: false
    }
  },
  methods: {
    bindAgreeChange (e) {
      this.isAgree = !this.isAgree
    },
    publish () {
      var vm = this
      wx.request({
        url: wx.getStorageSync('requestUrl') + '/small/article',
        method: 'POST',
        data: {
          article: JSON.stringify(vm.article)
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          console.log('vm====', vm.files)
          if (res.data.uuid !== '') {
            vm.uploaderImage(res.data.uuid, vm.files)
          }
          vm.items = res.data
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1500,
            mask: true,
            complete: function () {
            }
          })
        },
        complete: function () {
          /*
          wx.switchTab({
            url: '/pages/profile/main'
          })
          */
        }
      })
    },
    uploaderImage (uuid, files) {
      console.log('files:', files)
      console.log('uploaderImage in preview===', uuid, files)
    }
  }
}
</script>

<style scoped>

.page__bd {
  background: #fff;
} 
.weui-agree {
  font-size: 30rpx;
}
.weui-btn-area {
  margin-bottom: 30rpx;
}
</style>
