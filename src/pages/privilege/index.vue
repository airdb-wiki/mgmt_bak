<template>
  <div class="page">

      <div class="user">
        <div v-if="authSetting.userInfo" class="user-avatar">
          <image class="img" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
        </div>

        <!-- user-avatar end -->
        <div class="user-cont">
          <div class="text-name">专属特权</div>
          <div class="text-time">{{privilege}}/13</div>
        </div>
        <!-- user-cont end -->
      </div>
      <!-- user end -->

      <div class="after-user">
        <div class="weui-grids">
          <div class="weui-grid" v-for="(item, index) in items" :key="index">
            <navigator :url="item.url">
              <image :src="item.src" class="weui-grid__icon"/>
              <text class="weui-grid__label">{{item.name}}</text>
            </navigator>
          </div>
        </div>
        <!-- grids end -->
      </div>
      <!-- after-user end -->


    <vfooter></vfooter>
  </div>
</template>

<script>
import vfooter from '@/pages/footer'
export default{
  components: {
    vfooter
  },

  data () {
    return {
      title: '成长指标',
      showTitle: false,
      userInfo: wx.getStorageSync('userInfo'),
      authSetting: {
        userInfo: wx.getStorageSync('authSetting.userInfo')
      },
      privilege: 3,
      items: [{
        name: '精美礼品',
        src: '/static/images/profile/gift.png'
      }, {
        name: '公仔一个',
        src: '/static/images/profile/doll.png'
      }, {
        name: '衣服一件',
        src: '/static/images/profile/clothes.png'
      }, {
        name: '未解锁',
        src: '/static/images/profile/locked.png'
      }, {
        name: '未解锁',
        src: '/static/images/profile/locked.png'
      }, {
        name: '未解锁',
        src: '/static/images/profile/locked.png'
      }, {
        name: '未解锁',
        src: '/static/images/profile/locked.png'
      }, {
        name: '未解锁',
        src: '/static/images/profile/locked.png'
      }, {
        name: '未解锁',
        src: '/static/images/profile/locked.png'
      }]
    }
  },
  // data end

  methods: {
  },
  // methods end

  onPageScroll (res) {
    if (res.scrollTop > 40) {
      this.showTitle = true
    } else {
      if (res.scrollTop < 40) {
        this.showTitle = false
      }
    }
  },

  onShareAppMessage: function () {
    return {
      title: '您的公益时长为10小时',
      desc: '公益项目',
      path: '/pages/test_mc/myPrivilege/main?from=forward'
    }
  }
}
</script>

<style scoped lang='less'>
  @import 'index';
</style>

