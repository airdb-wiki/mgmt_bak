<template>
  <div class="page bh-publish-page">
    <div class="page__hd">
      <div class="page__title">图片上传(1/3)</div>
    </div>
    <uploader  ref="imgUploader"></uploader>


    <div class="page__hd">
      <div class="page__title">失踪信息(2/3)</div>
    </div>
    <div class="page__bd">
      <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">填写错误, 请检查</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">消息标题</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入标题" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">档案编号</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="新失踪录入可忽略" />
          </div>
        </div>



        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">姓名</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入姓名"  @input ="NicknameInput"/>
          </div>
        </div>
 


        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">性别</div>
          </div>

          <div class="weui-cell__bd">
            <radio-group class="sex-radio-group" @change="radioChange">
              <label class="weui-cell weui-check__label" v-for="item in radioItems" :key="index">
                <radio class="weui-check" :value="item.value" :checked="item.checked" />
                <div class="weui-cell__ft weui-cell__ft_in-radio" v-if="item.checked">
                  <icon class="weui-icon-checkbox_success" type="success" size="23"></icon>
                </div>
                <div class="weui-cell__ft weui-cell__ft_in-radio" v-else>
                  <icon class="weui-icon-checkbox_circle" type="circle" size="23"></icon>
                </div>
                <div class="weui-cell__bd">{{item.name}}</div>
              </label>
            </radio-group>
          </div>
       
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">出生日期</div>
          </div>
          <div class="weui-cell__bd">
            <picker mode="date" :value="birthday" start="1900-01-01" :end="currentDate" @change="bindBirthdayChange">
              <div class="weui-input">{{birthday}}</div>
            </picker>
          </div>
        </div>

       <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">丢失时间</div>
          </div>
          <div class="weui-cell__bd">
            <div class="lost-picker-wrap">
              <picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
                <div class="weui-input">{{date}}</div>
              </picker>
              <picker mode="time" :value="lostTime" start="00:00:00" end="23:59:00" @change="bindLostTimeChange">
                <div class="weui-input">{{lostTime}}</div>
              </picker>   
            </div>
          </div>
        </div>
        <div class="weui-cell weui-cell_select">
          <div class="weui-cell__hd weui-cell__hd_in-select-after">
            <div class="weui-label">失踪地区</div>
          </div>
          <div class="weui-cell__bd">
            <picker class="weui-btn" mode="region" :value="region" @change="bindCityChange">
              <div class="weui-select weui-select_in-select-after">{{region[0]}}, {{region[1]}}, {{region[2]}}
              </div>
            </picker>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">具体地址</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入地址" @input="AddressInput"/>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__bd">
            <input name="title" class="weui-input" placeholder="特征描述" @input="CharactersInput"/>
            <div class="weui-textarea-counter">0/120</div>
          </div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea name="content" class="" placeholder="发布详情" style="height: 4.0em" @input ="DetailsInput" />
            <div class="weui-textarea-counter">0/2000</div>
          </div>
        </div>

      </div>

      <div class="page__hd">
        <div class="page__title">联系人(3/3)</div>
      </div>

      <contact></contact>
      </div>

      <div class="weui-btn-area">
        <button class="weui-btn" type="primary" @click="submit">预览</button>
      </div>
    </div>
  </div>
</template>

<script>
import uploader from '@/pages/uploader'
import contact from '@/pages/contact'
export default {
  components: {
    uploader,
    contact
  },
  data () {
    return {
      article: {
        uuid: 'default-uuid',
        nickName: 'nickname',
        gender: 0,
        country: '中国',
        province: '广东',
        city: '深圳',
        address: 'address',
        title: 'xxx',
        characters: 'default',
        details: 'detail',
        birthedAt: '2000-03-03',
        missedAt: '2008-03-03 00:00:00'
      },
      genders: ['未知', '男', '女'],
      genderIndex: 0,
      showTopTips: false,
      time: '09:01',
      date: '2015-09-01',
      lostTime: '00:00',
      region: ['广东省', '深圳市', '南山区'],
      cityIndex: 0,
      accounts: ['微信号', 'QQ', 'Email'],
      accountsIndex: 0,
      radioItems: [
        { name: '男', value: '1' },
        { name: '女', value: '2' }
      ],

      isAgree: false,
      birthday: '',
      currentDate: ''
    }
  },
  created () {
    let _hours = (Array(2).join('0') + new Date().getHours()).slice(-2)
    let _minus = (Array(2).join('0') + new Date().getMinutes()).slice(-2)
    let _secs = (Array(2).join('0') + new Date().getSeconds()).slice(-2)
    let _curdate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    this.lostTime = _hours + ':' + _minus + ':' + _secs
    this.date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    this.currentDate = _curdate
    this.birthday = _curdate
  },
  onLoad () {
    console.log('pulibsh ====== onload')
  },
  methods: {
    NicknameInput: function (e) {
      this.article.nickName = e.mp.detail.value
    },
    CharactersInput: function (e) {
      this.article.characters = e.mp.detail.value
    },
    DetailsInput: function (e) {
      this.article.details = e.mp.detail.value
    },
    AddressInput: function (e) {
      this.article.address = e.mp.detail.value
    },
    contentInput: function (e) {
      this.article.content = e.mp.detail.value
    },
    ageInput: function (e) {
      this.article.Age = parseInt(e.mp.detail.value)
    },
    showTopTipsFun () {
      this.showTopTips = true
      setTimeout(() => {
        this.showTopTips = false
      }, 2000)
    },
    preview () {
      console.log('json=: ', JSON.stringify(this.article))
      var files = this.$refs.imgUploader.getFiles()
      console.log('image files: ', files)
      /*
      if (this.article.Nickname === '' || this.article.Address === '' || this.article.Characters === '' || this.article.Details === '') {
        wx.showLoading({
          title: '信息不能为空'
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        return
      }
      */
      wx.navigateTo({
        url: '/pages/preview/main?data=' + JSON.stringify(this.article) + '&files=' + files
      })
    },
    bindProvinceChange (e) {
      this.provinceIndex = e.mp.detail.value
      console.log('change index===', this.provinceIndex)
    },
    bindCityChange (e) {
      this.region = e.mp.detail.value
      console.log('change city index===', e.mp.detail.value)
    },
    bindAccountChange (e) {
      this.accountsIndex = e.mp.detail.value
    },
    bindCountryCodeChange (e) {
      this.countryCodesIndex = e.mp.detail.value
    },
    bindGenderCodeChange (e) {
      this.gendersIndex = e.mp.detail.value
    },
    bindAgreeChange (e) {
      this.isAgree = !this.isAgree
    },
    bindBirthdayChange (e) {
      this.article.birthedAt = e.mp.detail.value
    },
    checkboxChange (e) {
      console.log('radio发生change事件，携带value值为：' + e.mp.detail.value)
      var checkboxItems = this.checkboxItems
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = checkboxItems[i].value === e.mp.detail.value
      }
      this.checkboxItems = checkboxItems
      this.article.Gender = e.mp.detail.value
    },
    radioChange (e) {
      let radioItems = this.radioItems
      for (let i = 0; i < radioItems.length; ++i) {
        radioItems[i].checked = radioItems[i].value === e.mp.detail.value
      }
      this.radioItems = radioItems
      this.article.gender = parseInt(e.mp.detail.value)
      console.log('raidoChange===', this.article.gender)
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
          _this.article.imageFiles = _this.article.imageFiles.concat(res.tempFilePaths)
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
        urls: this.article.imageFiles // 需要预览的图片http链接列表
      })
    },
    submit () {
      console.log(this.article)
      let vm = this
      vm.preview()
    }
  }
}
</script>

<style scoped>
.sex-radio-group {
  display: flex;
  flex-direction: row;
  align-items: center;

}
.sex-radio-group  .weui-check__label {

  padding-left: 0;
  padding-right: 60rpx;
}
.sex-radio-group  .weui-cell__ft_in-radio {
  padding-left: 0;
}
.sex-radio-group icon {
  margin-left: 0;
}
.weui-btn-area {
  padding-bottom: 80rpx;
}
.lost-picker-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.lost-picker-wrap picker {
  margin-right: 40rpx;
}
</style>
