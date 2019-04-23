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
    <!-- navigation -->

    <scroll-view>
      <detail :item="item"></detail>
    </scroll-view>
    <!-- 内容 -->

    <ad unit-id="adunit-6a89174cc83e227f"></ad>
    <!-- 广告 -->

    <!-- <div style="background-color: #f2f2f2;padding-top: 10px;">
      <div class="weui-cells__title" style="font-size: 18px;">评论：</div>
      <scroll-view :scroll-y="true" class="talk_container">
        <div class="together" v-for="(item, index) in comment" :key="index">

          <div class="img">
            <img :src="item.AvatarUrl" style="width: 35px;height: 35px;border-radius: 3px;">
          </div>

          <div class="talk_content">

            <div class="talker_info">
              <div class="talker_name">{{item.Nickname}}</div>
              <img src="/static/images/home/like.png" style="width: 20px;height: 20px;">
            </div>

            <div class="talk">{{item.Content}}</div>

            <div v-if="item.reply !== ''">
              <div class="talker_info" style="margin-top: 5px;">
                <div style="border-left: 3px solid #16b015;padding: 0 5px;color: #929292;">作者</div>
                <img src="/static/images/home/like.png" style="width: 20px;height: 20px;">
              </div>
              <div class="talk">{{item.reply}}</div>
            </div>

          </div>

        </div>
      </scroll-view>
    </div> -->
    <div style="background-color: #f2f2f2;padding-top: 10px;">
      <div class="weui-cells__title" style="font-size: 18px;">评论：</div>
      <div class="talk_container">
        <div class="together" v-for="(item, index) in comment" :key="index">
          <div class="img">
            <img :src="item.AvatarUrl" style="width: 35px;height: 35px;border-radius: 3px;">
          </div>
          <div class="talk_content">
            <div class="talker_info">
              <div class="talker_name">{{item.Nickname}}</div>
              <img src="/static/images/home/like.png" style="width: 20px;height: 20px;">
            </div>
            <div class="talk">{{item.Content}}</div>
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
    <!-- 评论区 -->

    <div class="footer">
      <form @submit="sub" report-submit='true'>
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
        }).catch((err) => {
          console.log('fordward_error!!!!!!!!!!!!!!!!!!!!', err)
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
      imgUrls: [],
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

    // 更新visit count
    var data = {
      babyid: vm.item.Babyid,
      column: 'Visit'
    }
    this.$get('/lastest/wechatapi/small/article/updateCount', data).then((res) => {
      console.log('visit_res:', res)
    }).catch(err => {
      console.log('visit count update error!!!!!!!!!!!!!!!!!!!!!!', err)
    })

    // 获取关联图片
    var data2 = {
      babyid: vm.item.Babyid,
      uuid: vm.item.UUID
    }
    this.$get('/lastest/wechatapi/small/image/getList', data2).then((res) => {
      console.log('关联图片', res.data)
      // vm.Urls = res.data.
    })

    // 从数据库获取评论信息
    this.requestComment()
  },
  async onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  methods: {
    requestComment () {
      var vm = this
      vm.$get(`/lastest/wechatapi/small/comment/${vm.item.UUID}`)
        .then((res) => {
          vm.comment = res.data
          for (var i = 0; i < vm.comment.length; i++) {
            vm.comment[i].CreatedAt = formatTime(new Date(vm.comment[i].CreatedAt))
            vm.comment[i].reply = ''
          }
          console.log('获取评论为：', vm.comment)
        })
    },
    // 请求评论数据
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
      // var formId = e.mp.detail.formId
      // console.log('formid=============', formId)
      var comment = {}
      comment.Content = e.mp.detail.value.pl
      comment.AvatarUrl = wx.getStorageSync('userInfo').avatarUrl || '/static/images/user.png'
      comment.Nickname = wx.getStorageSync('userInfo').nickName || '游客'
      comment.reply = ''
      // that.commemt = [comment].concat(that.comment)
      var comments = new Array(comment)
      comments = comments.concat(that.comment)
      that.comment = comments
      console.log('评论为：', that.comment)
      console.log('new comment_tmp=================', comment)
      // 更新数据

      wx.request({
        url: process.env.BaseUrl + '/lastest/wechatapi/small/comment',
        method: 'POST',
        data: {
          // FormId: formId,
          UUID: that.item.UUID,
          AvatarUrl: comment.AvatarUrl,
          Nickname: comment.Nickname,
          Content: comment.Content
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.comment_value = ''
          console.log('提交回调函数')
          wx.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function () {
          console.log('上传失败')
        }
      })
      // 将评论上传至数据库
    },
    getList (options) {
      var item = {}
      var items = wx.getStorageSync('database')
      for (var i = 0; i < items.length; i++) {
        if (options.id === items[i].UUID) {
          item = items[i]
        }
      }
      var data = {
        babyid: item.Babyid,
        uuid: item.UUID
      }
      this.$get('/lastest/wechatapi/small/image/getList', data).then((res) => {
        console.log('关联图片', res.data)
      })
    },
    //  获取关联图片
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

<style scoped lang='less'>
  @import 'index';
</style></style>
