<template>
  <div>
    <navigation :search='false'></navigation>

    <!-- 顶部背景 -->
    <div class="trans" :style="style">
      <div class="nickName">{{userInfo.nickName}}</div>
      <div class="avatar">
        <image :src="userInfo.avatarUrl"></image>
      </div>
    </div>
    <image src="/static/images/home/sls.png" mode="scaleToFill" class="bg"></image>

    <div class="more">+</div>
    
    <div style="padding-top: 30px;background-color: #fff;">
      <div class="trend_container">
        <div style="img">
          <image src="/static/images/home/wx.png" style="width: 50px;height: 50px;"></image>
        </div>
        <div class="content">
          <div style="font-size: 18px;font-weight: bold;">仙人球</div>
          <div>{{content}}</div>
          <div class="imgContainer">
            <image class="weui-article__img" src="/static/images/home/sls.png" mode="aspectFill"/>
            <image class="weui-article__img" src="/static/images/home/sls.png" mode="aspectFill"/>
          </div>
          <div class="talk">
            <div>{{time}}</div>
            <image src="/static/images/home/talk1.png"></image>
          </div>
        </div>
      </div>
      <div class="trend_container">
        <div style="img">
          <image src="/static/images/home/wx.png" style="width: 50px;height: 50px;"></image>
        </div>
        <div class="content">
          <div style="font-size: 18px;font-weight: bold;">仙人球</div>
          <div>{{content}}</div>
          <div class="imgContainer">
            <image class="weui-article__img" src="/static/images/home/sls.png" mode="aspectFill"/>
            <image class="weui-article__img" src="/static/images/home/sls.png" mode="aspectFill"/>
          </div>
          <div class="talk">
            <div>{{time}}</div>
            <image src="/static/images/home/talk1.png"></image>
          </div>
        </div>
      </div>
      <div class="trend_container">
        <div style="img">
          <image src="/static/images/home/wx.png" style="width: 50px;height: 50px;"></image>
        </div>
        <div class="content">
          <div style="font-size: 18px;font-weight: bold;">仙人球</div>
          <div>{{content}}</div>
          <div class="imgContainer">
            <image class="weui-article__img" src="/static/images/home/sls.png" mode="aspectFill"/>
            <image class="weui-article__img" src="/static/images/home/sls.png" mode="aspectFill"/>
          </div>
          <div class="talk">
            <div>{{time}}</div>
            <image src="/static/images/home/talk1.png"></image>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import navigation from '@/components/navigation'

export default {
  components: {
    navigation
  },
  data () {
    return {
      tabs: [
        '家寻宝贝', '宝贝寻家', '救助寻亲', '流浪乞讨', '实时寻人', '其他寻人'
      ],
      num: [
        '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'
      ],
      style: 'background: rgba(255, 255, 255, 0)',
      content: '2014年6月8日，经人介绍，约32岁的陈连发在宝贝回家寻子网站进行了寻亲登记，寻家工作组志愿者精彩跟进该案例，及时和陈连发进行沟通',
      time: '一天前',
      userInfo: {}
    }
  },
  onShareAppMessage: function () {
    return {
      title: '凝聚每一份爱的力量',
      path: '/pages/hr/main?from=forward',
      imageUrl: '/static/images/forward.png'
    }
  },
  onPageScroll (res) {
    this.style = 'background: rgba(255, 255, 255, ' + res.scrollTop / 150 + ')'
  },
  methods: {
    navTo () {
      wx.navigateTo({ url: '/pages/test_mc/successPage/main' })
    }
  },
  onLoad () {
    this.userInfo = wx.getStorageSync('userInfo')
    console.log(this.userInfo)
  }
}
</script>

<style scoped>
.trans{
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 180px;
  margin-top: 72px;
  background-color: rgba(255, 255, 255, 0);
}
.nickName{
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  bottom: 10px;
  right: 122px;
}
.avatar{
  z-index: 1;
  position: absolute;
  bottom: -40px;
  right: 20px;
  height: 94px;
  border: 1px solid rgba(0, 0, 0, .5);
  background-color: #fff;
}
.avatar image{
  width: 90px;
  height: 90px;
  margin: 2px;
  margin-bottom: 0px;
}
.bg{
  width: 100%;
  height: 180px;
  position: fixed;
  top: 72px;
  left: 0;
  z-index: -1;
}
.navbar{
  width: 100%;
  white-space: nowrap;
  background-color: #fff;
  overflow: hidden;
}
::scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.tab{
  text-align: center;
  font-size: 20px;
  width: 100px;
  display: inline-block;
  box-sizing: border-box;
  padding: 2px 0;
}
.tab:hover{
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  width: 100px;
  display: inline-block;
  box-sizing: border-box;
  border-bottom: 4px solid #e2d609;
}
.bar{
  position: sticky;
  top: 70px;
  z-index: 999;
}
.bar::after{
  content: '+';
  font-size: 20px;
  font-weight: bold;
  line-height: 30px;
  background-color: rgba(255, 255, 255, .85);
  z-index: 9999;
  height: 30px;
  padding: 0 7px;
  position: absolute;
  top: 0;
  right: 0;
}
.trend_container{
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #cccccc;
}
.img{
  width: 50px;
  height: 50px;
}
.content{
  padding: 0px 40px 10px 10px;
}
.imgContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.imgContainer image{
  width: 80px;
  height: 80px;
  margin: 2px;
}
.talk{
  position: relative;
  display: flex;
  padding-top: 5px;
}
.talk image{
  width: 20px;
  height: 20px;
  padding-top: 5px;
  position: absolute;
  top: 5px;
  right: 0;
}
.more{
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #fff;
  background-color: #1296db;
  font-size: 35px;
  text-align: center;
  line-height: 45px;
}
</style>
