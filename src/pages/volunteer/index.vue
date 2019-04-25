<template>
  <div class="page">

    <vuser></vuser>

    <vradar></vradar>

    <button type="primary" open-type="share" style="margin:20rpx">微信邀请</button>
    <button type="primary" open-type="share" style="margin:20rpx">二维码邀请</button>

    <!-- 分享按钮 -->
    <div class="share" v-on:click="download">
      <img src="/static/images/home/sharetof.png">
    </div>

    <!-- 分享图片生成的画布 -->
    <canvas canvas-id="radar2">
      <cover-view></cover-view>
    </canvas>

    <vfooter></vfooter>
  </div>
</template>

<script>
import vuser from '@/components/user'
import vradar from '@/components/radar'
import vfooter from '@/pages/footer'
export default {
  components: {
    vuser,
    vradar,
    vfooter
  },
  data () {
    return {
      title: '宝贝回家志愿者',
      showTitle: false
    }
  },
  onShareAppMessage: function () {
    return {
      title: '志愿者',
      path: '/pages/volunteer/main?from=forward',
      imageUrl: '/static/images/forward/home2.jpg'
    }
  },
  method: {
    rpx (param) {
      console.log('2222')
      // let windowW = wx.getSystemInfoSync().windowWidth
      // return Number((windowW / 750 * param).toFixed(2))
    },
    qrcode () {
    },

    preview () {
      var that = this
      wx.previewImage({
        urls: [that.item.AvatarUrl]
      })
    },
    download () {
      console.log('xxxxxxx')
      wx.request({
        url: process.env.BaseUrl + '/lastest/wechatapi/wechat/createqrcode',
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(process.env.BaseUrl + '/lastest/wechatapi/wechat/createqrcode')
          console.log(res)
          // let imgData = 'data:image/png;base64,' + res.data
          let imgData = res.data
          if (imgData == null) {
            wx.showToast({
              title: '二维码获取失败',
              icon: 'none',
              duration: 3000,
              mask: true
            })
            return
          }
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
          const ctx = wx.createCanvasContext('radar2')
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
  },
  onLoad: function () {

  },
  onShow: function () {
    const context = wx.createCanvasContext('radar')

    context.setStrokeStyle('#00ff00')
    context.setLineWidth(5)
    context.rect(0, 0, 200, 200)
    context.stroke()
    context.setStrokeStyle('#ff0000')
    context.setLineWidth(2)
    context.moveTo(160, 100)
    context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    context.moveTo(140, 100)
    context.arc(100, 100, 40, 0, Math.PI, false)
    context.moveTo(85, 80)
    context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    context.moveTo(125, 80)
    context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    context.stroke()
    context.draw()
  }
}
</script>

<style scoped lang='less'>
  @import 'index';
</style>
