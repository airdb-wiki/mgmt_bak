<template>
  <div class="page">

    <vuser></vuser>
    <!-- user end -->

    <div class="text-name">九宫格</div>

    <div class="after-user">
      <div class="weui-grids">
        <div class="weui-grid" v-for="(item, index) in function_cells" :key="index">
          <navigator :url="item.page">
            <image :src="item.src" class="weui-grid__icon"/>
            <text class="weui-grid__label">{{item.name}}</text>
          </navigator>
        </div>
      </div>
      <!-- grids end -->
    </div>
    <!-- after-user end -->

    <div class="text-name">专属福利</div>
    <div class="text-time">{{privilege}}/13</div>
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
import vuser from '@/components/user'
import vfooter from '@/pages/footer'

export default{
  components: {
    vuser,
    vfooter
  },

  data () {
    return {
      title: '成长指标',
      showTitle: false,
      userInfo: wx.getStorageSync('userInfo'),
      setting: wx.getStorageSync('setting'),
      privilege: 3,
      function_cells: [{
        name: '救助站',
        src: '/static/images/profile/gift.png',
        page: '/pages/reliefstation/main'
      }, {
        name: '志愿者',
        src: '/static/images/profile/doll.png',
        page: '/pages/volunteer/main'
      }, {
        name: '未开放',
        src: '/static/images/profile/locked.png'
      }, {
        name: '未开放',
        src: '/static/images/profile/locked.png'
      }, {
        name: '未开放',
        src: '/static/images/profile/locked.png'
      }, {
        name: '未开放',
        src: '/static/images/profile/locked.png'
      }, {
        name: '未开放',
        src: '/static/images/profile/locked.png'
      }, {
        name: '未开放',
        src: '/static/images/profile/locked.png'
      }, {
        name: '未开放',
        src: '/static/images/profile/locked.png'
      }],
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
    openUrl (page) {
      console.log('-----', page)
      if (page === 'setting') {
        mpvue.openSetting({})
        return
      }
      wx.navigateTo({
        url: page + '?wxid='
      })
    }
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

