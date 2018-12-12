<template>
  <div class="page">
    <div v-for="(item, index) in items" :key="index" class="container">
      <div :style="item.show ? '' : 'max-height:237rpx;overflow: hidden;'"
      @click="navToDetail" :id="item.UUID">
        <div class="head">
          <img class="status" :hidden="!item.Status" src="/static/images/home/find.png">
          <!-- <div class="avatar"><img :src="item.AvatarUrl" @click.stop="previewImg(index)"></div> -->
          <div class="content">
            <div class="avatar"><img :src="item.AvatarUrl" @click.stop="previewImg(index)"></div>
            <div>
              <div class="se_container">
                <div class="important" style="width: 320rpx;">{{item.Nickname}}</div>
                <div class="important" style="margin-left: 37rpx;">{{item.Age}}岁</div>
              </div>
              <div class="se_container">
                <div class="important">档案ID：</div>
                <div>
                  {{item.Babyid}}
                </div>
              </div>
              <div class="se_container">
                <div class="important">失踪城市：</div>
                <div>{{item.MissedCity}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div>
          <span class="t_title">失踪地点：</span>
          <span>{{item.MissedAddress}}</span>
        </div> -->
        

        <div class="down-container">
          <div class="space-info">
            <div class="t_title">失踪地点：</div>
            <div>{{item.MissedAddress}}</div>
          </div>
          <div class="down-info">
            <span class="t_title">失踪时间：</span>
            <span>{{item.MissedAt}}</span>
          </div>
          <div class="down-info">
            <div class="t_title">失踪特征:</div>
            <p>{{item.Characters}}</p>
          </div>
        </div>
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
  /* margin: 1em; */
  /* padding: 0; */
  border: 1px solid #a7a7a7;
  border-radius: 0.5em;
  position: relative;
  margin-bottom: 10px;
  font-size: 14px;
}
.container p{
  /* padding: 0 20px; */
  text-align: justify;
  margin-top: -28rpx;
  margin-left: -7rpx;
  /* border: 1px solid; */
}
.head{
  width: 100%;
  margin: 0.5em;
  /* margin-right: 20rpx; */
  display: flex;
  flex-direction: row;
}
.avatar{
  /* flex: 1; */
  /* max-width: 6.5em;
  max-height: 6.5em; */
 
  margin-right: 0;
  /* vertical-align: top; */
}
.avatar img{
  /* max-width: 6.5em;
  max-height: 6.5em; */
  width: 150rpx;
  height: 150rpx;
  margin-left: 10rpx;
  margin-right: 15rpx;
}
.content{
  flex: 1;
  display: flex;
  flex-direction: row;
  /* border:1px solid; */
}
.space-info{
    flex: 1;
    display: flex;
    flex-direction: row;
}
.se_container{
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-top: 8rpx;
  /* flex-wrap: nowrap; */
  /* border:1px solid; */
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
  /* padding: 0 40rpx; */
  /* word-wrap: break-word; 
  word-break: break-all; */
  white-space:nowrap;
  font-weight: bold;
  margin-left: 20rpx;
}
.important{
  font-weight: bold;
  /* margin-left: 10rpx; */
  /* flex-wrap: nowrap; */
  /* word-wrap: break-word;  */
  /* word-break: break-all; */
}
.status{
  position: absolute;
  top: 64rpx;
  right: 15rpx;
  height: 140rpx;
  width: 210rpx;
  transform: rotate(-16deg);
}
.down-info{
  display: flex;
  flex-direction: row;
  /* align-items: flex-start; */
  /* border: 1px solid; */
  
}
.down-container{
  /* border: 1px solid; */
  margin-top: 8rpx;
}
</style>


