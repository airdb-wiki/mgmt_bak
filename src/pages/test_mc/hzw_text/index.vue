<template>
  <div class="page">
    <canvas style="width: 100%; height: 380px;" canvas-id="firstCanvas"></canvas>
    <button @click="share">生成海报</button>
  </div>
</template>

<script>
export default {
  mounted () {
    const ctx = wx.createCanvasContext('firstCanvas')

    ctx.beginPath()
    ctx.setFillStyle('#f35336')
    ctx.fillRect(0, 0, 600, 380)

    // 为了练习canvas，便于以后海报的制作，这里文本，按钮均使用canvas实现

    // 书写文本
    ctx.setFillStyle('#fff')
    ctx.beginPath()
    ctx.setFontSize(20)
    ctx.fillText('当前成长值', 30, 70)
    ctx.fillText('去提升 >', 90, 112)
    ctx.fillText('距Lv1会员还需 88 成长值~', 30, 145)

    ctx.beginPath()
    ctx.setFontSize(40)
    ctx.fillText('12', 30, 115)

    // 绘制一个背景
    ctx.beginPath()
    ctx.setStrokeStyle('rgba(255, 255, 255, .4)')
    ctx.setLineWidth(29)
    ctx.setLineCap('round')
    ctx.moveTo(95, 105)
    ctx.lineTo(160, 105)
    ctx.stroke()

    // 分割线1
    ctx.beginPath()
    ctx.setLineWidth(3)
    ctx.setStrokeStyle('#e2e2e2')
    ctx.moveTo(0, 180)
    ctx.lineTo(300, 180)
    ctx.stroke()

    // 分割线2
    ctx.beginPath()
    ctx.setLineWidth(3)
    ctx.setStrokeStyle('#e2e2e2')
    ctx.moveTo(0, 340)
    ctx.lineTo(300, 340)
    ctx.stroke()

    // 绘制折线图
    var position = this.position
    ctx.beginPath()
    ctx.setLineWidth(3)
    ctx.setStrokeStyle('#fff')
    ctx.setFontSize(20)
    ctx.moveTo(position[0][0], position[0][1])
    ctx.fillText('4月', position[0][0] - 10, position[0][1] + 30)
    for (var i = 1; i < 4; i++) {
      ctx.lineTo(position[i][0], position[i][1])
      ctx.fillText('4月', position[i][0] - 10, position[0][1] + 30)
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
        [20, 280],
        [120, 260],
        [220, 265],
        [320, 210]
      ]
    }
  },
  methods: {
    share () {
      wx.canvasToTempFilePath({
        canvasId: 'firstCanvas',
        success: (res) => {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: (res) => {
              console.log(res)
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: (err) => {
              console.error(err)
            }
          })
        },
        fail: (err) => {
          console.error(err)
        }
      }, this)
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
