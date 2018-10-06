<template>
  <div class="page">
    <h3>这是其它页面</h3>
  </div>
</template>

<script>
export default {
  components: {
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '志愿者招募计划'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '志愿者招募计划',
      desc: '公益项目',
      path: '/pages/hr/main?from=forward'
    }
  }
}
</script>

<style>
</style>
