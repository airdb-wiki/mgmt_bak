<template>
  <div class="navigation">
    <div v-if="search === false" style="padding-right: 45px;margin: auto;line-height: 37px;">{{deContent}}</div>
    <div v-else>
      <div style="display: flex;flex-direction: row;" @click="selectToggle">
        <div style="line-height: 38px;margin-left: -20px;">{{yourcity}}</div>
        <div class="arrow"></div>
      </div>
      <div class='com_sList' v-if="selectShow">
        <div v-for="(item, index) in propArray" :key="item.id" :id="index" class='com-sItem' @click='setText'>{{item.name}}</div>
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
    yourcity: String,
    propArray: Array
  },
  data () {
    return {
      deContent: '宝贝回家',
      position: '',
      selectShow: false
    }
  },
  methods: {
    focus () {
      wx.navigateTo({ url: '/pages/search/main' })
    },
    selectToggle () {
      this.selectShow = !this.selectShow
    },
    setText (e) {
      var id = e.currentTarget.id
      this.yourcity = this.propArray[id].name
      this.selectShow = false
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
  width: 48%;
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
.com_sList{
  background: #fff;
  width: inherit;
  position: absolute;
  left: 2px;
  border: 1px solid #e2e2e2;
  border-top: none;
  box-sizing: border-box;
  z-index: 9999;
  max-height: 400px;
  width: 120px;
  overflow: auto;
}
.com-sItem{
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  border-top: 1px solid #e2e2e2;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #000
}
.com-sItem:first-child{
  border-top: none;
}
</style>


