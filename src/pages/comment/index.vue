<template>
  <div class="page">
    <div class="page__hd">
      <div class="page__title">提供线索</div>
    </div>


    <div class="page__bd">
      
      <div class="weui-cells weui-cells_after-title">

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" placeholder="写下您的线索，请务必准确，尽量详细！" @input="contentInput"></textarea> 
          </div>
        </div>
      </div>

      <div class="weui-btn-area">
        <button class="weui-btn" type="primary" @click="addComment">提交</button>
      </div>

    </div>
  </div>
</template>

<script>
import vfooter from '@/pages/footer'

export default {
  components: {
    vfooter
  },
  data () {
    return {
      uuid: '',
      comment: {
        Nickname: '',
        AvatarUrl: '',
        Content: ''
      }
    }
  },
  onLoad: function (option) {
    // console.log('comment=====:', option.uuid)
    this.uuid = option.uuid
  },
  methods: {
    contentInput: function (e) {
      this.comment.Content = e.mp.detail.value
    },
    addComment () {
      let vm = this
      if (vm.comment.Content === '') {
        wx.showLoading({
          title: '留言不能为空！'
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        return
      }
      console.log('comments====', vm.comment.Content)
      wx.request({
        url: wx.getStorageSync('requestUrl') + '/small/comment',
        method: 'POST',
        data: {
          UUID: vm.uuid,
          AvatarUrl: wx.getStorageSync('userInfo').avatarUrl,
          Nickname: wx.getStorageSync('userInfo').nickName,
          Content: vm.comment.Content
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          vm.items = res.data
        }
      })
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000,
        mask: true,
        complete: function () {
          wx.navigateBack({
            url: '/pages/airticle/main'
          })
        }
      })
    }
  }
}
</script>


<style scoped>
.weui-textarea {
  padding: 30rpx 0;
}
</style>