<template>
  <div>
    <scroll-view>
      <div v-for="item in items" :key="item.id">
        <div class="weui-cell" :id="item.UUID" @click="a">
          <div class="weui-cell__hd">
            <image :src="item.AvatarUrl" style="vertical-align: middle;width:65px; height: 90px;border-radius: 5px 0 0 5px;"></image>
          </div>
          <div class="weui-cell__bd" style="margin-left: 8px;">
            <div class="title">{{item.title}}寻找回家的路，让你不再孤立无援</div>
            <div class="info_1">
              <text v-if="item.Gender == 2">女</text>
              <text v-else>男</text>
              <img src="/static/images/home/position.png" style="width: 16px;height: 16px;">
              <text>{{item.MissedAddress}}河南省洛阳市</text>
            </div>
            <div class="pub_info">
              <div>{{item.Nickname}}发表于宝贝回家</div>
              <img src="/static/images/home/notice.png">
              <text style="position: absolute; right: 10px;line-height: 20px;">2000</text>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: ['items'],
  data () {
    return {
      index: 0
    }
  },
  methods: {
    a (e) {
      wx.navigateTo({
        url: '../../pages/detail/main?id=' + e.currentTarget.id
      })
    }
  }
}
</script>

<style scoped>
.address{
  margin-left: 5px;
}
.pub_info{
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 14px;
}
.pub_info image{
  width: 20px;
  height: 20px;
  position: absolute;
  right: 45px;
}
.title{
  font-weight: bold;
  flex-wrap: wrap;
  font-size: 18px;
}
.info_1 text{
  padding: 0px 10px;
  border-radius: 5px;
  background: #e2e2e2;
  margin-right: 20px;
  font-size: 14px;
}
.weui-cell{
  padding: 0;
  margin: 8px 10px;
  border: none;
  line-height: 28px;
  border-radius: 5px;
  box-shadow: 0 0 5px #b1b1b1;
  background: rgba(255, 99, 7, .2);
}
</style>
