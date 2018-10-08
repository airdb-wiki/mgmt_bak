<template>
  <div>
    <!-- 自定义navigation -->
    <!-- <div class="navigation">
      <button :plain="true" @click="back">
        <img src="/static/images/home/back.png" class="back">
        <div style="border: 1px solid #e2e2e2;margin: 0 10px 0 4px;"></div>
        <img src="/static/images/home/home.png" class="home">
      </button>
    </div> -->

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

    <scroll-view>
      <detail></detail>
    </scroll-view>
    
    <!-- 底部分享，评论栏 -->
    <!-- <canvas canvas-id="myCanvas" :hidden='canvasHidden'/>
    <div class="footer">
      <button @click="shareToFriends" open-type='share' :plain='true'>
        <img src="/static/images/home/wx.png" class="icon">
        分享给好友
      </button>
      <button @click="download" :plain='true' style="border-left: 1px solid #e2e2e2;">
        <img src="/static/images/home/download.png" class="icon">
        生成海报
      </button>
    </div> -->

    <div class="footer">
      <form @submit="sub">
        <div class="container">
          <input type="text" confirm-type="send" name="pl" placeholder="说点什么吧" placeholder-style="color: #e2e2e2;"/>
          <button :plain='true' form-type="submit">
            <div class="form_btn">
              <img src="/static/images/home/talk.png">
              <div>评论</div>
            </div>
          </button>
          <button @click="shareToFriends" open-type='share' :plain='true'>
            <div class="form_btn">
              <img src="/static/images/home/wx.png">
              <div>分享</div>
            </div>
          </button>
        </div>
      </form>
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
      canvasHidden: false,
      title: '顶梁柱“北漂”意外之死',
      showTitle: false
    }
  },
  onPageScroll (res) {
    if (res.scrollTop > 40) {
      this.showTitle = true
    } else {
      if (res.scrollTop < 40) {
        this.showTitle = false
      }
    }
  },
  methods: {
    sub (e) {
      console.log('---------------评论的内容为：', e.mp.detail.value.pl)
    },
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

<style scoped>
.title{
  width: 40%;
  margin-left: 5px;
  text-align: center;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30px;
  font-size: 18px;
}
.navigation{
  width: 100%;
  padding: 26px 0 16px 5px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: row;
}
.btn{
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3px 4px 3px 9px;
  margin-left: 6px;
  width: 72px;
  height: 24px;
}
.back{
  width: 24px;
  height: 24px;
}
.home{
  width: 23px;
  height: 23px;
}
.footer{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
.container{
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 3px 6px;
}
.container input{
  border: 1px solid #e2e2e2;
  padding: 0 8px;
  border-radius: 20px;
  flex: 6;
  height: 35px;
}
.container button{
  border: none;
  flex: 1;
}
.form_btn{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form_btn img{
  width: 23px;
  height: 23px;
}
.form_btn div{
  font-size: 12px;
}
</style>