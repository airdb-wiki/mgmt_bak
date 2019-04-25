<template>
  <div>
    <div class="serviceIndex">
      <div class="index-title">成长指标</div>
      <canvas class="canvas" canvas-id="radar"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'radar',
  data () {
    return {
      radarData: [
        {desc: '参与', value: '0.6'},
        {desc: '关注', value: '0.5'},
        {desc: '发贴', value: '0.8'},
        {desc: '转发', value: '0.5'},
        {desc: '粉丝', value: '1.0'},
        {desc: '捐助', value: '0.3'}
      ]
    }
  },
  onload: function () {
    console.log('----xxxx--')
    var X0 = this.rpx(300)
    var Y0 = this.rpx(250)
    var R = this.rpx(180)
    // 使用 wx.createContext 获取绘图上下文 ctx
    var ctx = wx.createCanvasContext('radar')

    /* 画圆背景
    ctx.arc(X0, Y0, R, 0, 2 * Math.PI)
    ctx.setFillStyle('#eeeeee')
    ctx.fill() */

    // 画圆线
    for (var i = 60; i <= 180; i += 60) {
      ctx.beginPath()
      R = this.rpx(i)
      ctx.arc(X0, Y0, R, 0, 2 * Math.PI)
      ctx.setStrokeStyle('#fff')
      ctx.setLineWidth(0.5)
      ctx.stroke()
    }

    // 计算点位置
    var point = [
      {x: X0, y: Y0 - R},
      {x: X0 - 1.73 * 0.5 * R, y: Y0 - 0.5 * R},
      {x: X0 + 1.73 * 0.5 * R, y: Y0 - 0.5 * R},
      {x: X0 - 1.73 * 0.5 * R, y: Y0 + 0.5 * R},
      {x: X0 + 1.73 * 0.5 * R, y: Y0 + 0.5 * R},
      {x: X0, y: Y0 + R}
    ]

    // 画格线
    ctx.beginPath()
    for (i = 0; i <= 5; i++) {
      ctx.moveTo(X0, Y0)
      ctx.lineTo(point[i].x, point[i].y)
    }
    ctx.setLineWidth(0.5)
    ctx.setStrokeStyle('#fff')
    ctx.stroke()

    // 写字
    ctx.setFontSize(16)
    ctx.setFillStyle('white')
    ctx.fillText(this.radarData[0].desc, this.rpx(270), this.rpx(60))// 上
    ctx.fillText(this.radarData[1].desc, this.rpx(80), this.rpx(150))// 左上
    ctx.fillText(this.radarData[2].desc, this.rpx(455), this.rpx(145))// 右上
    ctx.fillText(this.radarData[3].desc, this.rpx(80), this.rpx(380))// 左下
    ctx.fillText(this.radarData[4].desc, this.rpx(450), this.rpx(380))// 右下
    ctx.fillText(this.radarData[5].desc, this.rpx(270), this.rpx(460))// 下

    // 画点
    var x, y
    var valuePoint = [
      {x: X0, y: Y0},
      {x: X0, y: Y0},
      {x: X0, y: Y0},
      {x: X0, y: Y0},
      {x: X0, y: Y0},
      {x: X0, y: Y0}
    ]
    for (i = 0; i <= 5; i++) {
      ctx.beginPath()
      var temp = Math.abs(X0 - point[i].x) * this.radarData[i].value
      if (X0 > point[i].x) x = X0 - temp
      else if (X0 < point[i].x) x = X0 + temp
      else x = X0

      temp = Math.abs(Y0 - point[i].y) * this.radarData[i].value
      if (Y0 > point[i].y) y = Y0 - temp
      else y = Y0 + temp

      ctx.moveTo(x, y)
      ctx.arc(x, y, this.rpx(8), 0, 2 * Math.PI)
      ctx.setFillStyle('white')
      ctx.fill()
      valuePoint[i].x = x
      valuePoint[i].y = y
    }

    // 画折线
    ctx.beginPath()
    ctx.moveTo(valuePoint[0].x, valuePoint[0].y)
    // 上到左上
    ctx.lineTo(valuePoint[1].x, valuePoint[1].y)
    // 左上到左下
    ctx.lineTo(valuePoint[3].x, valuePoint[3].y)
    // 左下到下
    ctx.lineTo(valuePoint[5].x, valuePoint[5].y)
    // 下到右下
    ctx.lineTo(valuePoint[4].x, valuePoint[4].y)
    // 右下到右上
    ctx.lineTo(valuePoint[2].x, valuePoint[2].y)
    // 右上到上
    ctx.lineTo(valuePoint[0].x, valuePoint[0].y)
    ctx.setStrokeStyle('#fff')
    ctx.setLineWidth(2.5)
    ctx.stroke()
    ctx.setFillStyle('rgba(250, 250, 250, 0.2)') // 透明
    ctx.fill()

    var that = this

    ctx.draw(true, function () {
      console.log('draw callback success')
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 500,
        height: 600,
        canvasId: 'radar',
        fileType: 'png',
        success: function (res) {
          that.tempFilePath = res.tempFilePath
          that.canvasHidden = true
          console.log('canvasToTempFilePath callback success')
          console.log('tempFilePath==', that.tempFilePath)
        }
      })
    })
  }
}
</script>
<style>
  .serviceIndex {
    position:relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 550rpx;
  }
  .canvas {
    height: 500rpx;
    width: 600rpx;
    margin-left: 75rpx;
    margin-right: 75rpx;
    margin-top: 50rpx;
  }

  .index-title {
    position:fixed;
    top:230rpx;
    left:30rpx;
    font-size:30;
  }
</style>
