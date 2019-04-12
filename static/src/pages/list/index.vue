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

<style scoped>
.page{
  position: relative;
  width: 340px;
  height: 100%;
}
.bg{
  z-index: -1;
  position: absolute;
  top: 100px;
  left: 110px;
  width: 460px;
  height: 460px;
  transform: rotate(-20deg);
  opacity: .2;
}
.navigation {
  width: 100%;
  padding-top: 21pt;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  z-index: 9999;
  display: flex;
  flex-direction: row;
}
.title {
  width: 50%;
  margin-left: 3pt;
  text-align: center;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30pt;
  font-size: 18px;
  font-weight: bold;
}
.btn {
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3pt 0pt 5pt 4pt;
  margin-left: 6pt;
  width: 56pt;
  height: 15pt;
}
.back {
  width: 20pt;
  height: 20pt;
}
.home {
  width: 17pt;
  height: 17pt;
}
.navbar{
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3px 5px;
  margin-left: 10px;
  width: 25px;
  height: 25px;
}
.myh{
  margin: 0px;
  position: relative;
}
.myh div{
  text-align: center;
  font-weight: bold;
  letter-spacing: 4px;
  line-height: 49px;
  z-index: 9999;
  height: 52px;
}
.myh img{
  position: absolute;
  top: -4px;
  left: 123px;
  z-index: -1;
  width: 60px;
  height: 60px;
  opacity: .7;
}
.line {
  border-bottom: 1px solid;
  height:1px;
  width:750rpx;
  border-color: rgba(173, 158, 158, 0.452);
  margin-top: 70px;
}
.list_box {
  width: 100%;
}
.list_item {
  width: 750rpx;
  height: 50px;
  display: flex;
  flex-direction: row;
  /* border-top: 1px solid; */
  border-bottom: 0.5px solid;
  border-right: 1px solid;
  border-color: rgba(173, 158, 158, 0.452);
}

.list_left {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
}

.list_right {
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  font-weight: 400;
  color: rgba(29, 27, 27, 0.986);
  overflow:hidden;
}

.list_img {
  width: 30px;
  height: 30px;
  border: 1px solid;
  border-color: rgba(129, 123, 123, 0.26);
  border-radius: 50%;
  margin-left: 10px;
}
</style>
