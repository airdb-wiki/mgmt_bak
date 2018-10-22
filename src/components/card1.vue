<template>
  <div>
    <scroll-view>
      <div v-for="item in items" :key="item.id">
        <div class="weui-cell" :id="item.UUID" @click="a">
          <div class="weui-cell__hd">
            <image :src="item.AvatarUrl" style="vertical-align: middle;width:65px; height: 90px;border-radius: 5px 0 0 5px;"></image>
          </div>
          <div class="weui-cell__bd" style="margin-left: 8px;">
            <div class="title">{{item.title}}寻找回家的路，让你不再孤立无援ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</div>
            <div class="info_1">
              
              <text v-if="item.Gender == 2">女</text>
              <text v-else>男</text>

              <text>{{item.Category}}</text>
              <text>拐卖</text>
              <text>离家出走</text>

            </div>


            <div class="pub_info">
                <img src="/static/images/home/position.png" style="position: absolute; left: 5px;bottom: 4px;">
                <navigator url="/pages/location/main?title=navigate" hover-class="navigator-hover">
                  {{item.MissedAddress}}
                </navigator>
              <div>
                <img src="/static/images/home/notice.png" style="position: absolute; right: 45px;bottom: 4px;">
                <text style="position: absolute; right: 10px;line-height: 30px;">2000</text>
              </div>
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
}
.pub_info navigator{
  margin-left: 32px;
  text-decoration:underline;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 180px;
}
.title{
  width: 270px;
  font-weight: bold;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info_1 text{
  padding: 0px 10px;
  border-radius: 5px;
  background: #e2e2e2;
  margin-right: 4px;
  font-size: 14px;
}
.weui-cell{
  padding: 0;
  margin: 8px 10px;
  border: none;
  line-height: 28px;
  border-radius: 5px;
  box-shadow: 0 0 5px #b1b1b1;
  background: #fff;
}
</style>
