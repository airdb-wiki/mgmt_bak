<template>
  <div class="test-page">

    <div class="navigation">
      <div class="btn">
        <navigator open-type="navigateBack">
          <img src="/static/images/home/back.png" class="back">
        </navigator>

        <div style="border-left: 1px solid #e2e2e2;margin: 2px 10px 0 4px;height: 18px;"></div>

        <navigator open-type="reLaunch" url="/pages/home/main">
          <img src="/static/images/home/home.png" class="home">
        </navigator>
      </div>

      <div v-if="!showTitle" class="title">详情</div>
      <div v-else class="title">{{title}}</div>
    </div>
    <!-- navigation end -->

    <div class="test-page-main">
      <canvas style="width:100%;height:500rpx" canvas-id="share_canvas">
        <cover-view class="text">{{text}}</cover-view>
      </canvas>
      <button type="primary" open-type="share" style="margin:20rpx">分享</button>
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
      title: '志愿者招募',
      showTitle: false,
      text: '不到长城非好汉 屈指行程二万'
    }
  },
  method: {
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '志愿者招募计划'
    })
  },
  onShow: function () {
    var windowWidth = wx.getSystemInfoSync().windowWidth
    // 拿到canvas context
    let ctx = wx.createCanvasContext('share_canvas')
    ctx.drawImage('/static/images/test_mc/3.jpg', 0, 0, windowWidth, 500)
    ctx.draw()
  },
  onShareAppMessage: function () {
    return {
      title: '志愿者招募计划',
      path: '/pages/volunteer/main?from=forward',
      imageUrl: '/static/images/test_mc/3.jpg'
    }
  }
}
</script>

<style scope>
.text {
  color:#fff;
  float:right;
  display:block;
  width:230rpx;
  position:relative;
  top:300rpx;
  right:80rpx;
  white-space: pre-wrap;
}
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
  width: 100%;
  padding: 18pt 0 4pt 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: row;
}
.title{
  width: 50%;
  margin-left: 3pt;
  text-align: center;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30pt;
  font-size: 18px;
}
.btn{
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3pt 0pt 5pt 4pt;
  margin-left: 6pt;
  width: 56pt;
  height: 16pt;
}
.back{
  width: 20pt;
  height: 20pt;
}
.home{
  width: 17pt;
  height: 17pt;
}
</style>
