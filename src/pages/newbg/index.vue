<template>
  <div class="f-container">
    <div class="textarea">
        <textarea placeholder="分享动态..." maxlength=-1></textarea>
    </div>
    <div class='s-container'>
        <div class="camera">
            <img src="/static/images/home/camera.png" alt="" class="camera-image">
            <div class="camera-text">照片/视频</div>
        </div>
        <button class='btn'>发表</button>
  </div>

</div>
  
    
</template>

 <style>
.f-container {
  width: 100%;
  height: 500px;
  /* border: solid 1px; */
  display: flex;
  flex-direction: column;
}
.s-container {
  display: flex;
  flex-direction: row;
}
.textarea {
  /* border: solid 1px; */
  width: 100%;
}

.camera {
  /* margin-top: 50px; */
  height: 250rpx;
  width: 250rpx;
  background-color: rgba(83, 77, 77, 0.068);
  margin-top: 0;
  /* border: solid 1px; */
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
 

