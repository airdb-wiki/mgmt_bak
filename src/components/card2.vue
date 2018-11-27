<template>
  <div class="page">
    <div v-for="(item, index) in items" :key="index" class="container">
        <div class="head">
            <div class="avatar"><img :src="item.AvatarUrl"></div>
            <div class="content">
                <div class="se_container">
                    <div class="name">{{item.Nickname}}</div>
                    <div class="age">{{item.Age}}岁</div>
                </div>
                <div class="se_container">
                    <div class="time">{{item.MissedAt}}</div>
                </div>
                <div class="se_container">
                    <div class="missPlace">{{item.MissedAddress}}</div>
                </div>
                <div class="distance">100</div>
            </div>
        </div>
        <span class="more"><img src="/static/images/home/down.png" alt=""></span>
        <div class="other">
            <div class="t_container">
                <span class="icon"><img src="/static/images/home/notice.png"></span>
                <span class="num">15</span>
            </div>
            <div class="t_container">
                <span class="icon"><img src="/static/images/home/talk.png"></span>
                <span class="num">11</span>
            </div>
            <div class="t_container">
                <span class="icon"><img src="/static/images/home/down.png"></span>
                <span class="num">22</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card2',
  props: ['items'],
  data () {
    return {

    }
  },
  onLoad () {
  }
}
</script>

<style scoped>
.page{
    margin-top: 20px;
}
.container{
    margin: 1em;
    padding: 0;
    border: 1px solid #bababa;
    border-radius: 0.5em;
}
.head{
    margin: 0.5em;
    margin-left: 0px;
    display: flex;
    flex-direction: row;
}
.avatar{
    flex: 1;
    max-width: 7em;
    max-height: 7em;
    margin-right: 0.3em;
    vertical-align: top;
}
.avatar img{
    max-width: 7em;
    max-height: 7em;
}
.content{
    flex: 1;
}
.se_container{
    display: flex;
    flex-direction: row;
}
.age{
    margin-left: 120px;
}
.more{
    margin: auto;
}
.more img{
    width: 2em;
    height: 2em;
}
.other{
    width: 100%;
    border-top: 1px dashed #bababa;
    display: flex;
    flex-direction: row;
}
.t_container{
    flex: 1;
    text-align: center;
    padding: .5em;
}
.icon{
    width: 1.6em;
    height: 1.6em;
    display: inline-block;
    vertical-align: top;
}
.icon img{
    width: 1.6em;
    height: 1.6em;
}
.num{
    display: inline-block;
}
</style>
