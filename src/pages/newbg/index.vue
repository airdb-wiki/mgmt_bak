<template>
   <div class="f-container">

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
      <div v-if="!showTitle" class="title">详情</div>
      <div v-else class="title">宝贝回家</div>
    </div>

    <div class="textarea">
        <textarea placeholder="分享动态..." maxlength=-1 v-model="content"></textarea>
        <template v-for="(imgPath,index) in tempFilePaths">
          <img :src="imgPath" mode="aspecFill" style="width:300rpx; height:300rpx;" :key="index">
        </template>
    </div>
    <div class='s-container'>
        <div class="camera" @click="chooseimage">
            <img src="/static/images/home/camera.png" alt="" class="camera-image">
            <div class="camera-text">照片/视频</div>
        </div>
        <button class='button' @click="onSubmit">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  onLoad: function () {},
  data () {
    return {
      tempFilePaths: []
    }
  },
  methods: {
    chooseimage: function () {
      var that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.tempFilePaths.push(res.tempFilePaths)
        }
      })
    },
    onSubmit: function (e) {
      var that = this
      // wx.showLoading({
      //   title: '上传中'
      // })
      // console.log(that.tempFilePaths)
      var content = this.content
      // console.log("event",e)
      // console.log("content: ",content)
      var postImgs = []
      that.tempFilePaths.forEach(element => {
        postImgs.push(element[0])
      })
      var post = {
        textmsg: content,
        pictures: postImgs,
        time: 'just now',
        nickname: '志愿者-newbg',
        avatar: '/static/images/home/wx.png',
        type: '',
        badge: ''
      }
      // console.log(postImgs);
      wx.setStorageSync('newpost', post)
      this.tempFilePaths = []
      this.content = ''
      console.log(post)
      wx.switchTab({
        url: '/pages/test_mc/trends/main'
      })
      // wx.navigateTo({url: '/pages/home/main'})
      // '/pages/test_mc/trends/main'
    }
  }
}
</script>
 <style>
.f-container {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
}
.s-container {
  display: flex;
  flex-direction: row;
}
.textarea {
  width: 100%;
  margin-top: 70px;
}
.camera {
  height: 250rpx;
  width: 250rpx;
  background-color: rgba(83, 77, 77, 0.068);
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.camera-text {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: rgba(102, 102, 102, 0.315);
}
.camera-image {
  height: 80rpx;
  width: 80rpx;
}
.button {
  width: 250rpx;
  height: 100rpx;
  background-color: rgb(200, 214, 8);
  margin-right: 0rpx;
}
.navigation {
  width: 100%;
  padding-top: 21pt;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  z-index: 9999;
  display: flex;
  flex-direction: row;
}
.title {
  width: 50%;
  margin-left: 3pt;
  text-align: center;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30pt;
  font-size: 18px;
}
.btn {
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3pt 0pt 5pt 4pt;
  margin-left: 6pt;
  width: 56pt;
  height: 15pt;
}
.back {
  width: 20pt;
  height: 20pt;
}
.home {
  width: 17pt;
  height: 17pt;
}
</style>
 

