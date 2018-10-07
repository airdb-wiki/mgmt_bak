<template>
  <div class="test-page">

    <div class="navigation">
      <div @click="back">
        <img src="/static/images/home/back.png" class="back">
      </div>
    </div>
    <!-- navigation end -->

    <div class="test-page-main">
      <div class="serviceIndex">
        <canvas class="canvas" canvas-id="radar"></canvas>
      </div>
      <!-- serivceIndex end -->
      <div class="weui-cells">

        <div class="weui-cell">
          <div class="weui-cell__bd">
            今日任务
          </div>
          <div class="weui-cell__ft">
            今日已获成长值{{growIndex}}
          </div>
        </div>
        <!-- cell end -->
        <div class="weui-cell test-cell">
          <div class="weui-cell__hd">
            <image src="/static/images/user_active.png"></image>
          </div>
          <div class="weui-cell__bd">标题文字</div>
          <div class="weui-cell__ft">
            <button type="default" class="button" size="mini" plain="true">去看看</button>
          </div>
        </div>
        <!-- cell end -->
        <div class="weui-cell test-cell">
          <div class="weui-cell__hd">
            <image src="/static/images/user_active.png"></image>
          </div>
          <div class="weui-cell__bd">标题文字</div>
          <div class="weui-cell__ft">说明文字</div>
        </div>
        <!-- cell end -->

      </div>
      <!-- cells end -->
    </div>
    <!-- test-page-main end -->

    <div class="test-page-footer">
      <vfooter></vfooter>
    </div>
    <!-- test-page-footer end -->
  </div>
</template>

<script>
import vfooter from '@/pages/footer'
export default{
  components: {
    vfooter
  },

  data () {
    return {
      growIndex: 0,
      radarData: [
        {desc: '参与', value: '0.6'},
        {desc: '关注', value: '0.5'},
        {desc: '发贴', value: '0.8'},
        {desc: '转发', value: '0.5'},
        {desc: '粉丝', value: '1.0'},
        {desc: '捐助', value: '0.3'}
      ]
    }
  },
  // data end

  methods: {
    back: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    rpx: function (param) {
      var windowW = wx.getSystemInfoSync().windowWidth
      return Number((windowW / 750 * param).toFixed(2))
    }
  },

  // methods end
  onShow: function () {
    var X0 = this.rpx(300)
    var Y0 = this.rpx(250)
    var R = this.rpx(180)
    // 使用 wx.createContext 获取绘图上下文 ctx
    var ctx = wx.createCanvasContext('radar')

    /* 画圆背景
    ctx.arc(X0, Y0, R, 0, 2 * Math.PI)
    ctx.setFillStyle('#eeeeee')
    ctx.fill() */

    // 画圆线
    for (var i = 60; i <= 180; i += 60) {
      ctx.beginPath()
      R = this.rpx(i)
      ctx.arc(X0, Y0, R, 0, 2 * Math.PI)
      ctx.setStrokeStyle('#fff')
      ctx.setLineWidth(0.5)
      ctx.stroke()
    }

    // 计算点位置
    var point = [
      {x: X0, y: Y0 - R},
      {x: X0 - 1.73 * 0.5 * R, y: Y0 - 0.5 * R},
      {x: X0 + 1.73 * 0.5 * R, y: Y0 - 0.5 * R},
      {x: X0 - 1.73 * 0.5 * R, y: Y0 + 0.5 * R},
      {x: X0 + 1.73 * 0.5 * R, y: Y0 + 0.5 * R},
      {x: X0, y: Y0 + R}
    ]

    // 画格线
    ctx.beginPath()
    for (i = 0; i <= 5; i++) {
      ctx.moveTo(X0, Y0)
      ctx.lineTo(point[i].x, point[i].y)
    }
    ctx.setLineWidth(0.5)
    ctx.setStrokeStyle('#fff')
    ctx.stroke()

    // 写字
    ctx.setFontSize(16)
    ctx.setFillStyle('white')
    ctx.fillText(this.radarData[0].desc, this.rpx(270), this.rpx(60))// 上
    ctx.fillText(this.radarData[1].desc, this.rpx(80), this.rpx(150))// 左上
    ctx.fillText(this.radarData[2].desc, this.rpx(470), this.rpx(150))// 右上
    ctx.fillText(this.radarData[3].desc, this.rpx(80), this.rpx(380))// 左下
    ctx.fillText(this.radarData[4].desc, this.rpx(450), this.rpx(380))// 右下
    ctx.fillText(this.radarData[5].desc, this.rpx(270), this.rpx(460))// 下

    // 画点
    var x, y
    var valuePoint = [
      {x: X0, y: Y0},
      {x: X0, y: Y0},
      {x: X0, y: Y0},
      {x: X0, y: Y0},
      {x: X0, y: Y0},
      {x: X0, y: Y0}
    ]
    for (i = 0; i <= 5; i++) {
      ctx.beginPath()
      var temp = Math.abs(X0 - point[i].x) * this.radarData[i].value
      if (X0 > point[i].x) x = X0 - temp
      else if (X0 < point[i].x) x = X0 + temp
      else x = X0

      temp = Math.abs(Y0 - point[i].y) * this.radarData[i].value
      if (Y0 > point[i].y) y = Y0 - temp
      else y = Y0 + temp

      ctx.moveTo(x, y)
      ctx.arc(x, y, this.rpx(8), 0, 2 * Math.PI)
      ctx.setFillStyle('white')
      ctx.fill()
      valuePoint[i].x = x
      valuePoint[i].y = y
    }

    // 画折线
    ctx.beginPath()
    ctx.moveTo(valuePoint[0].x, valuePoint[0].y)
    // 上到左上
    ctx.lineTo(valuePoint[1].x, valuePoint[1].y)
    // 左上到左下
    ctx.lineTo(valuePoint[3].x, valuePoint[3].y)
    // 左下到下
    ctx.lineTo(valuePoint[5].x, valuePoint[5].y)
    // 下到右下
    ctx.lineTo(valuePoint[4].x, valuePoint[4].y)
    // 右下到右上
    ctx.lineTo(valuePoint[2].x, valuePoint[2].y)
    // 右上到上
    ctx.lineTo(valuePoint[0].x, valuePoint[0].y)
    ctx.setStrokeStyle('#fff')
    ctx.setLineWidth(2.5)
    ctx.stroke()
    ctx.setFillStyle('rgba(250, 250, 250, 0.2)') // 透明
    ctx.fill()

    ctx.draw()
  },
  onShareAppMessage: function () {
    return {
      title: '您的公益时长为10小时',
      desc: '公益项目',
      path: '/pages/test_mc/serviceTimeb/main?from=forward'
    }
  }
}
</script>

<style scope>
.test-cell .weui-cell__ft {
  text-align:right;
  color:#999;
  margin:20rpx 20rpx;
}
.button {
  color:#f35336;
  border-color:#f35336;
  border:1px solid #f35336;
}
.test-cell {
  padding:20rpx 30rpx;
  position:relative;
  display:-ms-flexbox;
  display:flex;
  -ms-flex-align:center;
  align-items:center;
  height:100rpx;
}
.weui-cell__hd image {
  margin-right:20rpx;
  vertical-align: middle;
  width:50rpx; 
  height:50rpx;
}
.weui-cells {
  margin-top: 0;
}
.serviceIndex {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f35336;
  height: 550rpx;
}
.canvas {
  height: 500rpx;
  width: 600rpx;
  margin-left: 75rpx;
  margin-right: 75rpx;
  margin-top: 50rpx;
}
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