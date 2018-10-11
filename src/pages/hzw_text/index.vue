<template>
  <div class="page">
    <div class="navigation">
      <div @click="back">
        <img src="/static/images/home/back.png" class="back">
      </div>
    </div>
    <!-- navigation end -->
    <canvas style="width: 100%; height: 300px;" canvas-id="firstCanvas"></canvas>
  </div>
</template>

<script>
export default {
  mounted () {
    const ctx = wx.createCanvasContext('firstCanvas')

    ctx.beginPath()
    ctx.setFillStyle('#f35336')
    ctx.fillRect(0, 0, 600, 300)

    // 书写文本
    ctx.setFillStyle('#fff')
    ctx.beginPath()
    ctx.setFontSize(20)
    ctx.fillText('当前成长值', 30, 34)
    ctx.fillText('去提升 >', 85, 65)
    ctx.fillText('距Lv1会员还需 88 成长值~', 30, 100)

    ctx.beginPath()
    ctx.setFontSize(35)
    ctx.fillText('12', 30, 69)

    // 绘制一个背景
    ctx.beginPath()
    ctx.setStrokeStyle('rgba(255, 255, 255, .4)')
    ctx.setLineWidth(29)
    ctx.setLineCap('round')
    ctx.moveTo(88, 57)
    ctx.lineTo(156, 60)
    ctx.stroke()

    // 分割线1
    ctx.beginPath()
    ctx.setLineWidth(3)
    ctx.setStrokeStyle('#e2e2e2')
    ctx.moveTo(0, 121)
    ctx.lineTo(300, 121)
    ctx.stroke()

    // 分割线2
    ctx.beginPath()
    ctx.setLineWidth(3)
    ctx.setStrokeStyle('#e2e2e2')
    ctx.moveTo(0, 262)
    ctx.lineTo(300, 262)
    ctx.stroke()

    // 绘制折线图
    var position = this.position
    ctx.beginPath()
    ctx.setLineWidth(3)
    ctx.setStrokeStyle('#fff')
    ctx.setFontSize(20)
    ctx.moveTo(position[0][0], position[0][1])
    ctx.fillText('4月', position[0][0] - 10, position[0][1] + 25)
    for (var i = 1; i < 4; i++) {
      ctx.lineTo(position[i][0], position[i][1])
      ctx.fillText('4月', position[i][0] - 10, position[0][1] + 25)
    }
    ctx.stroke()

    ctx.setFillStyle('#fff')
    ctx.beginPath()
    ctx.arc(position[0][0], position[0][1], 4, 0, 2 * Math.PI)
    ctx.fill()
    for (var j = 0; j < 4; j++) {
      ctx.beginPath()
      ctx.arc(position[j][0], position[j][1], 4, 0, 2 * Math.PI)
      ctx.fill()
    }

    ctx.draw()
  },
  data () {
    return {
      position: [
        [20, 220],
        [120, 200],
        [220, 205],
        [320, 160]
      ]
    }
  },
  methods: {
    back: function () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style scoped>
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
  height:70rpx;
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
