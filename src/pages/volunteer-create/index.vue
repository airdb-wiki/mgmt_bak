<template>
  <div class="content">
    <div class="box_41X1">
      <div class="input-part" style="margin-top: 80rpx;">
        <div class="input-title">手机：</div>
        <input type="number" class="input" v-model="mobile"/>
      </div>
      <div class="input-part">
        <div class="input-title">邮箱：</div>
        <input type="email" class="input" v-model="email"/>
      </div>
      <div class="input-part">
        <div class="input-title">收件地址：</div>
        <input type="text" class="input" v-model="address" />
      </div>
      <div class="input-part">
        <div class="input-title">推荐人：</div>
        <input type="text" class="input" v-model="referer"/>
      </div>
      <div class="input-part">
        <div class="input-title">归属城市：</div>
        <input type="text" class="input" v-model="city"/>
      </div>
    </div>
    <div class="btn" @click="save">保存</div>
  </div>
</template>
<script>
  export default {
    components: {

    },
    data () {
      return {
        mobile: 'xxx',
        email: 'xxxxx@qq.com',
        address: '北京市海淀区创业路',
        referer: '张三',
        city: '北京'
      }
    },
    methods: {
      save () {
        console.log('mobile--->', !this.mobile)
        if (!this.mobile) {
          wx.showToast({
            title: '请输入正确的手机号',
            icon: 'none'
          })
          return
        }
        if (!this.email) {
          wx.showToast({
            title: '请输入正确的邮箱',
            icon: 'none'
          })
          return
        }
        if (!this.address) {
          wx.showToast({
            title: '请输入正确的地址',
            icon: 'none'
          })
          return
        }
        if (!this.referer) {
          wx.showToast({
            title: '请输入正确的推荐人',
            icon: 'none'
          })
          return
        }
        if (!this.city) {
          wx.showToast({
            title: '请输入正确的城市',
            icon: 'none'
          })
          return
        }
        wx.request({
          url: process.env.BaseUrl + '/lastest/wechatapi/small/volunteer/add',
          method: 'POST',
          data: {
            openid: wx.getStorageSync('minaAuth').openid,
            phone: this.mobile,
            email: this.email,
            address: this.address,
            city: this.city,
            referee: this.referer
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log('res', res)
          },
          fail: function (ee) {
            console.log('ee', ee)
          }
        })
      }
    },
    onLoad: function () {

    },
    onShow: function () {

    }
  }
</script>
<style scoped lang="less">
  @import 'index';
</style>
