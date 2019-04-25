<template>
  <div class="page">

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
