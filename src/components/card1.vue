<template>
  <div>
    <scroll-view>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell" v-for="item in items" :key="item.id">
          <div class="weui-cell__hd">
            <image :src="item.AvatarUrl" style="vertical-align: middle;width:65px; height: 100px;border-radius: 5px 0 0 5px;"></image>
          </div>
          <div class="info_container">
            <div class="title">{{item.title}}寻找回家的路，让你不再孤立无援</div>
            <div class="info_1">
              <text>{{item.Age}}岁</text>
              <text>{{item.sex}}男</text>
            </div>
            <div class="address">
              <img src="/static/images/home/position.png" style="width: 18px;height: 18px;">
              <text>{{item.MissedAddress}}河南省洛阳市</text>
            </div>
            <div class="inf0_2">跟进志愿者：{{item.editor}}南舒北朗</div>
            <div>注册时间：{{item.time}}2017-6-19</div>
          </div>
          <!-- <div class="weui-cell__bd">标题文字</div>
          <div class="weui-cell__ft">说明文字</div> -->
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: ['items']
}
</script>

<style scoped>
.info_container{
  display: flex;
  flex-direction: column;
  flex: 3;
  padding-left: 10px;
  line-height: 20px;
  background: rgba(255, 99, 7, .2);
}
.address{
  margin-left: 5px;
}
.title{
  font-weight: bold;
  flex-wrap: wrap;
  font-size: 18px;
}
.info_1 text{
  margin-right: 20px;
}
.weui-cell{
  padding: 0;
  margin: 6px 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px #b1b1b1;
}
</style>
