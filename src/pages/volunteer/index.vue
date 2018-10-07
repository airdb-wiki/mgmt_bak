<template>
  <div class="test-page">

    <div class="navigation">
      <navigator open-type="navigateBack">
        <img src="/static/images/home/back.png" class="back">
      </navigator>
    </div>
    <!-- navigation end -->

    <div class="test-page-main">
      <h3>这是其它页面</h3>
    </div>
    <!-- test-page-main end -->

    <div class="test-page-footer">
      <vfooter></vfooter>
    </div>
    <!-- test-page-footer end -->
  </div>
</template>

<script>
import vfooter from '@/pages/footer'
export default {
  components: {
    vfooter
  },
  data () {
    return {
    }
  },
  method: {
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

<style scope>
.test-page-footer {
  box-sizing: border-box;
  flex: 0 0 auto;
  padding-top: 30rpx;
}
.test-page-main {
  flex:1 1 auto;
  margin-top:140rpx;
}
.test-page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100%;
  background: #efeff4;
  margin: 0 0;
}
.navigation{
  width:100%;
  height:65rpx;
  position:fixed;
  background-color:#fff;
  padding:55rpx 0 20rpx 0rpx;
  z-index:9999;
}
.back{
  width:100rpx;
  height:70rpx;
}
</style>
