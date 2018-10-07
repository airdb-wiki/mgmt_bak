<template>
  <div class="navigation">
    <div v-if="search === false">{{deContent}}</div>
    <label v-else class="weui-search-bar__label" @click="focus" id="search">
      <icon class="weui-icon-search" type="search" size="14"></icon>
      <div class="weui-search-bar__text">搜索</div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  props: {
    search: Boolean
  },
  data () {
    return {
      deContent: '宝贝回家'
    }
  },
  methods: {
    focus () {
      wx.navigateTo({ url: '/pages/search/main' })
    }
  }
}
</script>

<style scoped>
.navigation{
  position: fixed;
  width: 100%;
  height: 20px;
  padding: 40px 0 14px 20px;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: row;
}
#search{
  margin-top: 30px;
  border: 1px solid #e2e2e2;
  width: 68%;
  line-height: 27px;
  height: 30px;
  border-radius: 20px;
  margin-left: 5px;
}
</style>


