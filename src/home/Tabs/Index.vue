<template>
  <KView class="self_tabs">
    <KView class="tab_header">
      <KView
        v-for="item in tabList"
        :key="item.key"
        @click.stop="tabChang(item.key)"
        :class="item.key === activeKey?'item_active':'item'"
      >
      {{item.label}}
      <img
      class='icon' v-if="item.icon || item.activeIcon"
      :src="item.key === activeKey?item.activeIcon:item.icon"
      style="height:30rpx;width:30rpx"/>
      </KView>
    </KView>

    <KView class="connect"  @click.stop="handleClick">
      <img class="img" src="https://wechat-1251018873.file.myqcloud.com/images/phone.png" />
      <KView class="text" @click.stop="getPhoneNum">0435-3338090</KView>
    </KView>

    <KView class="content">
      <ListContent :list="actclieList" />
    </KView>
  </KView>
</template>

<script>
import Vue from 'vue'
import ListContent from '../../components/ListContent.vue'
import { getArticles } from '../../api/commont'

export default Vue.extend({
  name: 'Tabs',
  data() {
    return {
      tabList: [
        { label: '家寻', key: 'newest', icon: 'http://static.gocoder.top/unfold.png', activeIcon: 'http://static.gocoder.top/unfold_active.png' },
        { label: '寻家', key: 'column' },
        { label: '其他', key: 'pay' }
      ],
      activeKey: 'newest',
      actclieList: [],
      currentPage: 1 // default currentPage is 1
    }
  },
  components: {
    ListContent
  },
  methods: {
    tabChang(activeKey) {
      this.activeKey = activeKey
      this.$emit('onChange', activeKey)
    },
    handleClick() {
      console.log('handleClick')
    },
    getPhoneNum() {
      console.log('getPhoneNum')
      wx.makePhoneCall({
        phoneNumber: '0435-3338090'
      })
    }
  },
  created() {
    getArticles(this.currentPage).then((res) => {
      // console.log(res)
      this.actclieList = res.data.articles
    })

    // reach bottom envet 上拉触底查看历史
    window.addEventListener('reachbottom', (evt) => {
      console.log('reach_bottom', evt)
      this.currentPage += 1

      console.log('pageIndex--->', this.currentPage)
      getArticles(this.currentPage).then((res) => {
        console.log('append_xx')
        this.actclieList = this.actclieList.concat(res.data.articles)
      })
    })

    // pull down refresh 上拉更新数据
    window.addEventListener('pulldownrefresh', (evt1) => {
      console.log('pull_down', evt1)
    })
  }
})
</script>
<style lang="less">
.self_tabs {
  display: flex;
  flex-direction: column;
  .tab_header {
    display: flex;
    align-items: center;
    height: 88rpx;
    align-items: center;
    color: #999;
    border-bottom: 1rpx solid #f6f5f8;
    box-sizing: border-box;
    background: #fff;
    justify-content:space-around;
    .item {
      font-size: 32rpx;
      text-align: center;
      width: 120rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
      position:relative;
      height: 100%;
      box-sizing: border-box;
      .icon{
        margin-left:8rpx;
      }
    };
    .item_active {
     .item;
      color: #59bf74;
      border-bottom:4rpx solid #59BF74;

    };
  };
  .content {
    flex: 1;
  }

    .connect {
        position: fixed;
        z-index: 160;
        width: 160px;
        height: 28px;
        right: 10px;
        top: 48%;
        border-top-left-radius: 28px;
        border-bottom-left-radius: 28px;
        background: red;
        .img {
            position: absolute;
            left: 8px;
            top: 4px;
            width: 20px;
            height: 20px;
        }
        .text {
            line-height: 28px;
            position: absolute;
            top: 0;
            left: 40px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #FFFFFF;
            letter-spacing: 0;
        }
    }
}
</style>
