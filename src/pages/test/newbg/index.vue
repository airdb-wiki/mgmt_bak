<template>
   <div class="b-container">

    <div class="navigation">
      <div class="btn">
        <navigator open-type="navigateBack">
          <img src="/static/images/home/back.png" class="back">
        </navigator>
        <div style="border-left: 1px solid #e2e2e2;margin: 2px 10px 0 4px;height: 18px;"></div>
        <navigator open-type="reLaunch" url="/pages/home/main">
          <img src="/static/images/home/home.png" class="home">
        </navigator>
      </div>
      <div class="title">宝贝回家</div>
    </div>

    <div class="f-container">
    <textarea placeholder="分享动态..." maxlength=-1  v-model="content"></textarea>
    <div class="s-container">
        <template v-for="(imgPath,index) in tempFilePaths">
          <img :src="imgPath" mode="aspecFill" class="img" :key=index>
        </template>
        <div class="camera" @click="chooseimage" :style="{'display':hideAdd ? 'none':'flex'}">
            <img src="/static/images/camera.png" alt="" class="camera-image" >
            <div class="camera-text">照片/视频</div>
        </div>
    </div>
    <button :class="{null: isnull}" class="button" @click="onSubmit">发表</button>
  </div> 

  </div>
</template>

<script>
export default {
  onLoad: function () {
    var date = new Date().toString()
    console.log('onload ', date)
    this.content = ''
    this.hideAdd = 0
    this.tempFilePaths = []
    this.isnull = true
  },
  data () {
    return {
      tempFilePaths: [],
      content: '',
      hideAdd: 0,
      isnull: true
      // isnull: true
    }
  },
  watch: {
    content () {
      this.isnull = (this.content.length === 0)
    }
  },
  methods: {
    chooseimage: function () {
      var that = this
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          res.tempFilePaths.forEach(element => {
            that.tempFilePaths.push(element)
            that.isnull = false
            // console.log(that.tempFilePaths)
          })
          // that.tempFilePaths.push(res.tempFilePaths)
          if (that.tempFilePaths.length >= 9) {
            that.hideAdd = 1
          } else {
            that.hideAdd = 0
          }
        }
      })
    },
    onSubmit: function (e) {
      if (!this.isnull) {
        var content = this.content
        var post = {
          textmsg: content,
          pictures: this.tempFilePaths,
          time: 'just now',
          nickname: '志愿者-newbg',
          avatar: '/static/images/home/wx.png',
          type: '',
          badge: ''
        }
        // console.log(postImgs);
        var localPosts = wx.getStorageSync('localPosts')
        if (!localPosts) localPosts = []
        localPosts.push(post)
        console.log('get local', localPosts)
        wx.setStorageSync('localPosts', localPosts)
        // wx.setStorageSync('newpost', post)
        this.tempFilePaths = []
        this.content = ''
        this.hideAdd = 0
        this.isnull = 0
        console.log(post)
        wx.switchTab({
          url: '/pages/test_mc/trends/main'
        })
      } else {
        wx.showToast({
          title: '内容不能为空喔',
          icon: 'none',
          duration: 1000
        })
      }
    }
  }
}
// {
//   "pagePath": "pages/test_mc/trends/main",
//   "text": "动态",
//   "iconPath": "/static/images/music.png",
//   "selectedIconPath": "/static/images/music_active.png"
// },
</script>

<style scoped lang='less'>
  @import 'index';
</style>

