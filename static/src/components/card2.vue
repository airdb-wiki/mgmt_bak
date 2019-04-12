<template>
  <div class="page">
    <div v-for="(item, index) in items" :key="index" :summary=summary class="container">
      <form  @submit="formSubmit_item" report-submit="true">
        <textarea name="uuid" :value="item.UUID" hidden></textarea>
        <div :style="show[index] ? '' : 'max-height:237rpx;overflow: hidden;'">
          <!-- 卡片显示信息 -->
          <div class="head">
            <button formType="submit" class="btn-submit"></button>
            <img class="status" :hidden="!item.Status" src="/static/images/home/find.png">
            <div class="content">
              <div class="avatar"><img :src="item.AvatarUrl" @click.stop="previewImg(index)"></div>
              <div>
                <div class="se_container">
                  <div class="important" style="width: 320rpx;">{{item.Nickname}}</div>
                  <div class="important" style="margin-left: 80rpx;">{{item.Age}}岁</div>
                </div>
                <div class="se_container">
                  <span class="important">分类: &nbsp;   </span>{{item.Category}} &nbsp; &nbsp;  <span class="important">档案ID: </span>&nbsp; {{item.Babyid}}
                  <!-- <div>
                    {{item.Babyid}}
                  </div> -->
                </div>
                <div class="se_container">
                  <!-- <div class="important">失踪城市：</div>
                  <div>{{item.MissedCity}}</div> -->
                  <span class="important">失踪时间：</span>
                  <span>{{item.MissedAt}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 卡片隐藏信息 -->
          <div class="down-container">
            <div class="space-info">
              <div class="t_title">失踪地点：</div>
              <div>{{item.MissedAddress}}</div>
            </div>
            <div class="down-info">
              <!-- <span class="t_title">失踪时间：</span>
              <span>{{item.MissedAt}}</span> -->
            </div>
            <div class="down-info">
              <div class="t_title">失踪特征:</div>
              <p>{{item.Characters}}</p>
            </div>
          </div>
        </div>
        <!-- 卡片展开 -->
        <div class="more" @click="toggleDetail" :id="index">
          <img src="/static/images/home/down.png" :style="show[index] ? 'transform: rotate(180deg);' : ''">
        </div>
        <!-- 评论,浏览,点赞 -->
        <div class="other">
          <div class="t_container">
            <span class="icon"><img src="/static/images/home/notice.png"></span>
            <span class="num">{{item.Visit}}</span>
          </div>
          <div class="t_container">
            <span class="icon"><img src="/static/images/home/talk.png"></span>
            <span class="num">{{item.Comment}}</span>
          </div>
          <div class="t_container">
            <span class="icon"><img src="/static/images/home/shareNum.png"></span>
            <span class="num">{{item.Forward}}</span>
          </div>
        </div>
      </form> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'card2',
  props: ['items'],
  data () {
    return {
      show: null,
      icon: '/static/images/home/down.png'
    }
  },
  // 卡片状态数组初始化
  onLoad () {
    var length = this.items.length
    this.show = new Array(length)
    for (var i = 0; i < length; i++) {
      this.show[i] = false
    }
    console.log('card2 onload====================', typeof (this.items))
  },
  methods: {
    // 图片预览
    previewImg: function (index) {
      var imgArr = []
      imgArr[0] = this.items[index].AvatarUrl
      wx.previewImage({
        current: this.items[index].AvatarUrl, // 当前图片地址 imgArr[index]
        urls: imgArr, // 所有要预览的图片的地址集合 数组形式
        success: function (res) {}
      })
    },
    // 控制卡片展开状态,新数组替换实现重新渲染
    toggleDetail (e) {
      var index = e.currentTarget.id
      var arr = new Array(...this.show)
      arr[index] = !arr[index]
      this.show = arr
    },
    // 跳转到详情页面
    navToDetail (e) {
      console.log('navToDetail e++++=======================', e.currentTarget.id)
      wx.navigateTo({
        url: '../../pages/detail/main?id=' + e.currentTarget.id
      })
    },
    // 收集formId
    formSubmit_item (e) {
      console.log('item submit事件', e.mp.detail.formId)
      // var ss = wx.getStorageSync('minaAuth')
      // console.log('minaAuth=======', ss)
      var profile = wx.getStorageSync('profile')
      console.log('profile=======', profile)
      wx.request({
        url: wx.getStorageSync('domain') + '/lastest/wechatapi/small/user/formid',
        method: 'POST',
        data: {
          openid: profile.Openid,
          formid: e.mp.detail.formId,
          status: 1
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('collect formid success, info: ', res.data)
        }
      })
      console.log('navToDetail e+=======================', e)
      wx.navigateTo({
        url: '../../pages/detail/main?id=' + e.mp.detail.value.uuid
      })
    }
  }
}
</script>

<style scoped>
.page{
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container{
  border: 1px solid #a7a7a7;
  border-radius: 0.5em;
  margin-bottom: 10px;
  font-size: 14px;
  width: 94%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.container p{
  text-align: justify;
  margin-top: -28rpx;
  margin-left: -7rpx;
}
.head{
  width: 100%;
  margin: 0.5em;
  display: flex;
  position: relative;
  flex-direction: row;
}
.avatar img{
  width: 150rpx;
  height: 150rpx;
  margin-left: 10rpx;
  margin-right: 15rpx;
}
.content{
  flex: 1;
  display: flex;
  flex-direction: row;
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
}
.more{
  display: flex;
  flex-direction: row;
  justify-content:center;
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
  white-space:nowrap;
  font-weight: bold;
  margin-left: 20rpx;
}
.important{
  font-weight: bold;
}
.status{
  position: absolute;
  top: 5rpx;
  right: 10rpx;
  height: 140rpx;
  width: 210rpx;
  /* z-index: 999; */
  transform: rotate(-16deg);
}
.down-info{
  display: flex;
  flex-direction: row;
  
}
.down-container{
  margin-top: 8rpx;
}
.btn-submit{
  z-index: 666;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  background: #ffffff;
}
</style>


