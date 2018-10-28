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
        <div class="weui-article__title">信息来源： {{item.DataFrom}}</div>
        <div class="weui-article__section">
          <div class="weui-article__h3">寻亲类别：{{item.Category}}</div>
          <div class="weui-article__h3">寻亲编号：{{item.Babyid}}</div>
          <div class="weui-article__h3">姓 名：{{item.Nickname}} </div>
          <div class="weui-article__h3" v-if="item.Gender == 2">性 别：女 </div>
          <div class="weui-article__h3" v-else>性 别：男 </div>
          <div class="weui-article__h3">出生日期：{{item.BirthedAt}} </div>
          <div class="weui-article__h3">户籍地点：{{item.BirthedProvince}} {{item.BirthedCity}} </div>
          <div class="weui-article__h3">失踪时间：{{item.MissedAt}}</div>
          <div class="weui-article__h3">失踪地点：{{item.MissedProvince}} {{item.MissedAddress}}</div>
          <div class="weui-article__h3">失踪时身高：120厘米左右 {{item.Height}}</div>
          <div class="weui-article__h3">寻亲者特征描述: {{item.Characters}}</div>
          <div class="weui-article__h3">其他资料：{{item.Details}}</div>
          <div class="weui-article__h3">失踪时间： {{item.MissedAt}} </div>
          <div class="weui-article__h3">跟进志愿者： {{item.Handler}}</div>
          <div class="weui-article__p">
            <image class="weui-article__img" :src="item.AvatarUrl" mode="aspectFit" style="height: 180px" />
          </div>
        </div>
      </div>
    </div>

    <!-- 分享按钮 -->
    <div class="share" v-on:click="download">
      <img src="/static/images/home/sharetof.png">
    </div>

    <!-- 分享图片生成的画布 -->
    <!-- 画板的层级问题可以用cover-view解决 -->
    <canvas canvas-id="myCanvas">
      <cover-view></cover-view>
    </canvas>
  </div>
</template>

<script>
export default{
  name: 'detail',
  props: ['item'],
  data () {
    return {
      content: {
        title: '约1986年出生1990年与小朋友离家玩耍时走失疑时广西桂林人的秦干寻亲',
        notice: '本站不保证寻子家人酬金承诺的有效性，请亲自与寻子家长联系确认，本网站及志愿者提供的寻人服务均是免费的'
      },
      src2: ''
    }
  },
  onLoad () {
    var that = this
    var minaAuth = wx.getStorageSync('minaAuth')
    that.access_token = minaAuth.accessToken
    // 获取access_taken

    setTimeout(function () {
      if (that.access_token === '') {
        console.log('error')
        return
      }
      wx.request({
        url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + that.access_token,
        data: {
          scene: '000',
          path: 'pages/detail/main'
        },
        method: 'POST',
        responseType: 'arraybuffer',
        width: '280px',
        success (res) {
          console.log(res)
          var src2 = wx.arrayBufferToBase64(res.data)
          that.src2 = 'data:image/png;base64,' + src2
        },
        fail (e) {
          console.log(e)
        }
      })
      // 生成二维码
    }, 1000)
  },
  methods: {
    download () {
      const ctx = wx.createCanvasContext('myCanvas')
      // 填充背景色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, 420, 615)

      // 海报头部绘制
      ctx.fillStyle = '#86d36d'
      ctx.fillRect(144, 10, 130, 40)

      ctx.font = 'bold 30px Arial'
      ctx.setFillStyle('#393939')
      ctx.fillText('宝贝回家', 150, 40)

      ctx.setFontSize(20)
      ctx.setFillStyle('#393939')
      ctx.fillText('我在帮他回家，都来帮个忙吧', 68, 85)

      // 个人信息绘制
      ctx.fillStyle = '#e3fff0'
      ctx.fillRect(30, 95, 360, 400)
      ctx.fillStyle = '#fff'
      ctx.fillRect(30, 95, 20, 20)
      ctx.fillStyle = '#fff'
      ctx.fillRect(370, 95, 20, 20)
      ctx.fillStyle = '#fff'
      ctx.fillRect(30, 480, 20, 20)
      ctx.fillStyle = '#fff'
      ctx.fillRect(370, 480, 20, 20)

      ctx.setFontSize(20)
      ctx.setFillStyle('#393939')
      ctx.fillText('寻亲编号：3255441', 50, 130)
      ctx.fillText('姓 名：某某', 50, 155)
      ctx.fillText('性 别：女', 50, 180)
      ctx.fillText('出生日期：1986年05月43日', 50, 205)
      ctx.fillText('失踪时身高：120厘米左右', 50, 230)
      ctx.fillText('失踪时间：1994年03月21日', 50, 255)
      ctx.fillText('失踪人所在地：广东省,云浮市', 50, 280)
      ctx.fillText('失踪地点：广西壮族自治区,桂林市', 50, 305)
      ctx.fillText('其他资料：我走丢时身上两件衣服，外', 50, 330)
      ctx.fillText('面是一件毛衣，里面是一件粉红色的，', 50, 355)
      ctx.fillText('一条格子裤', 50, 380)
      ctx.fillText('注册时间：2018/6/23 12:02:34', 50, 430)
      ctx.fillText('跟进志愿者：淡雅宁静', 50, 455)

      // 二维码关注区域绘制
      ctx.setFontSize(20)
      ctx.setFillStyle('#393939')
      ctx.fillText('扫描右边二维码了解更多', 160, 550)

      ctx.drawImage(this.src2, 50, 500, 100, 100)
      wx.showLoading({
        title: '分享图片生成中...',
        mask: true
      })

      ctx.draw(true, function () {
        console.log('draw callback success')
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 420,
          height: 615,
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
  background-color: #e3fff0;
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
  position: fixed;
  bottom: 0;
  left: -9999px;
  width: 420px;
  height: 615px;
}
</style>