<template>
  <div style="margin: 61px 0 0px 0;">
  	<div class="weui-article">

      <div class="weui-article__p">
        <image class="weui-article__img" :src="item.AvatarUrl" mode="aspectFit" style="height: 180px" @click="preview"/>
      </div>


      <div class="weui-article__section" id="content">
        <div class="weui-article__title">信息来源： <span class="words">{{item.DataFrom}}</span></div>
        <div class="weui-article__section">
          <div class="weui-article__h3">寻亲类别：<span class="words">{{item.Category}}</span></div>
          <div class="weui-article__h3">寻亲编号：<span class="words">{{item.Babyid}}</span></div>
          <div class="weui-article__h3">姓 名：<span class="words">{{item.Nickname}}</span> </div>
          <div class="weui-article__h3" v-if="item.Gender == 2">性 别：<span class="words">女 </span></div>
          <div class="weui-article__h3" v-else>性 别：<span class="words">男</span> </div>
          <div class="weui-article__h3">出生日期：<span class="words">{{item.BirthedAt}}</span> </div>
          <div class="weui-article__h3">户籍地点：<span class="words">{{item.BirthedProvince}} {{item.BirthedCity}} </span></div>
          <div class="weui-article__h3">失踪时间：<span class="words">{{item.MissedAt}}</span></div>
          <div class="weui-article__h3">失踪地点：<span class="words">{{item.MissedProvince}} {{item.MissedAddress}}</span></div>
          <div class="weui-article__h3">失踪时身高：<span class="words">{{item.Height}}</span></div>
          <div class="weui-article__h3">失踪人特征: <span class="words"> {{item.Characters}}</span></div>
          <div class="weui-article__h3">其他资料：<span class="words">{{item.Details}}</span></div>
          <!-- <div class="weui-article__h3">失踪时间： {{item.MissedAt}} </div> -->
          <div class="weui-article__h3">跟进志愿者：<span class="words"> {{item.Handler}}</span></div>

           <!-- <swiper
            :autoplay="false"
            previous-margin="-10px"
            class="weui-article__img">
            <div v-for="item in imgUrls" :key="item.id">
              <swiper-item>
                  <image :src="item" class="swiper_img"/>
              </swiper-item>
            </div>
          </swiper> -->
        </div>
      </div>
    </div>

    <!-- 分享按钮 -->
    <div class="share" v-on:click="download">
      <img src="/static/images/home/sharetof.png">
    </div>

    <!-- 分享图片生成的画布 -->
    <!-- 画板的层级问题可以用cover-view解决 -->
    <!-- 约1986年出生1990年与小朋友离家玩耍时走失疑时广西桂林人的秦干寻亲 -->
    <canvas canvas-id="myCanvas">
      <cover-view></cover-view>
    </canvas>
  </div>
</template>

<script>
export default{
  name: 'detail',
  props: ['item', 'imgUrls'],
  data () {
    return {
      content: {
        title: '',
        notice: '本站不保证寻子家人酬金承诺的有效性，请亲自与寻子家长联系确认，本网站及志愿者提供的寻人服务均是免费的'
      },
      src2: ''
    }
  },
  beforeUpdate () {
    var title
    if (this.item.MissedCity === '') {
      title = this.item.Nickname
    } else {
      title = this.item.MissedCity + '--' + this.item.Nickname
    }
    // if (this.item.MissedCity === '不详') {
    //   this.item.MissedCity = '失踪地点不详'
    // }
    // var title = this.item.Nickname
    this.content.title = title
  },
  onLoad () {
    // var that = this
    // var minaAuth = wx.getStorageSync('minaAuth')
    // that.access_token = minaAuth.accessToken
    // console.log('=====onload this item: ', this.item.Nickname)
    // setTimeout(function () {
    //   if (that.access_token === '') {
    //     console.log('error')
    //     return
    //   }
    //   wx.request({
    //     url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + that.access_token,
    //     data: {
    //       scene: '000',
    //       path: 'pages/detail/main'
    //     },
    //     method: 'POST',
    //     responseType: 'arraybuffer',
    //     width: '280px',
    //     success (res) {
    //       console.log(res)
    //       var src2 = wx.arrayBufferToBase64(res.data)
    //       that.src2 = 'data:image/png;base64,' + src2
    //     },
    //     fail (e) {
    //       console.log(e)
    //     }
    //   })
    //   // 生成二维码
    // }, 1000)
  },
  methods: {
    preview () {
      var that = this
      wx.previewImage({
        urls: [that.item.AvatarUrl]
      })
    },
    download () {
      wx.request({
        url: wx.getStorageSync('domain') + '/lastest/wechatapi/wechat/createqrcode',
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          // let imgData = 'data:image/png;base64,' + res.data
          let imgData = res.data
          imgData = imgData.replace(/ +/g, '') // 去掉空格方法
          imgData = imgData.replace(/[\r\n]/g, '')
          // console.log(imgData)
          let buffer = wx.base64ToArrayBuffer(imgData)
          const fsm = wx.getFileSystemManager()
          let filePath = wx.env.USER_DATA_PATH + '/temp_qrcode.png'
          fsm.writeFileSync(filePath, buffer, 'binary')
          // fsm.writeFile({
          //   filePath,
          //   data: buffer,
          //   encoding: 'binary',
          //   success: function(fp) {
          //     console.log('fp',fp)
          //   },
          //   fail: function(ee) {
          //     console.log('ee',ee)
          //   }
          // })
          console.log('filePath', filePath)
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
          ctx.fillText('扫描左边二维码了解更多', 160, 550)
          ctx.drawImage(filePath, 50, 500, 100, 100)
          // ctx.drawImage('www.tbcold.com/imgs/qrcode.png', 50, 500, 100, 100)
          // ctx.drawImage('/static/images/qrcode.png', 50, 500, 100, 100)
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
              },
              fail: function (ee) {
                console.log('ee', ee)
              }
            })
          })
        },
        fail: function () {
          console.log('失败')
        }
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
  font-weight: bold
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
.weui-article__h3{
  font-weight: bold
}
canvas{
  position: fixed;
  bottom: 0;
  left: -9999px;
  width: 420px;
  height: 615px;
}
.words{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  font-weight: 400
}
</style>
