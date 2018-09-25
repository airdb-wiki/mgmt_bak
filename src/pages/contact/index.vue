<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">填写错误, 请检查</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">联系人</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入姓名" @change="nameInput"/>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">联系电话</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入电话" @change="phoneInput"/>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">微信号</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入微信号" @change="wechatInput"/>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">联系地址</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输地址" @change="addressInput"/>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">其他信息</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入其他联系方式" @change="remarkInput" />
          </div>
        </div>
        

      </div>
      <div class="text-tipmsg">
        
      <p> 重要提示：</p>
      <p> 联系人信息为保密信息，未经许可，本平台不会泄露。 请用户注意保护隐私，不要在论坛跟贴回复联系方式。</p>
      
      </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      acticle: {},
      contact: {
        Name: '',
        Wechat: '',
        Phone: '',
        Mail: '',
        Address: '',
        Remark: ''
      },

      showTopTips: false,
      time: '09:01',
      date: '2015-09-01',
      countryCodes: ['+86', '+80', '+84', '+87'],
      countryCodesIndex: 0,
      countries: ['四川', '中国-香港', '中国-澳门', '中国-台湾'],
      countryIndex: 0,
      accounts: ['微信号', 'QQ', 'Email'],
      accountsIndex: 0,
      radioItems: [
        { name: 'cell standard', value: '0' },
        { name: 'cell standard', value: '1', checked: true }
      ],
      checkboxItems: [
        { name: 'standard is dealt for u.', value: '0', checked: true },
        { name: 'standard is dealicient for u.', value: '1', checked: false }
      ],

      isAgree: false
    }
  },
  methods: {
    nameInput: function (e) {
      this.contact.Name = e.mp.detail.value
    },
    wechatInput: function (e) {
      this.contact.Wechat = e.mp.detail.value
    },
    mailInput: function (e) {
      this.contact.Mail = e.mp.detail.value
    },
    phoneInput: function (e) {
      this.contact.Phone = e.mp.detail.value
    },
    addressInput: function (e) {
      this.contact.Address = e.mp.detail.value
    },
    remarkInput: function (e) {
      this.contact.Remak = e.mp.detail.value
    },
    showTopTipsFun () {
      this.showTopTips = true
      setTimeout(() => {
        this.showTopTips = false
      }, 2000)
    },
    preview () {
      console.log('json=: ', JSON.stringify(this.contact))
      wx.navigateTo({
        url: '../preview/main?data=' + JSON.stringify(this.article)
        // url: '../preview/main?data=' + JSON.stringify(this.contact)
      })
    },
    bindCountryChange (e) {
      this.countryIndex = e.mp.detail.value
    },
    bindAccountChange (e) {
      this.accountsIndex = e.mp.detail.value
    },
    bindCountryCodeChange (e) {
      this.countryCodesIndex = e.mp.detail.value
    },
    bindAgreeChange (e) {
      this.isAgree = !this.isAgree
    },
    chooseImage (e) {
      var _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log('成功上传：' + res.tempFilePaths)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.contact.imageFiles = _this.contact.imageFiles.concat(res.tempFilePaths)
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
        urls: this.contact.imageFiles // 需要预览的图片http链接列表
      })
    },
    submit () {
      console.log(this.contact)
      let vm = this
      wx.request({
        url: wx.getStorageSync('requestUrl') + '/small/contact',
        method: 'POST',
        data: {
          Name: this.contact.Name,
          Address: this.contact.Address,
          Mail: this.contact.Mail,
          Wechat: this.contact.Wechat,
          Phone: this.contact.Phone,
          Remark: this.contact.Remark
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          vm.items = res.data
          vm.preview()
        }
      })
    }
  }
}
</script>

<style scoped>
.text-tipmsg {
  margin: 30rpx 30rpx 10rpx;
  line-height: 1.4;
  font-size: 28rpx;
  color: #999;
}
</style>
