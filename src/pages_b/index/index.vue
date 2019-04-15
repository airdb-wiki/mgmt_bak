<template>
  <div class="page">

    <div class="kind-list">
      <div class="kind-list__item">
        <img class="kind-list__img" :src="'/static/images/setting.png'">
        <div class="kind-list__item-hd" @click="openUrl('index')">我的发布</div>
      </div>

      <div class="weui-flex,kind-list__item-hd" @click="openUrl('index')">我的关注</div>

      <div class="weui-flex,kind-list__item-hd" @click="openUrl('index')">救助站</div>


      <div class="kind-list__item">
        <img class="kind-list__img" :src="'/static/images/customer_service.png'">
        <div class="weui-flex,kind-list__item-hd" @click="openUrl('index')">客服</div>
      </div>

      <div class="kind-list__item">
        <img class="kind-list__img" :src="'/static/images/feedback.png'">
        <div class="weui-flex,kind-list__item-hd" @click="openUrl('index')">反馈</div>
      </div>

      <div class="kind-list__item">
        <img class="kind-list__img" :src="'/static/images/setting.png'">
        <div class="weui-flex,kind-list__item-hd" @click="openUrl('setting')">设置</div>
      </div>

    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },

  components: {
    card
  },
  onLoad: function (options) {
    mpvue.setNavigationBarTitle({
      title: '实验室',
      success: function (res) {
      }
    })
  },
  methods: {
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped lang='less'>
  @import 'index';
</style>
