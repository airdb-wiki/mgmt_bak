<template>
  <div>
    <navigation :search='false'></navigation>

    <!-- 顶部背景 -->
    <div class="trans" :style="style">
      <div class="nickName">{{userInfo.nickName}}</div>
      <div class="avatar">
        <img :src="userInfo.avatarUrl">
      </div>
    </div>
    <img src="/static/images/home/sls.png" mode="scaleToFill" class="bg">
    <button class="more" @click="plus">+</button>
    <button class="more" @click="clear" style="background-color: red; bottom:120px;">-</button>

    <div style="padding-top: 30px;background-color: #fff" v-for="(item,index) in items" :key="index">
    <tx-video vid="e0354z3cqjp"></tx-video>

      <div class="trend_container">
        <div class="img">
          <img :src="item.avatar" style="width: 50px;height: 50px;">
        </div>
        <div class="content">
          <div style="font-size: 18px;font-weight: bold;">{{item.nickname}}</div>
          <p style="word-break: break-all">{{item.textmsg}}</p>
          <div class="imgContainer">
            <template  v-for="(pic,ind) in item.pictures" >
               <img :src=pic :key=ind mode="aspectFill" @click="previewImg(index,pic,$event)"/>
            </template> 
          </div>
          <div class="talk">
            <div  class="talk_time">{{time}}</div>
            <img src="/static/images/home/talk1.png">
          </div>
        </div>
      </div>
    </div>

    <!-- 文章链接测试1 -->
    <div class="trend_container" style="background-color: #fff;">
      <div class="img">
        <img :src="userInfo.avatarUrl" style="width: 50px;height: 50px;">
      </div>
      <div class="content">
        <div style="font-size: 18px;font-weight: bold;">{{userInfo.nickName}}</div>
        <div class="arc">
          <img :src="arc.imgUrl">
          <div>{{arc.title}}</div>
        </div>
        <div class="talk">
          <div  class="talk_time">{{time}}</div>
          <img src="/static/images/home/talk1.png">
        </div>
      </div>
    </div>

    <!-- 文章链接测试2 -->
    <div class="trend_container" style="background-color: #fff;">
      <div class="img">
        <img :src="userInfo.avatarUrl" style="width: 50px;height: 50px;">
      </div>
      <div class="content">
        <div style="font-size: 18px;font-weight: bold;">{{userInfo.nickName}}</div>
        <div class="arc">
          <div>{{arc.title}}</div>
          <img :src="arc.imgUrl">
        </div>
        <div class="talk">
          <div  class="talk_time">{{time}}</div>
          <img src="/static/images/home/talk1.png">
        </div>
      </div>
    </div>

    <!-- 文章链接测试3 -->
    <div class="trend_container" style="background-color: #fff;">
      <div class="img">
        <img :src="userInfo.avatarUrl" style="width: 50px;height: 50px;">
      </div>
      <div class="content">
        <div style="font-size: 18px;font-weight: bold;">{{userInfo.nickName}}</div>
        <div class="arcCard">
          <img :src="arc.imgUrl">
          <div class="arc_text">
            <p class="p1">{{arc.title}}</p>
            <p class="p2">{{arc.general}}</p>
          </div>
        </div>
        <div class="talk">
          <div  class="talk_time">{{time}}</div>
          <img src="/static/images/home/talk1.png">
        </div>
      </div>
    </div>

    <!-- 文章链接测试4 -->
    <div class="trend_container" style="background-color: #fff;">
      <div class="img">
        <img :src="userInfo.avatarUrl" style="width: 50px;height: 50px;">
      </div>
      <div class="content">
        <div style="font-size: 18px;font-weight: bold;">{{userInfo.nickName}}</div>
        <div class="arcCard">
          <div style="position: relative;">
            <img :src="arc.imgUrl">
            <p class="p3" id="pt">{{arc.title}}</p>
          </div>
          <p class="p4">{{arc.general}}</p>
        </div>
        <div class="talk">
          <div  class="talk_time">{{time}}</div>
          <img src="/static/images/home/talk1.png">
        </div>
      </div>
    </div>

    


    <tx-video vid="e0354z3cqjp"></tx-video>
  
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
      // flag: false,
      arc: {
        imgUrl: '/static/images/home/sls.png',
        title: '寻家工作组志愿者精彩跟进该案例，及时和陈连发进行沟通',
        general: '万事起于疏忽，量变引起质变'
      },
      tabs: [
        '家寻宝贝', '宝贝寻家', '救助寻亲', '流浪乞讨', '实时寻人', '其他寻人'
      ],
      num: [
        '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'
      ],
      style: 'background: rgba(255, 255, 255, 0)',
      content: '2014年6月8日，经人介绍，约32岁的陈连发在宝贝回家寻子网站进行了寻亲登记，寻家工作组志愿者精彩跟进该案例，及时和陈连发进行沟通',
      time: '一天前',
      userInfo: {},
      imgArr: [
        'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/16/10/30/54fcef525fa8f6037d180f3c26f3be65.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/16/10/30/62e3ca3a02dddb002eff00482078d194.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/16/10/31/c7167fcfb4ebcd12621c05b0c852e98e.jpg'
      ],
      items: [
        {
          nickname: '宝贝回家',
          avatar: '/static/images/home/wx.png',
          badge: 'official',
          time: '1分钟前',
          type: 'text',
          textmsg: '【宝贝回家：傅德元（苏石友）】1990年出生，三岁被拐，长大后得知自己身世，于2018年6月来到了宝贝回家登记寻家。而他的父母早在2016年就在宝贝回家网站注册了寻子信息。在志愿者和警方及社会各界的共同努力下，今天又一个孩子回家了。自己再也不是寄人篱下的孩子，重拾亲情的温暖。愿这个家庭从此不再有阴霾，幸福快乐♪٩',
          pictures: [
            '/static/images/home/sls.png',
            '/static/images/home/sls.png'
          ]
        }, {
          nickname: '志愿者-阿正',
          avatar: '/static/images/home/wx.png',
          badge: 'volunteer',
          time: '一小时前',
          type: 'video',
          textmsg: '【宝贝回家：韩冬梅】1988年4岁的宝贝女儿韩冬梅不慎丢失，泪雨苦寻二十多年后无果。后来寻子父母到了宝贝回家寻子网登记，志愿者们了解情况并展开寻找。在迷茫与等待中，志愿者多次鼓励寻子夫妇要不忘初心、耐心守候。三十载的寻子茫茫路终于有了一个确切令人满意的结果。今天，韩冬梅回家了~愿他们一家人，爱与欢乐从此常在！',
          pictures: [
            '/static/images/home/sls.png',
            '/static/images/home/sls.png'
          ]
        }, {
          nickname: '志愿者-仙人球',
          avatar: '/static/images/home/wx.png',
          time: '一天前',
          badge: '',
          type: 'artcile',
          textmsg: '【宝贝回家：傅德元（苏石友）】1990年出生，三岁被拐，长大后得知自己身世，于2018年6月来到了宝贝回家登记寻家。而他的父母早在2016年就在宝贝回家网站注册了寻子信息。在志愿者和警方及社会各界的共同努力下，今天又一个孩子回家了。自己再也不是寄人篱下的孩子，重拾亲情的温暖。愿这个家庭从此不再有阴霾，幸福快乐♪٩(´ω`)و♪',
          pictures: [
            '/static/images/home/sls.png',
            '/static/images/home/sls.png'
          ]
        }
      ]
    }
  },
  onShareAppMessage: function () {
    return {
      title: '凝聚每一份爱的力量',
      path: '/pages/hr/main?from=forward',
      imageUrl: '/static/images/forward.png'
    }
  },
  onPageScroll (res) {
    this.style = 'background: rgba(255, 255, 255, ' + res.scrollTop / 150 + ')'
  },
  methods: {
    navTo () {
      wx.navigateTo({ url: '/pages/test_mc/successPage/main' })
    },
    previewImg: function (index, pic, e) {
      var imgArr = this.items[index].pictures
      this.flag = true
      wx.previewImage({
        current: pic, // 当前图片地址 imgArr[index]
        urls: imgArr, // 所有要预览的图片的地址集合 数组形式
        success: function (res) {}
      })
    },
    plus () {
      wx.navigateTo({url: '/pages/newbg/main'})
      // console.log('hello world')
    },
    clear () {
      wx.removeStorageSync('localPosts')
      console.log('success')
      wx.showToast({
        title: '清除缓存成功,请刷新页面',
        icon: 'none',
        duration: 1000
      })
    }
  },
  onLoad () {
    console.log(' trends page onload')
    this.userInfo = wx.getStorageSync('userInfo')
    // this.items = this.defaultitems
    console.log(this.userInfo)
  },
  onShow () {
    // var newpost = wx.getStorageSync('newpost')
    // if (this.flag) {
    //   this.flag = false
    //   return
    // }
    var localPosts = wx.getStorageSync('localPosts')
    if (localPosts) {
      console.log('get post imgs')
      console.log(localPosts)
      // this.items.push(newpost)
      if (localPosts.length > this.items.length - 3) {
        var newpost = localPosts[localPosts.length - 1]
        console.log('new post ', newpost)
        this.items.push(newpost)
      }
      console.log(this.items)
      // wx.removeStorageSync('newpost')
    }
  },
  async onPullDownRefresh () {
    wx.stopPullDownRefresh()
  }
}
</script>

<style scoped>
.trans{
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 180px;
  margin-top: 72px;
  background-color: rgba(255, 255, 255, 0);
}
.nickName{
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  bottom: 10px;
  right: 122px;
}
.avatar{
  z-index: 1;
  position: absolute;
  bottom: -40px;
  right: 20px;
  height: 94px;
  border: 1px solid rgba(0, 0, 0, .5);
  background-color: #fff;
}
.avatar image{
  width: 90px;
  height: 90px;
  margin: 2px;
  margin-bottom: 0px;
}
.bg{
  width: 100%;
  height: 180px;
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
.trend_container{
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
}
.img{
  width: 50px;
  height: 50px;
}
.content{
  /* padding: 0px 40px 10px 10px; */
  display: flex;
  flex-direction: column;
  padding-left: 8px;
}
.imgContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.imgContainer image{
  width: 80px;
  height: 80px;
  margin: 2px;
}
.talk{
  /* position: relative; */
  display: flex;
  flex-direction: row;
  padding-top: 5px;
}
.talk image{
  width: 20px;
  height: 20px;
  /* padding-top: 5px; */
  /* margin-right: 5px; */
  /* position: absolute; */
  /* top: 5px;
  right: 0; */
}
.talk_time{
  margin-right: 200px;
}
.more{
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #fff;
  background-color: #1296db;
  font-size: 35px;
  text-align: center;
  line-height: 45px;
}
.arc{
  padding: 5px;
  background-color: #e9e9e9;
  display: flex;
  flex-direction: row;
}
.arc img{
  height: 42px;
  width: 42px;
  margin-top: 3px;
}
.arc div{
  padding-left: 8px;
  flex: 1;
  width: 230px;
  height: 28px;
  text-overflow: ellipsis;
  white-space:pre-wrap;
}
.arcCard{
  margin: 5px;
  border-radius: 5px;
  background: rgb(232, 255, 255);
}
.arcCard img{
  width: 100%;
  height: 120px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
/* 文章链接页面2 */
.arc_text{
  padding: 0 10px;
}
.p1{
  color: #000;
  font-weight: bold;
  margin-bottom: 4px;
}
.p2{
  color: #8f8f8f;
}
.p3{
  padding: 0 10px;
  color: #000;
  font-weight: bold;
  position: absolute;
  bottom: 10px;
  left: 0;
}
.p4{
  color: #8f8f8f;
  padding: 5px 10px;
}
</style>
