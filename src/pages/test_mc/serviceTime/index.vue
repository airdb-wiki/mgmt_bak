<template>
  <div class="test-page">

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

      <!-- 此处文字颜色为白色，即不显示标题 -->
      <div class="title">详情</div>
    </div>
    <!-- navigation end -->

    <div class="test-page-main">
      <div class="serviceIndex">
        <div class="index-title">成长指标</div>
          <canvas class="canvas" canvas-id="radar"></canvas>
        <div class="index-detail" @click="clickDetail">查看明细></div>
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

        <div class="weui-cell test-cell" v-for="(item, index) in items" :key="index">
          <div class="weui-cell__hd">
            <image src="/static/images/test_mc/2.png"></image>
          </div>
          <div class="weui-cell__bd">
            <div class="bd_head">{{item.name}}</div>
            <div class="bd_foot">
              <div class="label">成长值</div>
              <div class="value">+{{item.value}}</div>
            </div>
          </div>
          <div class="weui-cell__ft">
            <button class="myButton" hover-class="none">去看看</button>
          </div>
        </div>
        <!-- cell end -->
      </div>
      <!-- cells end -->
    </div>
    <!-- test-page-main end -->

    <div class="test-page-footer"></div>
  </div>
</template>

<script>
export default{
  data () {
    return {
      title: '成长指标',
      growIndex: 0,
      radarData: [
        {desc: '参与', value: '0.6'},
        {desc: '关注', value: '0.5'},
        {desc: '发贴', value: '0.8'},
        {desc: '转发', value: '0.5'},
        {desc: '粉丝', value: '1.0'},
        {desc: '捐助', value: '0.3'}
      ],
      items: [
        {name: '标题一', value: '200'},
        {name: '标题二', value: '100'},
        {name: '标题三', value: '50'},
        {name: '标题四', value: '50'},
        {name: '标题五', value: '20'},
        {name: '标题六', value: '20'}
      ]
    }
  },
  // data end

  methods: {
    rpx: function (param) {
      var windowW = wx.getSystemInfoSync().windowWidth
      return Number((windowW / 750 * param).toFixed(2))
    },
    clickDetail: function () {
      console.log('===clickDetail===')
      wx.navigateTo({
        url: '/pages/test_mc/hzw_text/main'
      })
    }
  },
  // methods end

  /*
  onPageScroll (res) {
    if (res.scrollTop > 40) {
      this.showTitle = true
    } else {
      if (res.scrollTop < 40) {
        this.showTitle = false
      }
    }
  },
  */

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
    ctx.fillText(this.radarData[2].desc, this.rpx(455), this.rpx(145))// 右上
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

    var that = this

    ctx.draw(true, function () {
      console.log('draw callback success')
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 500,
        height: 600,
        canvasId: 'radar',
        fileType: 'png',
        success: function (res) {
          that.tempFilePath = res.tempFilePath
          that.canvasHidden = true
          console.log('canvasToTempFilePath callback success')
          console.log('tempFilePath==', that.tempFilePath)
        }
      })
    })
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
.bd_head {
  font-size:35rpx;
}
.bd_foot .label {
  color:#505050;
  font-size:25rpx;
  width:80rpx;
}
.bd_foot .value {
  padding-left:10rpx;
  font-size:25rpx;
  color:#f35336;
}
.bd_foot {
  padding-top:10rpx;
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
}
.index-detail {
  position:fixed;
  top:165rpx;
  right:25rpx;
  font-size:28rpx;
  color:#fff;
}
.index-title {
  position:fixed;
  top:160rpx;
  left:30rpx;
  font-size:30;
  color:#fff;
}
.weui-cell__ft {
  font-size:30rpx;
  color:black;
}
.myButton {
  border: 0.5rpx solid #ff0000; 
  border-radius: 15rpx;  
  background-color: white;
  height:60rpx;
  width:120rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:25rpx;
  color:#ff0000;
  padding:0;
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
  width:70rpx; 
  height:70rpx;
}
.weui-cells {
  margin-top: 0;
}
.serviceIndex {
  position:relative;
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
  margin-top:130rpx;
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
  width: 100%;
  padding: 18pt 0 4pt 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: row;
}
.title{
  color: #fff;

  pointer-events:none;
  width: 50%;
  margin-left: 3pt;
  text-align: center;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30pt;
  font-size: 18px;
}
.btn{
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3pt 0pt 5pt 4pt;
  margin-left: 6pt;
  width: 56pt;
  height: 16pt;
}
.back{
  width: 20pt;
  height: 20pt;
}
.home{
  width: 17pt;
  height: 17pt;
}
</style>