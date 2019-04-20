<template>
  <div class="bh-profile-page">
    <!-- 自定义navigation -->
    <navigation></navigation>
    <div class="profile-page-main">
      <div class="userinfo">
        <div v-if="authSetting.userInfo" class="userinfo-avatar" @click="openSetting">
          <image class="img" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
        </div>
        <div v-else class="userinfo-avatar" @click="openSetting">
          <image class="img" src="/static/images/user_active.png" background-size="cover" />
        </div>
        <div v-if="authSetting.userInfo">
          <div class="userinfo-cont">
            <div class="text-name">{{ userInfo.nickName }}</div>
            <div class="text-time" @click="ClickServiceTime">公益时长: {{servicetime}}小时 ></div>
          </div>
        </div>
        <div v-else>
          <button class="weui-btn" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">微信快速登录</button>
        </div>
        <div class="userinfo-volunt" @click="ClickJoinVolunteer" v-if="!isVolunteer"><i class="icon-dot"></i>加入志愿者</i></div>
        <div class="userinfo-privilege" @click="ClickMyPrivilege" v-else>我的特权></div>
      </div>
      <!-- userinfo end -->
      
      <div class="after-userifo">
        <div class="weui-cell title">
          <div class="weui-label">登记信息</div>
        </div>
        <div class="weui-grids">
          <div class="weui-grid" v-for="(item, index) in items" :key="index">
            <navigator :url="item.url">
              <div class='weui-grid__bg'>
                <div class="weui-grid__icon">
                    <image :src="item.src"/>
                </div>
                <text class="weui-grid__label">{{item.name}}</text>
              </div>
            </navigator>
          </div>
        </div>
      </div>
      <!-- after-userifo end -->

      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-label">我的保存</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-label">我的发布</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-label">我的关注</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
      <!-- weui-cells end -->

    </div>
    <!-- profile-page-main end -->

    <!-- 右下角加号新建 -->
    <img src="/static/images/addition_fill.png" class="btn-post" @click="onPostClick"/>
    <div class="profile-page-footer">
      <vfooter></vfooter>
    </div>
    
  </div>
</template>

<script>
import vfooter from '@/pages/footer'
import navigation from '@/components/navigation'
export default {
  components: {
    vfooter,
    navigation
  },
  data () {
    return {
      servicetime: 10,
      isVolunteer: false,
      userInfo: wx.getStorageSync('userInfo'),
      authSetting: {
        userInfo: wx.getStorageSync('authSetting.userInfo')
      },
      items: [{
        name: '家寻宝贝',
        src: '/static/images/mini-logo/1.png',
        url: '/pages/publish/main'
      }, {
        name: '宝贝寻家',
        src: '/static/images/mini-logo/2.png',
        url: '/pages/publish/main'
      }, {
        name: '救助寻亲',
        src: '/static/images/mini-logo/3.png',
        url: '/pages/publish/main'
      }, {
        name: '流浪乞讨',
        src: '/static/images/mini-logo/4.png',
        url: '/pages/publish/main'
      }, {
        name: '即时寻人',
        src: '/static/images/mini-logo/5.png',
        url: '/pages/publish/main'
      }, {
        name: '其他寻人',
        src: '/static/images/mini-logo/6.png',
        url: '/pages/publish/main'
      }]
    }
  },
  onLoad: function () {
    console.log('===test_mc onLoad======:')
    console.log('test_mc====onLoad() authSetting.userInfo =', this.authSetting.userInfo)
    console.log('test_mc====onLoad() userInfo =', this.userInfo)
  },
  onShareAppMessage: function () {
    return {
      title: '公益项目',
      path: '/pages/profile/main?from=forward',
      imageUrl: '/static/images/home/vr.png'
    }
  },
  methods: {
    onPostClick () {
      wx.navigateTo({
        url: '/pages/publish/main'
      })
    },
    openSetting () {
      var that = this
      wx.openSetting({
        success: (res) => {
          wx.setStorageSync('authSetting.userInfo', res.authSetting['scope.userInfo'])
          that.authSetting.userInfo = wx.getStorageSync('authSetting.userInfo')
          console.log('test_mc===openSetting() authSetting.userInfo =', that.authSetting.userInfo)
        }
      })
    },
    getUserInfo: function (e) {
      wx.setStorageSync('authSetting.userInfo', true)
      this.authSetting.userInfo = wx.getStorageSync('authSetting.userInfo')
      wx.setStorageSync('userInfo', e.mp.detail.userInfo)
      this.userInfo = wx.getStorageSync('userInfo')
      if (!e.mp.detail.userInfo) {
        wx.setStorageSync('authSetting.userInfo', false)
        this.authSetting.userInfo = wx.getStorageSync('authSetting.userInfo')
        wx.setStorageSync('userInfo', e.mp.detail.userInfo)
        this.userInfo = e.mp.detail.userInfo
      }
      console.log('test_mc===getUserInfo() userinfo =', e.mp.detail.userInfo)
      console.log('test_mc===getUserInfo() authSetting.userInfo =', this.authSetting.userInfo)
    },
    // 点击志愿时长
    ClickServiceTime: function () {
      wx.navigateTo({
        url: '/pages/test_mc/serviceTime/main'
      })
    },
    ClickJoinVolunteer: function () {
      wx.navigateTo({
        url: '/pages/volunteer/main'
      })
    },
    ClickMyPrivilege: function () {
      wx.navigateTo({
        url: '/pages/test_mc/myPrivilege/main'
      })
    }
  },
  created () {
  }
}
</script>


<style scoped lang='less'>
  @import 'index';
</style>