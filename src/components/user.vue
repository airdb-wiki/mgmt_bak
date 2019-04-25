<template>
  <div class="user">
    <div class="user-avatar">
      <open-data type="userAvatarUrl" class="userinfo-avatar" mode="cover"></open-data>
    </div>

    <!-- user-avatar end -->
    <div class="user-cont">
      <open-data type="userNickName"></open-data>
      <div class="text-time">公益时长: 13.5 小时</div>
    </div>
    <!-- user-cont end -->
  </div>
</template>

<script>
export default {
  name: 'user',
  props: ['items']
}
</script>

<style>
  .user-cont {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 20rpx;
    font-size: 36rpx;
    color: #aaa;
  }
  .user-cont .text-name {
    margin-bottom: 10rpx;
    font-size: 32rpx;
    color: #fff;
  }
  .user-cont .text-time {
    margin-bottom: 10rpx;
    font-size: 28rpx;
    color: #fff;
  }
  .user {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #f35336;
    min-height: 230rpx;
  }
  .user-avatar {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
    overflow: hidden;
    background: #ccc;
  }
</style>
