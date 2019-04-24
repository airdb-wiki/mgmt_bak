<template>
  <div class="page">


    <!-- 列表信息 -->
    <div class="line"></div>

    <div v-for="(item, index) in stations" :key="index">
      <div>
        <div>{{item.province}} {{item.city}} </div>
          <div>{{item.name}} {{item.officephone}} </div>
        <div>{{item.address}} </div>
      </div>
    </div>


</div>
</template>

<script>
import getReliefStations from '@/api/store'

export default {
  components: {
  },
  data () {
    return {
      database: [],
      stations: mpvue.getStorageSync('reliefStations'),
      station: [{
        name: '东城区救助管理站',
        province: '北京市',
        city: '北京市',
        address: '北京市东城区永外桃园东里6号',
        officephone: '010-67160805'
      }]
    }
  },
  onload () {
    getReliefStations()
  },
  onShow () {
    var db = wx.getStorageSync('database')
    this.database = db
    console.log('database information:', db)
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '正在更新...'
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    getReliefStations()
  },
  create () {
    getReliefStations()
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
