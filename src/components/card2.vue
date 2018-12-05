<template>
  <div class="page">
    <div v-for="(item, index) in items" :key="index" class="container">
      <div :style="item.show ? '' : 'max-height: 210rpx;overflow: hidden;'"
      @click="navToDetail" :id="item.UUID">
      <div class="head">
        <img class="status" :hidden="!item.Status" src="/static/images/home/find.png">
        <div class="avatar"><img :src="item.AvatarUrl" @click.stop="previewImg(index)"></div>
        <div class="content">
          <div class="se_container">
            <div class="important" style="width: 320rpx;">{{item.Nickname}}</div>
            <div class="important" style="margin-left: 50rpx;">{{item.Age}}岁</div>
          </div>
          <div class="se_container">
            <div class="important">档案ID：</div>
            <div>
              {{item.Babyid}}
            </div>
          </div>
          <div class="se_container">
            <div class="important">距离您：</div>
            <div>100公里</div>
          </div>
        </div>
      </div>
      <div>
        <span class="t_title">失踪地点：</span>
        <span>{{item.MissedAddress}}</span>
      </div>
      <div>
        <span class="t_title">失踪时间：</span>
        <span>{{item.MissedAt}}</span>
      </div>
      <div class="t_title">失踪特征:</div>
      <p>{{item.Characters}}</p>
    </div>
    <div class="more" @click="toggleDetail" :id="index">
      <img src="/static/images/home/down.png" :style="item.show ? 'transform: rotate(180deg);' : ''">
    </div>
    <div class="other">
      <div class="t_container">
        <span class="icon"><img src="/static/images/home/notice.png"></span>
        <span class="num">15</span>
      </div>
      <div class="t_container">
        <span class="icon"><img src="/static/images/home/talk.png"></span>
        <span class="num">11</span>
      </div>
      <div class="t_container">
        <span class="icon"><img src="/static/images/home/shareNum.png"></span>
        <span class="num">22</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'card2',
  props: ['items'],
  data () {
    return {
      // show: [],
      icon: '/static/images/home/down.png'
    }
  },
  methods: {
    previewImg: function (index) {
      var imgArr = []
      imgArr[0] = this.items[index].AvatarUrl
      wx.previewImage({
        current: this.items[index].AvatarUrl, // 当前图片地址 imgArr[index]
        urls: imgArr, // 所有要预览的图片的地址集合 数组形式
        success: function (res) {}
      })
    },
    toggleDetail (e) {
      var index = e.currentTarget.id
      this.$emit('toggleDetail', index)
    },
    navToDetail (e) {
      wx.navigateTo({
        url: '../../pages/detail/main?id=' + e.currentTarget.id
      })
    }
  }
}
</script>

<style scoped>
.page{
  margin-top: 40rpx;
}
.container{
  margin: 1em;
  padding: 0;
  border: 1px solid #a7a7a7;
  border-radius: 0.5em;
  position: relative;
}
.container p{
  padding: 0 20px;
}
.head{
  margin: 0.5em;
  margin-left: 0px;
  display: flex;
  flex-direction: row;
}
.avatar{
  flex: 1;
  max-width: 6.5em;
  max-height: 6.5em;
  margin-right: 0.3em;
  vertical-align: top;
}
.avatar img{
  max-width: 6.5em;
  max-height: 6.5em;
}
.content{
  flex: 1;
  display: flex;
  flex-direction: column;
}
.se_container{
  flex: 1;
  display: flex;
  flex-direction: row;
}
.more{
  margin: auto;
  transition: ro
}
.more img{
  width: 2em;
  height: 2em;
}
.other{
  width: 100%;
  border-top: 1px dashed #a7a7a7;
  display: flex;
  flex-direction: row;
}
.t_container{
  flex: 1;
  text-align: center;
  padding: .5em;
}
.icon{
  width: 1.6em;
  height: 1.6em;
  display: inline-block;
  vertical-align: top;
}
.icon img{
  width: 1.6em;
  height: 1.6em;
  margin-right: .3em;
}
.num{
  display: inline-block;
}
.t_title{
  padding: 0 20px;
  font-weight: bold;
}
.important{
  font-weight: bold;
}
.status{
  position: absolute;
  top: 64rpx;
  right: 15rpx;
  height: 140rpx;
  width: 210rpx;
  transform: rotate(-16deg);
}
</style>


