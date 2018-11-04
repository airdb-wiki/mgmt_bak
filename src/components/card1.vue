<template>
  <div>
    <scroll-view>
      <div v-for="(item, index) in items" :key="index">
        <!-- 点击item时收集 -->
        <form class="form" @submit="formSubmit_item" report-submit="true">
          <div class="weui-cell" :id="item.UUID" @click="a">
            <!-- 获取formid的按钮 -->
            <button class='btn-submit' formType="submit"></button>
            <div class="weui-cell__hd">
              <image :src="item.AvatarUrl" style="vertical-align: middle;width:114px; height: 116px;border-radius: 5px 0 0 5px;"></image>
            </div>
            <div class="weui-cell__bd" style="margin-left: 10px;">
              <div class="title">
                {{item.Title}}
              </div>
              <div class="info_1">
                <text v-if="item.Gender == 2">女</text>
                <text v-else>男</text>
                <text>{{item.Category}}</text>
                <!--
                <text>拐卖</text>
                <text>离家出走</text>
                -->
              </div>

              <!-- <navigator url="/pages/location/main?title=navigate" hover-class="navigator-hover">
                {{item.MissedAddress}}
              </navigator> -->

              <!-- 点击地址时收集 -->
              <form @submit="formSubmit_addr" report-submit :id="item.UUID">
                <div class="addr-wrapper">
                  <img src="/static/images/home/position.png" style="width: 20px;height: 20px;">
                  <div class="text-addr" @click.stop="" id="address_content">
                    <button class="btn-submit" formType="submit"></button>
                    {{item.MissedAddress}}
                  </div>
                </div>
              </form>
              <div style="display: flex; flex-direction: row;">
                <div>
                  <img src="/static/images/home/notice.png" style="width: 20px;height: 20px;">
                </div>
                <div style="line-height: 20px;margin-left: 3px;">2000</div>
              </div>

            </div>
          </div>
        </form>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: ['items'],
  data () {
    return {
      index: 0,
      formInfo: {
        openid: '',
        formid: '',
        status: 1
      }
    }
  },
  methods: {
    a (e) {
      wx.navigateTo({
        url: '../../pages/detail/main?id=' + e.currentTarget.id
      })
    },
    formSubmit_item (e) {
      console.log('item submit事件', e.mp.detail.formId)
      var ss = wx.getStorageSync('minaAuth')

      wx.request({
        url: wx.getStorageSync('requestUrl') + '/small/user/formid',
        method: 'POST',
        data: {
          openid: ss.openid,
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
    },
    formSubmit_addr (e) {
      console.log('addr submit事件', e.mp.detail.formId)
      console.log('address content is: ', e)
      wx.authorize({scope: 'scope.userLocation'})
      // 跳转到地图页面
      wx.navigateTo({
        url: '/pages/location/main?UUID=' + e.currentTarget.id
      })
    }
  }
}
</script>

<style scoped>
.address{
  margin-left: 5px;
}
.addr-wrapper{
  display: inline-flex;
  align-items: center;
}
.text-addr{
  z-index: 3;
  margin-left: 3px;
  text-decoration:underline;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
}
.title{
  width: 230px;
  font-weight: bold;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info_1 text{
  padding: 0px 10px;
  border-radius: 5px;
  background: #e2e2e2;
  margin-right: 4px;
  font-size: 14px;
}
.weui-cell{
  position: relative;
  padding: 0;
  margin: 11px 10px;
  border: none;
  line-height: 28px;
  border-radius: 5px;
  box-shadow: 0 0 5px #b1b1b1;
  background: #fff;
}
.btn-submit{
  z-index: 2;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}
</style>
