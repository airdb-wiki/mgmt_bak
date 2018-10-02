<template>
  <div>
  	<detail></detail>
    <!-- 底部分享，评论栏 -->
    <canvas canvas-id="myCanvas" style="display: none;"/>
    <div class="footer">
      <button @click="shareToFriends" open-type='share' :apply="true" :plain='true'>
        <img src="/static/images/home/wx.png" class="icon">
        分享给好友
      </button>
      <button @click="download" :plain='true' style="border-left: 1px solid #e2e2e2;">
        <img src="/static/images/home/download.png" class="icon">
        生成海报
      </button>
    </div>
  </div>
</template>

<script>
import detail from '@/components/detail'

export default{
  components: {
    detail
  },
  onShareAppMessage () {
    return {
      title: '标题',
      path: '/pages/detail'
    }
  },
  methods: {
    download () {
      const ctx = wx.createCanvasContext('myCanvas')
      // 填充背景色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, 300, 1500)

      // ctx.setFillStyle('#e2e2e2')
      // ctx.setShadow(10, 50, 50, 'blue')
      // ctx.fillRect(10, 10, 150, 75)

      ctx.setFontSize(28)
      ctx.setFillStyle('#393939')
      ctx.fillText('文字在这里！！！', 10, 10)
      ctx.fillText('dean', 10, 6)

      ctx.font = 'italic bold 20px cursive'
      const metrics = ctx.measureText('Hello World')
      console.log(metrics.width)

      // ctx.setFontSize(32)
      // ctx.setFillStyle('black')
      // ctx.fillText('111111111111111111111111111111111111111111111111111111111111111', 30, 870)

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
            wx.previewImage({
              urls: [res.tempFilePath]
            })
          }
        })
      })
    }
  }
}
</script>

<style scope>
.footer{
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: row;
  bottom: 0;
  left: 0;
  padding: 5px 10px;
  background-color: #fff;
}
.footer button{
  border: none;
  flex: 1;
}
.icon{
  width: 20px;
  height: 20px;
  margin-left: -10px;
}
</style>