<template>
   <div class="f-container">
    <div class="textarea">
        <textarea placeholder="分享动态..." maxlength=-1></textarea>
        <template v-for="(imgPath,index) in tempFilePaths">
          <img :src="imgPath" mode="aspecFill" style="width:300rpx; height:300rpx" :key=index>
          </template>
        
    </div>
    <div class='s-container'>
        <div class="camera" @click="chooseimage">
            <img src="/static/images/home/camera.png" alt="" class="camera-image">
            <div class="camera-text">照片/视频</div>
        </div>
        <button class='btn'>发表</button>
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
.btn {
  width: 250rpx;
  height: 100rpx;
  background-color: rgb(200, 214, 8);
  margin-right: 0rpx;
}
</style>
 

