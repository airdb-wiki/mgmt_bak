<template>
  <div class>
    <navigation :search='false'></navigation>

    <!-- 顶部背景 -->
    <div class="trans" :style="style"></div>
    <image src="/static/images/home/sls.png" mode="scaleToFill" class="bg"></image>

    <!-- navBar -->
    <div class="bar">
      <scroll-view :scroll-x="true" class="navbar">
        <div v-for="tab in tabs" :key="tab.id" class="tab">{{tab}}</div>
      </scroll-view>
    </div>
    
    <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell" v-for="item in num" :key="item.id" @click="navTo">
          <div class="weui-cell__hd">
            <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
          </div>
          <div class="weui-cell__bd">标题文字</div>
          <div class="weui-cell__ft">说明文字</div>
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
      style: 'background: rgba(255, 255, 255, 0)'
    }
  },
  onPageScroll (res) {
    this.style = 'background: rgba(255, 255, 255, ' + res.scrollTop / 120 + ')'
  },
  methods: {
    navTo () {
      wx.navigateTo({ url: '/pages/test_mc/successPage/main' })
    }
  }
}
</script>

<style scoped>
.trans{
    width: 100%;
    height: 130px;
    margin-top: 72px;
    background-color: rgba(255, 255, 255, 0);
}
.bg{
  width: 100%;
  height: 130px;
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
</style>
