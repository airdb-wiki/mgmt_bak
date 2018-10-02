<template>
  <div>
  	<detail></detail>
    <!-- 底部分享，评论栏 -->
    <div>
      <button @click="shareToFriends" open-type='share' :apply="true">分享给好友</button>
      <button @click="download">生成海报</button>
    </div>
  </div>
</template>

<script>
import detail from '@/components/detail'

export default{
  components: {
    detail
  },
  onShareAppMessage () {
    return {
      title: '标题',
      path: '/pages/detail'
    }
  }
}
</script>

<style>
</style>