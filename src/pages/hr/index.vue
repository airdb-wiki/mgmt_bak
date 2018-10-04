<template>
  <div class="page">
    <div class="page__hd">
    </div>

    <navigator open-type="navigateBack">
        <img src="/static/images/home/back.png" class="back">
    </navigator>
    <navigator open-type="reLaunch" url="/pages/home/main">
        <img src="/static/images/home/home.png" class="home">
    </navigator>

    <div class="page__bd">
        <div class="weui-article">
            <div class="weui-article__h1">
                <navigator open-type="navigateBack">加入我们</navigator>
            </div>

            <div class="weui-article__section">
                <div class="weui-article__section">
                    <div class="weui-article__h3">1. 背景介绍</div>
                    <div class="weui-article__p">
                        本软件是由 Dean 业余时间完成，目的是提供一个挂失、认领服务给身边的朋友使用。 使用 MPVue + Golang 实现。
                    </div>
                </div>
                <div class="weui-article__section">
                    <div class="weui-article__h3">2. 欢迎加入</div>
                    <div class="weui-article__p">
                        如果您有足够的精力、技术投入，欢迎您的加入。 需至少满足如下条件一：
                        <p>\t1. 希望您比较了解 vue、小程序等前端技术；</p>
                        <p>\t2. 希望您能够使用 Golang 编程, 有一定的代码规范；</p>
                        <p>\t3. 希望您有自己的 Github, 有一定的代码提交；</p>
                        <p>\t4. 希望您有一颗追求技术、技术公益的心。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  components: {
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '志愿者招募计划'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '志愿者招募计划',
      desc: '公益项目',
      path: '/pages/hr/main?from=forward'
    }
  }
}
</script>

<style>
    .navigation{
      width:100%;
      height:70rpx;
      position:fixed;
      background-color:#fff;
      padding:55rpx 0 20rpx 0rpx;
      z-index:9999;
    }
</style>
