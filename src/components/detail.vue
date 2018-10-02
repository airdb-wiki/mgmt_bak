<template>
  <div>
  	<div v-for="content in contents" :key="content.id" style="z-index: 0;">
  	  <div class="title">{{content.title}}</div>

  	  <div class="header">
  	  	<img :src="content.url">
  	  	<div>{{content.writer}}</div>
  	  	<div>{{content.time}}</div>
  	  	<button :size="mini">+ 喜欢</button>
  	  </div>

  	  <img :src="content.coverUrl" class="cover" :mode="aspectFit">
  	  <div class="desc">{{content.desc}}</div>

  	  <div class="general">{{content.general}}</div>

      <div class="edit">撰文 | {{content.writer}}</div>
      <div class="edit">王波 | {{content.editor}}</div>

      <div class="pra">{{content.pra}}</div>
  	</div>
    <div class="share" v-on:click="share">
      <img src="/static/images/home/share.png">
    </div>
    <!-- 底部分享，评论栏 -->
    <div>
      <button @click="shareToFriends" open-type='share' :apply="true">分享给好友</button>
      <button @click="download">生成海报</button>
    </div>
  </div>
</template>

<script>
export default{
  name: 'detail',
  data () {
    return {
      contents: [
        {
          title: '顶梁柱“北漂”意外之死',
          url: '/static/images/home/sls.png',
          writer: '李华良',
          editor: '王波',
          time: '2018-09-25',
          coverUrl: '/static/images/home/vr.png',
          desc: '2018年8月8日，北京通州迎来强降水。通州区气象台升级发布了暴雨橙色预警，部分低洼路出现积水。摄影 | 赵庆（视觉中国）',
          general: '他是儿子、丈夫和父亲。三十而立的他像很多大学毕业的“北漂”一样，成为家里的顶梁柱。如今，他在暴雨中猝然离去。',
          pra: '刘晓苍的家人怎么也没想到，那场在网上刷屏的暴雨，会彻头彻尾地“浇”进自己家里，并带走了被全家人视为顶梁柱的人。2018年8月8日的防汛信息显示，北京出现强降雨，全市平均降雨39.2毫米，最大降雨量和最大雨强均出现在朝阳区黑庄户，降雨量达214.0毫米，最大雨强出现在8时至9时。'
        }
      ]
    }
  },
  methods: {
    share () {
      console.log('click')
    }
  },
  onShareAppMessage () {
  }
}
</script>

<style scoped>
.title{
	font-size: 22px;
	font-weight: bold;
	padding: 20px 0 20px 10px;
}
.header{
	display: flex;
	flex-direction: row;
	padding: 0 0 20px 15px;
  align-items: center;
}
.header img{
  width: 23px;
  height: 23px;
  border-radius: 50%;
  margin: 0 4px;
}
.header div{
  font-size: 14px;
  color: #d2d2d2;
  padding: 0 4px;
}
.header button{
  background-color: #9db3a9;
  border-radius: 16px;
  color: #fff;
  padding: 0 13px;
  font-size: 15px;
  height: 30px;
  line-height: 30px;
}
.cover{
  width: 100%;
}
.desc{
  font-size: 12px;
  margin: 0 20px;
  color: #a1a1a1;
}
.general{
  margin: 28px 20px 15px 20px;
  font-size: 16px;
}
.edit{
  margin: 15px 15px;
  font-size: 16px;
}
.pra{
  margin: 15px 15px;
  font-size: 16px;
}
.share{
  position:fixed;
  top: 488px;
  right: 17px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #82bb8b;
  text-align: center;
  line-height: 50px;
  z-index: 999;
}
.share img{
  width: 35px;
  height: 35px;
  margin-top: 7px;
}
</style>