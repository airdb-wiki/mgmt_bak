<template>
  <div>
    <!-- <div v-for="(item, index) in items" :key="index">
      <div class="time">
        <text>{{item.time}}</text>
      </div>
      <div class="container">
        <image :src="item.imgUrl"></image>
        <div class="title">{{item.title}}</div>
        <div class="general">{{item.general}}</div>
      </div>
    </div> -->
    <light-timeline :items='items'></light-timeline>
  </div>
</template>

<script>
const theme = 'red'
export default {
  data () {
    return {
      // items: [
      //   {
      //     imgUrl: '/static/images/home/sls.png',
      //     title: '到底什么算“精日”？南京这个条例给你答案！',
      //     general: '“将改革开放进行到底”',
      //     time: '10月10日 早上8:32'
      //   },
      //   {
      //     imgUrl: '/static/images/home/sls.png',
      //     title: '到底什么算“精日”？南京这个条例给你答案！',
      //     general: '“将改革开放进行到底”',
      //     time: '10月10日 早上8:32'
      //   },
      //   {
      //     imgUrl: '/static/images/home/sls.png',
      //     title: '到底什么算“精日”？南京这个条例给你答案！',
      //     general: '“将改革开放进行到底”',
      //     time: '10月10日 早上8:32'
      //   }
      // ],
      items: [
        {
          tag: '2018-01-12',
          content: 'hallo'
        },
        {
          tag: '2018-01-13',
          color: '#dcdcdc',
          type: 'circle',
          content: 'world'
        },
        {
          type: 'star',
          tag: '2018-01-14',
          htmlMode: true,
          content: `<div style="color: ${theme};"> =v = </div>`
        }
      ]
    }
  }
}
</script>

<style scoped>
.container{
  margin: 0 15px 10px;
  border-radius: 4px;
}
.time{
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
  padding: 10px 0 5px;
}
.time text{
  background-color: rgba(145, 145, 145, 0.3);
  color: #fff;
  border-radius: 3px;
  padding: 2px 4px;
}
.container image{
  width: 345px;
  height: 150px;
  border-radius: 4px 4px 0 0;
}
.container div{
  padding: 2px 10px;
}
.title{
  font-weight: bold;
  font-size: 18px;
  width: 340px;
}
.general{
  font-size: 16px;
  color: #a0a0a0;
  width: 340px;
}
</style>
