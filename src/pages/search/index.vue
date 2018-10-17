<template>
  <div class="page">
    <div class="navigation">
      <div class="btn">
        <navigator open-type="navigateBack">
          <img src="/static/images/home/back.png" class="back">
        </navigator>

        <div style="border-left: 1px solid #e2e2e2;margin: 2px 10px 0 4px;height: 18px;"></div>

        <navigator open-type="reLaunch" url="/pages/home/main">
          <img src="/static/images/home/home.png" class="home">
        </navigator>
      </div>

      <div v-if="!showTitle" class="title">SearchBar</div>
      <div v-else class="title">{{title}}</div>
    </div>

    <div class="page__bd" style="margin-top: 51pt;">
      <div class="weui-search-bar">
        <div class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
            <input type="text" class="weui-search-bar__input" :placeholder="inputPla" v-model="inputVal" @input="inputTyping" />
            <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
              <icon type="clear" size="14"></icon>
            </div>
          </div>
        </div>
        <div class="weui-search-bar__cancel-btn" @click="search">搜索</div>
      </div>
      <!-- 搜索历史 -->
      <div v-if="searchData.length > 1" :hidden="!showSearchBar">
        <div style="display: flex; flex-direction: row;">
          <div style="flex: 6;padding: 5px 10px;">搜索历史</div>
          <icon type="clear" size="18" style="flex: 1;margin-top: 9px;" @click="clearSto"></icon>
        </div>
        <div class="history">
          <navigator url="" v-for="(item, index) in searchData" :key="item.id">
            <div v-if="index < searchData.length-1 && index < 8">
              <div>{{item}}</div>
            </div>
          </navigator>
        </div>
      </div>
      

      <div class="weui-cells searchbar-result" v-if="inputVal.length > 0" :hidden="showSearchBar">
        <navigator url="" class="weui-cell" hover-class="weui-cell_active">
          <div class="weui-cell__bd">
            <div>实时搜索文本</div>
          </div>
        </navigator>
        <navigator url="" class="weui-cell" hover-class="weui-cell_active">
          <div class="weui-cell__bd">
            <div>实时搜索文本</div>
          </div>
        </navigator>
        <navigator url="" class="weui-cell" hover-class="weui-cell_active">
          <div class="weui-cell__bd">
            <div>实时搜索文本</div>
          </div>
        </navigator>
        <navigator url="" class="weui-cell" hover-class="weui-cell_active">
          <div class="weui-cell__bd">
            <div>实时搜索文本</div>
          </div>
        </navigator>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from '@/components/navigation'

export default {
  conponents: {
    navigation
  },
  data () {
    return {
      inputVal: '',
      inputPla: '搜索',
      searchData: ['hahaha'],
      showSearchBar: true
    }
  },
  mounted () {
    if (wx.getStorageSync('searchData') !== '') {
      this.searchData = wx.getStorageSync('searchData')
      this.inputPla = '搜索'
    }
  },
  methods: {
    search () {
      this.inputPla = this.inputVal
      this.showSearchBar = true
      this.searchData = this.searchData.concat(this.inputVal)
      this.searchData.reverse()
      wx.setStorageSync('searchData', this.searchData)
      this.clearInput()
    },
    clearInput () {
      this.inputVal = ''
    },
    inputTyping (e) {
      console.log(e)
      this.showSearchBar = false
      this.inputVal = e.mp.detail.value
    },
    back () {
      wx.navigateBack({
        delta: 1
      })
    },
    clearSto () {
      this.searchData = ['hahaha']
      wx.setStorageSync('searchData', this.searchData)
    }
  }
}
</script>

<style scoped>
.page{
  width: 100%;
  height: 200px;
}
.searchbar-result {
  margin-top: 30px;
  font-size: 14px;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12px 15px 12px 35px;
}
.weui-cell__bd{
  padding: 5px 10px;
}
.history{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.history div{
  padding: 1px 10px;
  margin: 5px;
  background-color: #ffffff;
  border-radius: 3px;
}
.navigation{
  width: 100%;
  padding-top: 21pt;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: row;
}
.title{
  width: 50%;
  margin-left: 3pt;
  text-align: center;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30pt;
  font-size: 18px;
}
.btn{
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3pt 0pt 5pt 4pt;
  margin-left: 6pt;
  width: 56pt;
  height: 15pt;
}
.back{
  width: 20pt;
  height: 20pt;
}
.home{
  width: 17pt;
  height: 17pt;
}
</style>