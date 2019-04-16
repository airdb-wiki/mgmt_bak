<template>
  <div class="page">
    <div class="weui-footer">
        <div class="weui-footer__links">
          <navigator url="/pages/test_mc/hzw_map/main" class="weui-footer__link">项目进度</navigator>
          <navigator url="/pages/hr/main" class="weui-footer__link" @click="show">加入我们</navigator>
        </div>
        <div class="weui-footer__text">Copyright © 2008-present airdb</div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped>
/* 作为展示用的样式 */
.weui-footer {
  padding: 20rpx 0 30rpx;
  margin-bottom: 100rpx;
}
</style>
