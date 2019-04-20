<template>
  <div class="test-page">

    <div class="test-page-main">
      <canvas style="width:100%;height:500rpx" canvas-id="share_canvas">
        <cover-view class="text">{{text}}</cover-view>
      </canvas>

      <button type="primary" open-type="share" style="margin:20rpx">微信邀请</button>
      <button type="primary" open-type="share" style="margin:20rpx">邀请码图片</button>
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

<style scoped lang='less'>
  @import 'index';
</style>
