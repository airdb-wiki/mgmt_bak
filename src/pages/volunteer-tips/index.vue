<template>
  <div class="content">
    <div class="box_19X1">
      <div class="text_20X1">
        宝贝回家志愿者协会（以下简称本协会）是由关爱儿童的各界爱心人士自愿组成的民间志愿者组织，于2008年1月18日在民政部门正式注册，是具有独立法人资格的非营利性社会公益团体。
        《宝贝回家寻子网》，即www.baobeihuijia.com是隶属于宝贝回家志愿者协会的公益性寻人网站，为失踪儿童、家长提供免费的寻人帮助，帮助走失、被拐、被遗弃儿童寻找亲人，帮助因各种原因流浪、乞讨、卖艺的儿童回归家庭。本协会及网站已按照相关规定在信息产业部和公安部门完成了备案。本协会及网站的宗旨是：关爱儿童，共筑和谐。
        进行寻亲登记之前，请认真阅读以下内容及法律声明：当您的孩子失踪或被拐后，请马上拨打110报警。
        1、宝贝回家寻子网接受失踪或被拐时16周岁以下儿童的登记信息及流浪乞讨儿童的登记信息，超过16周岁或不属于失踪或被拐的儿童信息，需在家属同意并且相关资料完整的情况下在“其他寻人”区域进行登记。如果您所登记的信息超过16周岁资料信息不完整或不属于失踪被拐范围，请访问宝贝回家论坛的其它寻人版块http://bbs.baobeihuijia.com/forum-21-1.html，注册后将寻亲信息发布在其它寻人版块。
        2、本协会为寻亲者提供免费的寻人帮助，请如实填写您在网站登记的资料。
        3、请不要利用宝贝回家寻子网站发布虚假寻人信息或恶作剧信息，本协会将保留一切追究法律责任的权利。
        ………… （滑动浏览）
      </div>
    </div>
    <div class="btn" @click="jumpCreate">须知</div>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {}
  },
  methods: {
    jumpCreate () {
      wx.navigateTo({
        url: '../volunteer-create/main'
      })
    }
  },
  onLoad: function () {},
  onShow: function () {}
}
</script>
<style scoped lang="less">
@import "index";
</style>