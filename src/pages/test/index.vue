<template>
  <div id="canva">
    <canvas canvas-id="myCanvas" style="border: 1px solid;"/>
    <button @click="ca">生成海报</button>
  </div>
</template>

<script>

export default{
  name: 'canva',
  data () {
    return {
      img: '/static/images/home/vr.png'
    }
  },
  methods: {
    ca () {
      const ctx = wx.createCanvasContext('myCanvas')
      // 填充背景色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, 300, 1500)

      ctx.setFillStyle('black')
      ctx.setShadow(10, 50, 50, 'blue')
      ctx.fillRect(10, 10, 150, 75)

      ctx.setFontSize(28)
      ctx.setFillStyle('#393939')
      ctx.fillText('文字在这里！！！', 10, 10)
      ctx.fillText('dean', 10, 6)

      ctx.font = 'italic bold 20px cursive'
      const metrics = ctx.measureText('Hello World')
      console.log(metrics.width)

      ctx.setFontSize(32)
      ctx.setFillStyle('black')
      ctx.fillText('111111111111111111111111111111111111111111111111111111111111111', 30, 870)

      // 将图片转化为画布
      ctx.drawImage('/static/images/mina/8.jpg', 30, 30, 160, 80)

      ctx.draw(true, function () {
        console.log('draw callback success')
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 750,
          height: 920,
          destWidth: 750,
          destHeight: 920,
          canvasId: 'myCanvas',
          fileType: 'png',
          success: function (res) {
            // console.log('=====cas', res)
            wx.previewImage({
              urls: [res.tempFilePath]
              // current: res.tempFilePath
            })
            // wx.saveImageToPhotosAlbum({
            // filePath: res.tempFilePath,
            //  success (res) {
            //    wx.previewImage({
            //      urls: res.tempFilePath
            //    })
            //    wx.showToast({
            //      title: '保存成功'
            //    })
            //  },
            //  fail () {
            //    wx.hideLoading()
            //  }
            // })
          }
        })
      })
    }
  },
  mounted () {
    // const ctx = wx.createCanvasContext('myCanvas')
    // ctx.setFillStyle('red')
    // ctx.fillRect(10, 10, 150, 75)
    // ctx.draw()
  }
}
</script>

<style scoped>

</style>