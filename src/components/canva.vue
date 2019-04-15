<template>
  <div id="canva">
    <canvas canvas-id="myCanvas" style="border: 1px solid;"/>
    <button @click="ca">按钮</button>
    <img :src="img" :open-type="getUserInfo">
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
      // 选择图片作为背景
      wx.chooseImage({
        success: function (res) {
          console.log(res.tempFilePaths[0])
          ctx.drawImage(res.tempFilePaths[0], 0, 0, 80, 80)
          ctx.setFontSize(18)
          ctx.fillText('Welcome', 100, 50)
          ctx.setTextAlign('align')
          ctx.draw(false, function () {
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: 80,
              height: 80,
              destWidth: 80,
              destHeight: 80,
              canvasId: 'myCanvas',
              fileType: 'jpg',
              success: function (res) {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success (res) {
                    wx.showToast({
                      title: '保存成功'
                    })
                  },
                  fail () {
                    wx.hideLoading()
                  }
                })
              }
            })
          })
        }
      })
    }
  },
  mounted () {
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 75)
    ctx.draw()
  }
}
</script>

<style scoped>

</style>