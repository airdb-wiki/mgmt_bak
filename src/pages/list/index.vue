<template>
  <div class="page">
    <!-- 自定义导航栏 -->
    <div class="navigation">
      <div class="btn">
        <navigator open-type="navigateBack">
          <img src="/static/images/home/back.png" class="back">
        </navigator>

        <div style="border-left: 1px solid #e2e2e2;margin: 2px 10px 0 4px;height: 18px;"></div>

        <navigator open-type="reLaunch" url="/pages/home/main">
          <img src="/static/images/home/home.png" class="home">
        </navigator>
      </div>
      <div class="title">宝贝回家</div>
    </div>
    <!-- 列表信息 -->
    <div class="line"></div>
    <div class="list_box" v-for="(item, index) in database" :key="index" :summary=summary @click="navToDetail" :id="item.UUID">
        <div class='list_item'>
          <div class='list_left'>
            <img :src="item.AvatarUrl" alt="" class='list_img'>
          </div>
          <div class='list_right'>{{item.Title}}</div>
        </div>
    </div>
    
</div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      database: []
    }
  },
  onShow () {
    var db = wx.getStorageSync('database')
    this.database = db
    console.log('database information:', db)
  },
  methods: {
    navToDetail (e) {
      console.log('navToDetail e+=======================', e)
      wx.navigateTo({
        url: '../../pages/detail/main?id=' + e.mp.currentTarget.id
      })
    }
  }
}
</script>

<style scoped lang='less'>
  @import 'index';
</style>
