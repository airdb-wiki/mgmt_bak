<template>
   <div class="page__bd">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-article__h1">第一张为封面，照片务必清晰。</div>
              <div class="weui-uploader__bd">
                <div class="weui-uploader__files" id="uploaderFiles">
                  <block v-for="(item, index) in files" :key="index">
                    <div class="weui-uploader__file">
                      <image class="weui-uploader__img" :src="item" mode="aspectFill" @click="predivImage" :id="item" />
                      <div class="delete-icon" @click="deleteImg" :id="item"></div>
                    </div>
                  </block>
                </div>
                <div class="weui-uploader__input-box">
                  <div class="weui-uploader__input" @click="chooseImage"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="weui-btn-area">
        <button class="weui-btn" type="primary" @click="uploaderImage">一键上传</button>
      </div>
    </div>

</template>

<script>

import vbutton from '@/components/button'
export default {
  components: {
    vbutton
  },
  data () {
    return {
      files: []
    }
  },
  methods: {
    getFiles () {
      return this.files
    },
    chooseImage (e) {
      let _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log('成功上传：' + res.tempFilePaths)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths)
        },
        fail: function () {
          console.log('fail')
        },
        complete: function () {
          console.log('commplete')
        }
      })
    },
    predivImage (e) {
      console.log(e)
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    },
    deleteImg (e) {
      var arr = Array
      arr.prototype.indexOf = function (val) {
        for (let i = 0; i < this.length; i++) {
          if (this[i] === val) return i
        }
        return -1
      }
      arr.prototype.remove = function (val) {
        let index = this.indexOf(val)
        if (index > -1) {
          this.splice(index, 1)
        }
      }
      this.files.remove(e.currentTarget.id)
    },
    wecosUpload (signature, filePath, fileName) {
      var vm = this
      wx.showToast({
        title: '正在上传...',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
      console.log('wecosUpload===: ', filePath, fileName)
      wx.uploadFile({
        url: wx.getStorageSync('wecosUrl') + '/' + fileName,
        filePath: filePath,
        header: {
          'Authorization': signature
        },
        name: 'filecontent',
        formData: {
          op: 'upload'
        },
        success: function (uploadRes) {
          wx.showLoading({
            title: '图片上传成功'
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
          var data = uploadRes.data
          console.log('uploadRes data: ', data)
          var wecosObj = JSON.parse(data)
          console.log('uploadRes data: ', wecosObj.data)
          console.log('upload url====: ', wecosObj.data.access_url)
          console.log('upload url====: ', wecosObj.data.resource_path)
          console.log('upload url====: ', wecosObj.data.source_url)
          console.log('upload url====: ', wecosObj.data.url)
          console.log('upload url====: ', wecosObj.data.vid)
          // do something
          vm.updateImageInfo()
        },
        fail: function (e) {
          console.log('e', e)
          wx.showLoading({
            title: '图片上传失败'
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        },
        complete: function () {
        }
      })
    },
    uploaderImage (e) {
      var vm = this
      wx.request({
        url: wx.getStorageSync('wecosSignatureUrl'),
        success: function (cosRes) {
          // 签名
          var signature = cosRes.data
          console.log('signature====', signature)
          for (var i = 0, h = vm.files.length; i < h; i++) {
            console.log(vm.files[i])
            var filePath = vm.files[i]
            var fileName = filePath.match(/(wxfile:\/\/tmp_)(.+)/)
            if (wx.getStorageSync('loginInfo') === 'devtools') {
              fileName = filePath.match(/(http:\/\/tmp\/)(.+)/)
            }
            // var fileName = filePath.match(/(http:\/\/tmp\/)(.+)/)
            // var fileName = filePath.match(/(wxfile:\/\/tmp_)(.+)/)
            fileName = fileName[2]

            console.log('fileName: ', fileName)
            vm.wecosUpload(signature, filePath, fileName)
          }
        },
        fail: function (e) {
          console.log('e', e)
        }
      })
    },
    updateImageInfo () {
      wx.request({
        url: wx.getStorageSync('requestUrl') + '/qcloud/wecos/upload',
        method: 'POST',
        data: {
          openid: 'open_id test',
          unionid: 'union_id test',
          uuid: 'uuid test',
          url: 'xxxxxx url '
        },
        success: function (cosRes) {
          console.log('updateImageInfo: ', cosRes)
        },
        fail: function (e) {
          console.log('updateImageInfo e:', e)
        }
      })
    }
  }
}
</script>

<style>
.weui-uploader__file {
  position: relative;
}
.weui-uploader__bd {
  overflow: visible;
}
.delete-icon {
  position: absolute;
  width: 40rpx;
  height: 40rpx;
  background: #f43530;
  right: 0;
  top: -20rpx;
  border-radius: 40rpx;
  z-index: 5;
}
.delete-icon::before {
  content: '';
  width: 26rpx;
  height: 4rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}
.user-button {
  margin-top: 5px;
}
</style>
