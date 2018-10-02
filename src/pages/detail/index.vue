<template>
  <div>
    <!-- 自定义navigation -->
    <div class="navigation">
      <button :plain="true" @click="back">
        <img src="/static/images/home/back.png" class="back">
        <div style="border: 1px solid #e2e2e2;margin: 0 10px 0 4px;"></div>
        <img src="/static/images/home/home.png" class="home">
      </button>
    </div>
  	<detail></detail>
    
    <!-- 底部分享，评论栏 -->
    <canvas canvas-id="myCanvas" :hidden='canvasHidden'/>
    <div class="footer">
      <button @click="shareToFriends" open-type='share' :plain='true'>
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
  data () {
    return {
      canvasHidden: false
    }
  },
  methods: {
    download () {
      var that = this
      that.canvasHidden = false
      const ctx = wx.createCanvasContext('myCanvas')
      // 填充背景色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, 260, 960)

      ctx.setFontSize(20)
      ctx.setFillStyle('#393939')
      ctx.fillText('文字在这里！！！', 20, 5, 800)
      ctx.setTextAlign('center')

      ctx.font = 'italic bold 20px cursive'
      const metrics = ctx.measureText('Hello World')
      console.log(metrics.width)

      ctx.drawImage('/static/images/mina/8.jpg', 20, 5, 120, 60)

      wx.showLoading({
        title: '分享图片生成中...',
        mask: true
      })

      ctx.draw(true, function () {
        console.log('draw callback success')
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 780,
          height: 800,
          destWidth: 780,
          destHeight: 800,
          canvasId: 'myCanvas',
          fileType: 'png',
          success: function (res) {
            wx.hideLoading()
            wx.previewImage({
              urls: [res.tempFilePath]
            })
          }
        })
      })
      setTimeout(function () {
        wx.drawCanvas({
          canvasId: 'myCanvas',
          actions: [],
          reserve: false
        })
      }, 1000)
    },
    back () {
      wx.navigateBack({
        delta: 1
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
canvas{
  width: 100%;
  height: 50px;
}
.navigation{
  width: 100%;
  padding: 27px 5px 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
}
.navigation button{
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3px 5px;
  margin-left: 10px;
  width: 88px;
}
.back{
  width: 26px;
  height: 26px;
}
.home{
  width: 25px;
  height: 25px;
}
</style>