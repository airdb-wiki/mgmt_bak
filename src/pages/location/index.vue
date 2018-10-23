<template>
  <div class="page">
    <div class="navigation">
      <div class="btn">
        <navigator open-type="navigateBack" style="padding: 0;margin: 0;">
          <img src="/static/images/home/back.png" class="back">
        </navigator>

        <div style="border-left: 1px solid #e2e2e2;margin: 2px 10px 0 4px;height: 18px;"></div>

        <navigator open-type="reLaunch" url="/pages/home/main" style="padding: 0;margin: 0;">
          <img src="/static/images/home/home.png" class="home">
        </navigator>
      </div>
    </div>

    <div class="page__bd" style="margin-top: 60px;">
        <div class="weui-article">
            
            <div class="weui-article__h1">
              <form @submit="formSubmit_collect" report-submit="true">
                <button formType="submit" hover-class="none" class='invisibleclass'>
                  收集 formid
                </button>
              </form>
            </div>

            <div class="weui-article__section">
                <div class="weui-article__section">
                    <div class="weui-article__h3">这是地图页面</div>
                </div>
            </div>
        </div>
    </div>
    <ha></ha>
</div>
</template>

<script>
export default {
  components: {
  },
  onShareAppMessage: function () {
    return {
      title: '志愿者招募计划',
      path: '/pages/hr/main?from=forward',
      imageUrl: '/static/images/home/vr.png'
    }
  },
  methods: {
    formSubmit_collect (e) {
      console.log('form发生了submit事件', e.mp.detail.formId)
    }
  }
}
</script>

<style scoped>
.navigation{
  width: 100%;
  padding: 26px 0 16px 5px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 999;
}
.btn{
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3px 4px 3px 9px;
  margin-left: 6px;
  width: 72px;
  height: 24px;
}
.back{
  width: 24px;
  height: 24px;
}
.home{
  width: 23px;
  height: 23px;
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
</style>
