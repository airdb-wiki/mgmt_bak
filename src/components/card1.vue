<template>
  <div>
    <scroll-view>
      <div v-for="item in items" :key="item.id" class="container">
        <div style="flex: 1;">
          <img :src="item.AvatarUrl">
        </div>
        <div class="info_container">
          <div class="address">
            <img src="/static/images/home/position.png" style="width: 18px;height: 18px;">
            <text>{{item.MissedAddress}}河南省洛阳市</text>
          </div>
          <div class="title">{{item.title}}寻找回家的路，让你不再孤立无援</div>
          <div class="info_1">
            <text>{{item.Age}}岁</text>
            <text>{{item.sex}}男</text>
          </div>
          <div class="inf0_2">跟进志愿者：{{item.editor}}南舒北朗</div>
          <div>注册时间：{{item.time}}2017-6-19</div>
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
.container{
  display: flex;
  flex-direction: row;
  margin: 10px 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px #e2e2e2;
  height: 180px;
}
.container img{
  width: 120px;
  height: 180px;
  border-radius: 5px 0 0 5px;
}
.info_container{
  display: flex;
  flex-direction: column;
  flex: 2;
  padding: 5px;
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
</style>
