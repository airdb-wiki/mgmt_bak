<template>
  <div style="margin: 61px 0 54px 0;">
  	<div class="weui-article">
      <div class="weui-article__h1" style="font-weight: bold;font-size: 22px;">{{content.title}}</div>
      <div class="notice">
        <div class="weui-article__h1" id="noticeT">重要通知</div>
        <div class="weui-article__h1" id="noticeC">{{content.notice}}</div>
      </div>
      <div class="weui-article__h1 title" >01  登记信息</div>
      <div class="weui-article__section" id="content">
        <div class="weui-article__title">原创： 宝贝回家</div>
        <div class="weui-article__section">
          <div class="weui-article__h3">寻亲类别：宝贝寻家</div>
          <div class="weui-article__h3">寻亲编号：3255441</div>
          <div class="weui-article__h3">姓 名：某某 </div>
          <div class="weui-article__h3">性 别：女 </div>
          <div class="weui-article__h3">出生日期：1986年05月43日 </div>
          <div class="weui-article__h3">失踪时身高：120厘米左右 </div>
          <div class="weui-article__h3">失踪时间：1994年03月21日 </div>
          <div class="weui-article__h3">失踪人所在地：广东省,云浮市 </div>
          <div class="weui-article__h3">失踪地点：广西壮族自治区,桂林市, </div>
          <div class="weui-article__h3">寻亲者特征描述：腿上有块胎记 </div>
          <div class="weui-article__h3">其他资料：我走丢时身上两件衣服，外面是一件毛衣，里面是一件粉红色的，一条格子裤</div>
          <div class="weui-article__h3">注册时间：2018/6/23 12:02:34 </div>
          <div class="weui-article__h3">跟进志愿者：淡雅宁静</div>
          <div class="weui-article__p">
            <image class="weui-article__img" src="/static/images/home/sls.png" mode="aspectFit" style="height: 180px" />
          </div>
        </div>
      </div>
    </div>

    <!-- 分享按钮 -->
    <div class="share" v-on:click="download">
      <img src="/static/images/home/sharetof.png">
    </div>

    <!-- 分享图片生成的画布 -->
    <canvas canvas-id="myCanvas" :hidden='canvasHidden'/>
  </div>
</template>

<script>
export default{
  name: 'detail',
  data () {
    return {
      canvasHidden: false,
      content: {
        title: '约1986年出生1990年与小朋友离家玩耍时走失疑时广西桂林人的秦干寻亲',
        notice: '本站不保证寻子家人酬金承诺的有效性，请亲自与寻子家长联系确认，本网站及志愿者提供的寻人服务均是免费的'
      }
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
    }
  }
}
</script>

<style scoped>
.notice{
  text-align: center;
  border: 8px solid #ffd6d1;
  padding: 2px 5px;
}
#noticeT{
  background-color: #8fada7;
  padding: 4px 8px;
  color: #fff;
  width: 150px;
  margin: auto;
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight: bold;
}
#noticeC{
  color: #ff0000;
  font-weight: bold;  
}
.title{
  background-color: #86d36d;
  color: #fff;
  font-weight: bold;
  width: 200px;
  margin: auto;
  padding: 10px 0;
  margin-top: 10px;
  text-align: center;
}
#content{
  border: 1px solid #000;
  border-radius: 10px;
  margin: 10px;
  padding: 10px 5px;
  background-color: #f2fff8;
}
.share{
  position:fixed;
  bottom: 60pt;
  right: 17pt;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #82bb8b;
  text-align: center;
  line-height: 50px;
  z-index: 999;
}
.share img{
  width: 35px;
  height: 35px;
  margin-top: 7px;
}
canvas{
  width: 100%;
  height: 50px;
}
</style>