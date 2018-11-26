<template>
  <div class="page">
    <div v-for="(item, index) in items" :key="index" class="container">
        <div class="head">
            <div class="avatar"><img :src="item.AvatarUrl"></div>
            <div class="content">
                <div class="se_container">
                    <div class="name">{{item.Nickname}}</div>
                    <div class="age">{{item.Age}}</div>
                </div>
                <div class="c_container">
                    <div class="time">{{item.MissedAt}}</div>
                </div>
                <div class="c_container">
                    <div class="missPlace">{{item.MissedAddress}}</div>
                    <div class="distance">100</div>
                </div>
            </div>
        </div>
        <span class="more"><img src="/static/images/home/down.png" alt=""></span>
        <div class="other">
            <div>
                <span class="icon"><img src="/static/images/home/notice.png"></span>
                <span class="num">15</span>
            </div>
            <div>
                <span class="icon"><img src="/static/images/home/talk.png"></span>
                <span class="num">11</span>
            </div>
            <div>
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
    margin-top: 70px;
}
.container{
    margin: 1em;
    border: 1px solid #e2e2e2;
    border-radius: 0.5em;
}
</style>
