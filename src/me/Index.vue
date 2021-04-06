/* eslint-disable vue/no-shared-component-data */
<template>
    <view class="page_me">
        <img class="bg" :src="bgImg"/>
        <view class="baseinfo1">
            <!-- <image class="head" src="{{headUrl}}"/> -->
            <wx-open-data class="head" type="userAvatarUrl"></wx-open-data>
            <view class="name">
                <wx-open-data type="userNickName"></wx-open-data>
            </view>
        </view>

        <view class="info">
            <view class="info-item">
                <wx-image class="item-icon" :src="followImg"/>
                <view class="info-title">我跟踪的</view>
                <img class="right-icon" :src="narrowImg"/>
            </view>
            <view class="info-item">
                <img class="item-icon" :src="historyImg"/>
                <view class="info-title">浏览记录</view>
                <img class="right-icon" :src="narrowImg"/>
            </view>

            <view class="info-item" @click.stop="hello">
                <img class="item-icon" :src="historyImg"/>
                <view class="info-title">联系我们</view>
                <img class="right-icon" :src="narrowImg"/>
            </view>

            <view class="info-item" @click.stop="setting">
                <img class="item-icon" :src="historyImg"/>
                <view class="info-title" >设置</view>
                <img class="right-icon" :src="narrowImg"/>
            </view>
        </view>
        <!-- <confirm-auth isShow='false'/> -->

       <KButtonArea>
         <!-- 暂时不开启 show-message-card 功能 -->
         <KButton type="primary" open-type="contact" :show-message-card=false>联系我们</KButton>
       </KButtonArea>

        <view class="adContainer">
          <wx-ad unit-id="adunit-6a89174cc83e227f" ad-intervals="30"></wx-ad>
        </view>
    </view>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
// import ConfirmAuth from '../components/confir-auth'
export default Vue.extend({

  data() {
    return {
      bgImg: 'https://wechat-1251018873.file.myqcloud.com/images/bg.png',
      followImg: 'https://wechat-1251018873.file.myqcloud.com/images/me/follow.png',
      narrowImg: 'https://wechat-1251018873.file.myqcloud.com/images/narrow.png',
      historyImg: 'https://wechat-1251018873.file.myqcloud.com/images/me/history.png',
      headUrl: '',
      nickName: '',
      id: 'hello',
      url: 'https://mp.weixin.qq.com/s/11FU2onYf_8Mjj-uJkrJiQ',
      isAuthShow: 'show'
    }
  },

  props: {
    cndurl: {
      type: String,
      required: true,
      default: 'https://static.baobeihuijia.com',
    }
  },

  events: {
    getUserInfo(userInfo) {
      const headUrl = userInfo.avatarUrl
      const nickName = userInfo.nickName
      this.headUrl = headUrl
      this.nickName = nickName
      this.isAuthShow = 'hidden'
      // this.$apply()
    }
  },

  methods: {
    setting() {
      console.log('xx')
      wx.openSetting()
    },
    jumpToDetail() {
      // let url = 'https://mp.weixin.qq.com/s/11FU2onYf_8Mjj-uJkrJiQ'
      console.log('xxxx')
      // window.location.href = url
    },
    hello() {
      console.log('xxxaa')
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success() {
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                wx.startRecord()
              }
            })
          }
        }
      })
    }
  }

})
</script>
<style lang="less">
    .page_me {
        .bg {
            width: 100%;
            position: absolute;
            z-index: 1;
            height: 352rpx;
            top: 0;
        }
        .baseinfo1 {
            width: 94%;
            height: 240rpx;
            margin: 40px auto 23px;
            background: #FFFFFF;
            box-shadow: 0 2px 10px 4px rgba(239,68,49,0.12);
            border-radius: 10px;
            position: relative;
            z-index: 2;
        }
        .head {
            display: block;
            margin: 21px auto 0;
            padding-top: 21px;
            width: 164rpx;
            height: 164rpx;
            border-radius: 82px;
        }
        .name {
            display: block;
            margin-top: 14px;
            width: 100%;
            text-align: center;
            font-family: PingFangSC-Medium;
            font-size: 32rpx;
            color: #4A4A4A;
            letter-spacing: 0;
            line-height: 32rpx;
        }
        .info {
            margin-bottom: 24px;
            width: 100%;
            border-top: .5px solid #DCDEDF;
            background: white;
        }
        .info-item {
            width: 100%;
            display: flex;
            align-items: center;
            height: 82rpx;
            position: relative;
            border-bottom: .5px solid #DCDEDF;
        }
        .item-icon {
            position: absolute;
            width: 36rpx;
            left: 34rpx;
            height: 32rpx;
        }
        .info-title {
            position: absolute;
            left: 54px;
            font-family: PingFangSC-Regular;
            font-size: 32rpx;
            color: #4A4A4A;
            letter-spacing: 0;
        }
        .right-icon {
            position: absolute;
            width: 24rpx;
            height: 30rpx;
            top: 34rpx;
            right: 32rpx;
        }
    }

    /* 外层组件的宽度可设置成100%或具体数值 */
    .adContainer {
      width: 100%;
    }

</style>
