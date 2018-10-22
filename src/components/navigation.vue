<template>
  <div class="navigation">
    <div v-if="search === false">{{deContent}}</div>
    <div v-else>
      <div style="display: flex;flex-direction: row;">
        <div style="line-height: 38px;margin-left: -20px;">{{yourcity}}</div>
        <div class="arrow"></div>
      </div>
      <label  class="weui-search-bar__label" @click="focus" id="search">
        <icon class="weui-icon-search" type="search" size="14"></icon>
        <div class="weui-search-bar__text">搜索</div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  props: {
    search: Boolean,
    yourcity: String
  },
  data () {
    return {
      deContent: '宝贝回家',
      position: ''
    }
  },
  methods: {
    focus () {
      wx.navigateTo({ url: '/pages/search/main' })
    }
  },
  onLoad () {
  }
}
</script>

<style scoped>
.navigation{
  position: fixed;
  width: 100%;
  height: 21pt;
  padding: 18pt 0 14pt 20pt;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: row;
}
#search{
  margin-top: 20pt;
  border: 1px solid #e2e2e2;
  width: 50%;
  line-height: 21pt;
  height: 21pt;
  border-radius: 20px;
  margin-left: 69px;
}
.arrow {
  width: 8px;
  height: 8px;
  border:#666 solid;
  border-width: 1px 1px 0 0;
  transform: rotate(135deg);
  margin: 10pt 0 0 6pt;
}
</style>


