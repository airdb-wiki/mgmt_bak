<template>
  <div class="page">
    <div class="page__hd">
      <div class="page__title">Picker</div>
      <div class="page__desc">选择器，这里使用小程序原生的picker。</div>
    </div>
    <div class="page__bd">
      <div class="weui-btn-area">
        <button type="default" class="weui-btn" @click="multiLinkagePicker">多级联动</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    multiLinkagePicker () {
      wx.navigateTo({
        url: '../uploader/main'
      })
    }
  }
}
</script>

<style>

</style>
