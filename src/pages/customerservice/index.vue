<template>
  <div class="page">
      <div class="after-userifo">

        <!-- 广告 -->
        <ad unit-id="adunit-6a89174cc83e227f"></ad>

        <!-- <div style="text-align: center">
          如需帮助，可通过以下方式联系我们。
        </div> -->
        <div class="weui-info">
          <div class="weui-item" style="-webkit-user-select:text;margin-top:70rpx;">官方网站: <p class="weui-p" style='display: inline'>www.baobeihuijia.com</p></div>
          <div class="weui-item" style="-webkit-user-select:text">咨询信箱: <p class="weui-p" style='display: inline'>baobeihuijia@yeah.net</p></div>
          <div class="weui-item" style="-webkit-user-select:text">QQ接待群: <p class="weui-p" style='display: inline'>1840533</p></div>
          <!-- <div class="weui-item" style="-webkit-user-select:text" bindcontact="handleContact"><img class= "cust_service" src="/static/images/customer_service.png">在线客服 <p class="weui-p" style='display: inline'></p></div> -->
          <!-- <button open-type="contact" bindcontact="handleContact" class="weui-item">在线客服</button> -->
          <button class="weui-item" style="-webkit-user-select:text" open-type="contact"
          bindcontact="handleContact"><img class= "cust_service" src="/static/images/customer_service.png">
          在线客服 <p class="weui-p" style='display: inline'></p></button>
          <div class="weui-item">
            <p style="margin-left:80rpx">站务电话</p> <br>
            <div class="weui-phone" @click="tel">
              <img src="/static/images/phone.png" class="phone_img" alt="">
              0435-3338090</div>
          </div>
        </div>
      </div>
      <!-- weui-cells end -->

      <!-- <button open-type="contact" bindcontact="handleContact" class="btn">在线客服</button> -->

    <!-- profile-page-main end -->
    <!-- 右下角加号新建 -->
    <!-- <button open-type="contact" session-from="weixin-baobeihuijia">
      <img src="/static/images/CustomerService.png" class="btn-post">
    </button> -->



    <vfooter></vfooter>


  </div>
</template>

<script>
  import vfooter from '@/pages/footer'
  import navigation from '@/components/navigation'
  export default {
    components: {
      vfooter,
      navigation
    },
    data () {
      return {
        isActive: 0,
        servicetime: 10,
        minaAuth: wx.getStorageSync('minaAuth'),
        isVolunteer: false,
        userInfo: wx.getStorageSync('userInfo'),
        setting: wx.getStorageSync('setting')
      }
    },
    onLoad: function () {
    },
    onShareAppMessage: function () {
      return {
        title: '公益项目',
        path: '/pages/profile/main?from=forward',
        imageUrl: '/static/images/home/vr.png'
      }
    },
    async onPullDownRefresh () {
      wx.stopPullDownRefresh()
    },
    methods: {
      onPostClick () {
        wx.navigateTo({
          url: '/pages/publish/main'
        })
      },
      tel: function () {
        wx.makePhoneCall({
          phoneNumber: '0435-3338090'
        })
      },
      naviTo: function () {
        wx.navigateTo({
          url: '/pages/list/main'
        })
      }
    },
    created () {
    }
  }
</script>


<style scoped lang='less'>
  @import 'index';
</style>
