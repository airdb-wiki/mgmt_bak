<template>
  <div>
    <div v-for="(item,index) in items" :key="item.id" class="container">
      <navigator v-if="index == 0" url="/pages/detail/main" hover-class="none">
        <div style="margin-top: 30px;">
          <img v-bind:src="item.url" class="img"></img>
          <p>{{item.title}}</p>
          <div class="editor">
            <img class="img1" v-bind:src="item.avatarUrl">
            <text>{{item.editor}}</text>
            <text class="ha">{{item.team}}</text>
            <text class="ha">{{item.time}}</text>
            <img src="/static/images/home/zhuan.png" class="img2">
          </div>
        </div> 
      </navigator>
      <navigator v-else url="/pages/detail/main" hover-class="none">
        <div>
          <img v-bind:src="item.url" class="img"></img>
          <p>{{item.title}}</p>
          <div class="editor">
            <img class="img1" v-bind:src="item.avatarUrl">
            <text>{{item.editor}}</text>
            <text class="ha">{{item.team}}</text>
            <text class="ha">{{item.time}}</text>
            <img src="/static/images/home/zhuan.png" class="img2">
          </div>
        </div> 
      </navigator>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: ['items']
}
</script>

<style>
.container{
  padding: 0;
  margin: 8px 30px;
  border-radius: 6px;
  background-color: #fff;

}
.img{
  border-radius:6px;
  width: 100%;
  height:200px;
  margin: 0;
  padding: 0;
}
.container p{
  padding: 14px;
}
.editor{
  position: relative;
  width:100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.img1{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 10px 10px 10px;
}
.img2{
  position: absolute;
  right: 20px;
  bottom: 15px;
  width:20px;
  height: 20px;
}
.editor text{
  font-size: 14px;
  color: #111;
  margin-bottom: 15px;
}
.ha{
  color:#a2a2a2;
  font-size: 8px;
  margin-left: 14px;
}
</style>
