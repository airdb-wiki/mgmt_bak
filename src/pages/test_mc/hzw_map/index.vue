<template>
  <div class='g_con'>

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
      <div v-else class="title">{{item.Title}}</div>
    </div>
    <!-- navigation -->

    <div class='topExpress'>

      <div class='topExpress-right'>
        <div class='topExpress-right-top'>宝贝回家小程序</div>
        <div class='topExpress-right-middle'>开发过程</div>
        <div class='topExpress-right-bottom'>联系方式 12321323(微信)</div>
      </div>

    </div>

    <!-- 时间轴 -->
    <div class='expressRecord'>


      <!-- Target状态 -->
      <div class='expressRecord-getAddress'>
        <div class='expressRecord-top'>
          <div class='getAddress-icon'>
            Tar
          </div>
          <div class='getAddress-text' @click="navToTarget">小程序Target</div>
        </div>

        <!-- 顶部时间轴线 -->
        <div class='online-top-close'></div>
      </div>




      <!-- 单个时间轴结点 -->
      <div class='expressRecord-single-close' v-for="(item, index) in items" :key="index">
        <div class='expressRecord-single-noReach-online-top-close'>
          <div class='online-top-close'></div>
          <!-- <div class='dot-close' v-if="item.day.length == 4" style="background: cyan;"></div>
          <div class='dot-close' v-else :style="[index == 1 ? 'background: rgb(186, 255, 82);' : '']"></div> -->
          <div class="dot">
            <img :style="[item.day.length == 4 ? 'width: 25px;height: 25px;margin-left: 75rpx;' : '']"
            :src="item.day.length == 2 ? images.now : (item.day.length==5 ? images.history: images.year)">
          </div>
          <div class='online-bottom'></div>
        </div>

        <div class='expressRecord-text'>
          <div class='expressRecord-status'></div>
          <div class='expressRecord-status-address' @click="showDetail(index)"
            :style="[item.day.length == 4 ? 'color: cyan;font-weight: bold;' : '']">
            {{item.content}}
          </div>
        </div>

        <div class='expressRecord-date' v-if="item.day.length == 4">
          <div class='expressRecord-date-time' style="color: cyan;">
            {{item.day}}
          </div>
        </div>
        <div class='expressRecord-date' v-else>
          <div class='expressRecord-date-time' :style="[index == 1 ? 'margin-left: 6px;' : '']">
            {{item.day}}
          </div>
        </div>
      </div>

    </div>

    <div class="card">
      <div class="time">{{detailShowed.time}}</div>
      <div>
        <div class="title1">
          <div class="title1_container">
            <span><img src="/static/images/home/parter.png"></span>
            <span class="text">贡献者</span>
          </div>
          <div class="list">
            <ul>
              <li v-for="(contributer, index) in detailShowed.contributers" :key="index">
                {{contributer}}
              </li>
            </ul>
          </div>
        </div>
        <div class="title1">
          <div class="title1_container">
            <span><img src="/static/images/home/achieve.png"></span>
            <span class="text">Achievement</span>
          </div>
          <div class="list">
            <p>{{detailShowed.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [{
        day: '2018',
        content: '———————————————————'
      }, {
        content: '正在努力实现小程序插件的使用，欢迎大家加入',
        day: '今天'
      }, {
        content: '实现xxx功能',
        day: '10-21'
      }, {
        content: '实现xxx功能',
        day: '10-21'
      }, {
        content: '实现xxx功能',
        day: '10-21'
      }, {
        content: '实现xxx功能',
        day: '10-21'
      }
      ],
      images: {
        'now': '/static/images/home/now.png',
        'history': '/static/images/home/history.png',
        'year': '/static/images/home/year.png'
      },
      detailShowed: {
        time: '2018-7-12',
        content: '正在努力实现小程序插件的使用，欢迎大家加入实现xxx功能件的使用，欢迎大家加入实现xxx功能',
        contributers: [
          'IWTF',
          'Dean'
        ]
      },
      show: false
    }
  },
  methods: {
    navToTarget () {
      wx.navigateTo({ url: '/pages/hr/main' })
    },
    showDetail () {

    }
  }
}
</script>

<style scoped>
page {
  background: #f4f4f4;
}

.navigation{
  width: 100%;
  padding-top: 21pt;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  z-index: 9999;
  display: flex;
  flex-direction: row;
}

.title{
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
  height: 15pt;
}

.back{
  width: 20pt;
  height: 20pt;
}

.home{
  width: 17pt;
  height: 17pt;
}

.g_con {
  width: 100vw;
  overflow-x: hidden;
}

.topExpress {
  width: 710rpx;
  height: 155rpx;
  background: #fff;
  margin: 146rpx auto 10rpx;
  display: flex;
  border-radius: 10rpx;
}

.topExpress-left {
  width: 100rpx;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.topExpress-right {
  font-size: 26rpx;
  color: #333;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: flex-start;
  padding: 20rpx 30px;
}

.topExpress-right-top{
  font-size: 16px;
}

.topExpress-right-middle {
  font-size: 14px;
}

.topExpress-right-bottom {
  font-size: 14px;
  color: #666;
}

.expressRecord {
  width: 710rpx;
  padding-top: 30rpx;
  padding-bottom: 200rpx;
  background: #fff;
  margin: 0 auto;
  border-radius: 10rpx;
}

.expressRecord-getAddress {
  width: 100%;
  font-size: 22rpx;
  color: #999;
  display: flex;
  margin-left: 40rpx;
  position: relative;
}

.expressRecord-top {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.getAddress-icon {
  width: 45rpx;
  height: 45rpx;
  border-radius: 50%;
  background: rgb(104, 173, 0);
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 74rpx;
}

.getAddress-text {
  margin-left: 20rpx;
  font-size: 16px;
  position: relative;
}

.getAddress-text::after{
  content: '';
  position: absolute;
  top: 8px;
  right: -28px;
  width: 10px;
  height: 0px;
  border: 6px solid;
  border-color:  transparent transparent transparent #999;
}

.expressRecord-single-close {
  width: 100%;
  height: 122rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.expressRecord-single-noReach-online-top-close {
  display: flex;
  flex-direction: column;
  margin-left: 40rpx;
}

.online-top-close {
  width: 4rpx;
  height: 50rpx;
  background: #999;
  margin-left: 95rpx;
  margin-top: 10rpx;
}

.dot-close {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  margin-left: 86rpx;
  margin-top: 6rpx;
  margin-bottom: 6rpx;
  background: #999;
}

.online-bottom {
  width: 4rpx;
  height: 50rpx;
  background: #999;
  margin-left: 95rpx;
  margin-bottom: 10rpx;
}

.online-bottom-start {
  width: 4rpx;
  height: 50rpx;
  /* background: #999; */
  margin-left: 95rpx;
}

.expressRecord-text {
  margin-left: 30rpx;
}

.expressRecord-statusing {
  font-size: 26rpx;
  color: #333;
}

.expressRecord-status-addressing {
  font-size: 12px;
  color: #333;
}


.expressRecord-status {
  font-size: 26rpx;
  color: #999;
}

.expressRecord-status-address {
  font-size: 12px;
  color: #999;
  word-wrap: normal;
}

.expressRecord-dating {
  position: absolute;
  height: 100%;
  /* top: 0;
  bottom: 0; */
  left: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #333;
}

.expressRecord-date {
  position: absolute;
  height: 100%;
  /* top: 0;
  bottom: 0; */
  left: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #999;
}

.expressRecord-date-text {
  font-size: 14px;
}

.expressRecord-date-time {
  font-size: 16px;
}

.dot{
  width: 20px;
  height: 20px;
}

.dot img{
  width: 20px;
  height: 20px;
  margin-left: 77rpx;
}

.card{
  padding: 15px 0;
  border-radius: 15px;
  max-width: 200px;
  margin: auto;
  z-index: 9999;
  background: rgb(127, 255, 255);
  box-shadow: 0 8px 10px aqua;
  margin-bottom: 30px;
}

.time{
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.title1{
  margin: 10px 20px 5px;
  text-align: left;
}

.title1 img{
  vertical-align: top;
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 5px 5px 0 0;
}

.text{
  font-size: 16px;
  border-bottom: 1px solid #ff3499;
}

.list{
  margin-top: 5px;
  margin-left: 5px;
  font-size: 12px;
}
</style>
