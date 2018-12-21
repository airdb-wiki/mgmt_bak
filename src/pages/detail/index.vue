<template>
  <div style="background-color: #fff;">
    <!-- 自定义navigation -->
    <!-- <div class="navigation">
      <button :plain="true" @click="back">
        <img src="/static/images/home/back.png" class="back">
        <div style="border: 1px solid #e2e2e2;margin: 0 10px 0 4px;"></div>
        <img src="/static/images/home/home.png" class="home">
      </button>
    </div> -->
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

        <div v-if="!showTitle" class="title">详情</div>
        <div v-else class="title">{{item.MissedCity}}-{{item.Nickname}}</div>
      </div>
    <!-- navigation -->

    <scroll-view>
      <detail :item="item"></detail>
    </scroll-view>
    <!-- 内容 -->

    <ad unit-id="adunit-6a89174cc83e227f"></ad>
    <!-- 广告 -->

    <div style="background-color: #f2f2f2;padding-top: 10px;">
      <div class="weui-cells__title" style="font-size: 18px;">评论：</div>
      <div class="talk_container">
        <div class="together" v-for="(item, index) in comment" :key="index">
          <div class="img">
            <img :src="item.avatarUrl" style="width: 35px;height: 35px;border-radius: 3px;">
          </div>
          <div class="talk_content">
            <div class="talker_info">
              <div class="talker_name">{{item.Nickname}}</div>
              <img src="/static/images/home/like.png" style="width: 20px;height: 20px;">
            </div>
            <div class="talk">{{item.content}}</div>
            <div v-if="item.reply !== ''">
              <div class="talker_info" style="margin-top: 5px;">
                <div style="border-left: 3px solid #16b015;padding: 0 5px;color: #929292;">作者</div>
                <img src="/static/images/home/like.png" style="width: 20px;height: 20px;">
              </div>
              <div class="talk">{{item.reply}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论区 -->

    <div class="footer">
      <form @submit="sub">
        <div class="container">
          <input type="text" confirm-type="send" name="pl" v-model="comment_value" placeholder="说点什么吧" placeholder-style="color: #e2e2e2;"/>
          <button :plain='true' form-type="submit">
            <div class="form_btn">
              <img src="/static/images/home/talk.png">
              <div>评论</div>
            </div>
          </button>
          <button open-type='share' :plain='true'>
            <div class="form_btn">
              <img src="/static/images/home/wx.png">
              <div>分享</div>
            </div>
          </button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import detail from '@/components/detail'
import { formatTime } from '@/utils/index'

export default{
  components: {
    detail
  },
  // 发送给好友
  onShareAppMessage (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log('====', ops.target)
    }
    var vm = this
    return {
      title: '约1986年出生1990年与小朋友离家玩耍时走失疑时广西桂林人的秦干寻亲',
      path: '/pages/detail/main',
      success: function (res) {
        // 从缓存中获取信息
        var items = wx.getStorageSync('database')
        // console.log('options info: ', options.id)
        console.log('items=========', items)
        for (var i = 0; i < items.length; i++) {
          if (vm.item.UUID === items[i].UUID) {
            items[i].Forward += 1
          }
        }
        wx.setStorageSync('database', items)
        var data = {
          babyid: vm.item.Babyid,
          column: 'Forward'
        }
        this.$get('/lastest/wechatapi/small/article/updateCount', data).then((res) => {
          console.log('forward_res:', res)
        })
        // 转发成功
        console.log('转发成功:' + JSON.stringify(res))
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败:' + JSON.stringify(res))
      },
      complete: function (res) {
        console.log('complete: ' + JSON.stringify(res))
      }
    }
  },
  data () {
    return {
      canvasHidden: false,
      showTitle: false,
      item: {},
      comment: [],
      comment_value: '',
      content: '早日回家'
    }
  },
  onPageScroll (res) {
    if (res.scrollTop > 30) {
      this.showTitle = true
    } else {
      if (res.scrollTop < 30) {
        this.showTitle = false
      }
    }
  },
  onLoad (options) {
    var vm = this
    // 从缓存中获取信息
    var items = wx.getStorageSync('database')
    console.log('options info: ', options.id)
    console.log('items=========', items)
    for (var i = 0; i < items.length; i++) {
      if (options.id === items[i].UUID) {
        vm.item = items[i]
        items[i].Visit += 1
      }
    }
    wx.setStorageSync('database', items)
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    })
    var data = {
      babyid: vm.item.Babyid,
      column: 'visit'
    }
    this.$get('/lastest/wechatapi/small/article/summary', data).then((res) => {
      console.log('visit_res:', res)
    })
    this.requestComment()
    // 从数据库获取评论信息
  },
  async onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  methods: {
    requestComment () {
      var vm = this
      this.$get(`/lastest/wechatapi/small/comment/${vm.item.UUID}`, '').then((res) => {
        vm.comment = res.data
        for (var i = 0; i < vm.comment.length; i++) {
          vm.comment[i].CreatedAt = formatTime(new Date(vm.comment[i].CreatedAt))
          vm.comment[i].reply = ''
        }
        console.log('获取评论为：', vm.comment)
      })
    },
    sub (e) {
      var that = this
      if (e.mp.detail.value.pl === '') {
        wx.showToast({
          icon: 'none',
          title: '留言不能为空！'
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        return
      }
      // 检验评论的合法性

      var comment = {}
      comment.content = e.mp.detail.value.pl
      comment.avatarUrl = wx.getStorageSync('userInfo').avatarUrl
      comment.talker_name = wx.getStorageSync('userInfo').nickName
      comment.reply = ''
      that.comment = that.comment.concat([comment])
      console.log('评论为：', that.comment)
      // 更新数据
      var data = {
        UUID: that.item.UUID,
        AvatarUrl: wx.getStorageSync('userInfo').avatarUrl,
        Nickname: wx.getStorageSync('userInfo').nickName,
        Content: comment.content
      }
      this.$post('/lastest/wechatapi/small/comment', data).then((res) => {
        that.comment_value = ''
        console.log('提交回调函数', res)
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 2000
        })
      }).catch(err => {
        console.log('onsubmit error==========================', err)
      })
      // 将评论上传至数据库
    },
    download () {
      var that = this
      that.canvasHidden = false
      const ctx = wx.createCanvasContext('myCanvas')
      // 填充背景色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, 260, 960)

      ctx.setFontSize(20)
      ctx.setFillStyle('#393939')
      ctx.fillText('文字在这里！！！', 20, 5, 800)
      ctx.setTextAlign('center')

      ctx.font = 'italic bold 20px cursive'
      const metrics = ctx.measureText('Hello World')
      console.log(metrics.width)

      ctx.drawImage('/static/images/mina/8.jpg', 20, 5, 120, 60)

      wx.showLoading({
        title: '分享图片生成中...',
        mask: true
      })

      ctx.draw(true, function () {
        console.log('draw callback success')
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 780,
          height: 800,
          destWidth: 780,
          destHeight: 800,
          canvasId: 'myCanvas',
          fileType: 'png',
          success: function (res) {
            wx.hideLoading()
            wx.previewImage({
              urls: [res.tempFilePath]
            })
          }
        })
      })
      setTimeout(function () {
        wx.drawCanvas({
          canvasId: 'myCanvas',
          actions: [],
          reserve: false
        })
      }, 1000)
    },
    back () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style scoped>
.navigation{
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
.title{
  width: 50%;
  margin-left: 3pt;
  text-align: center;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30pt;
  font-size: 18px;
}
.btn{
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3pt 0pt 5pt 4pt;
  margin-left: 6pt;
  width: 56pt;
  height: 15pt;
}
.back{
  width: 20pt;
  height: 20pt;
}
.home{
  width: 17pt;
  height: 17pt;
}
.footer{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
.container{
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 3px 6px;
}
.container input{
  border: 1px solid #e2e2e2;
  padding: 0 8px;
  border-radius: 20px;
  flex: 6;
  height: 35px;
}
.container button{
  border: none;
  flex: 1;
}
.form_btn{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form_btn img{
  width: 23px;
  height: 23px;
}
.form_btn div{
  font-size: 12px;
}
.img{
  float: left;
  width: 45px;
  height: 45px;
  margin-top: 5px;
}
.talk_container{
  padding: 5px 10px 100px;
  background-color: #f2f2f2;
}
.together{
  padding: 5px;
  padding-bottom: 13px;
}
.talk_content{
  display: flex;
  flex-direction: column;
  padding-left: 8px;
}
.talker_info{
  position: relative;
  display: flex;
  flex-direction: row;
  line-height: 24px;
}
.talker_name{
  font-size: 16px;
  color: #929292;
}
.talker_info image{
  position: absolute;
  top: 4px;
  right: 25px;
}
.talk{
  width: 280px;
  word-wrap:break-word
}
.divLine{
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.left{
  width: 80px;
  height: 2px;
  background-color: aqua;
  padding: 0 8px;
}
.center{
  margin: 0 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: aqua;
}
.right{
  width: 80px;
  height: 2px;
  background-color: aqua;
  padding: 0 8px;
}
</style>