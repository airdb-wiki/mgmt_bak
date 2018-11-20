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

      <div v-if="!showTitle" class="title">宝贝回家</div>
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
          <div @click="stoNav" v-for="(item, index) in searchData" :key="index" 
            :id="item" v-if="index < searchData.length-1 && index < 6">
            <div class="result">{{item}}</div>
          </div>
        </div>
      </div>
      
      <div :hidden="showSearchBar"
        style="font-size: 16px;color: #414141;">搜索结果</div>
      <div class="weui-cells searchbar-result" :hidden="showSearchBar"
        style="padding-top: 5px;margin-top: 0.1789em;">
        <div @click="navTo" v-for="(item, index) in tipKeys" :key="index" :id="item.UUID">
          <div class="weui-cell__bd">
            <div class="avatar">
              <img :src="item.AvatarUrl">
            </div>
            <div class="info">
              <div class="info_title">{{item.Title}}</div>
              <div style="padding-bottom: 5px;">档案编号: {{item.Babyid}}</div>
              <div class="info_1">
                <text v-if="item.Gender == 2">女</text>
                <text v-else>男</text>
                <text>{{item.Category}}</text>
              </div>
            </div>
          </div>
        </div>
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
      inputPla: '请输入姓名或档案编号',
      searchData: ['hahaha'],
      showSearchBar: true,
      tipKeys: [],
      items: [],
      parms: {
        babyid: '',
        nickname: ''
      }
    }
  },
  mounted () {
    if (wx.getStorageSync('searchData') !== '') {
      this.searchData = wx.getStorageSync('searchData')
    }
    if (wx.getStorageSync('inputPla') !== '') {
      this.inputPla = wx.getStorageSync('inputPla')
      console.log('inputplace is : ', wx.getStorageSync('inputPla'))
    }
  },
  async onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  methods: {
    stoNav (e) {
      console.log(e.currentTarget.id)
      var title = e.currentTarget.id
      var UUID = ''
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].Title === title) {
          UUID = this.items[i].UUID
          break
        }
      }
      console.log('UUID', UUID)
      if (UUID === '') {
        wx.showToast({
          title: '搜索内容不存在',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return
      }

      wx.navigateTo({
        url: '../../pages/detail/main?id=' + UUID
      })
    },
    collect (content) {
      this.inputPla = content
      this.showSearchBar = true
      this.searchData.reverse()
      this.searchData = this.searchData.concat(content)
      this.searchData.reverse()
      wx.setStorageSync('searchData', this.searchData)
    },
    // 存入搜索历史，设置placeholder
    search () {
      this.collect(this.inputVal)
      var that = this

      console.log('length is : ', that.tipKeys.length)
      while (that.tipKeys.length !== 0) {
        that.tipKeys.splice(this.tipKeys.length - 1, 1)
        console.log('length is : ', that.tipKeys.length)
      }
      // 删除上次搜索匹配到的信息

      var isnum = /^\d+$/.test(this.inputVal)
      var ischinese = /^[\u4E00-\u9FA5]{1,4}$/.test(this.inputVal)
      console.log('input is chinese: ', ischinese)
      if (isnum === true) {
        that.parms.babyid = that.inputVal
      } else {
        if (ischinese === true) {
          that.parms.nickname = that.inputVal
        } else {
          wx.showToast({
            title: '请输入正确的搜索内容',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          return
        }
      }
      // 验证数据的合法性,并给data赋值

      wx.request({
        url: wx.getStorageSync('requestUrl') + '/small/article/keywords',
        method: 'GET',
        data: {
          nickname: that.parms.nickname,
          babyid: that.parms.babyid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.length === 0) {
            wx.showToast({
              title: '搜索内容不存在',
              icon: 'none',
              duration: 2000,
              mask: true
            })
          } else {
            that.showSearchBar = false // 显示搜索结果框，作为hidden属性的值

            if (res.data[0].Title === '') {
              res.data[0].Title = res.data[0].MissedProvince + '-' + res.data[0].MissedCity + ', 寻找' + res.data[0].Nickname
            } // 判断是否有标题，若无，则添加默认标题
            if (that.tipKeys.length === 0) {
              that.tipKeys = that.tipKeys.concat(res.data[0])
            }
          }
        },
        fail: function (res) {
          console.log('debug=====fail')
        }
      })

      this.clearInput()
    },
    clearInput () {
      this.inputVal = ''
      this.showSearchBar = true
    },
    inputTyping (e) {
      console.log(e)
      this.showSearchBar = false
      this.inputVal = e.mp.detail.value

      var tipKeys = []
      this.tipKeys = []
      if (this.inputVal && this.inputVal.length > 0) {
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].Title.indexOf(this.inputVal) !== -1) {
            tipKeys.push(this.items[i])
            console.log(this.items[i].Title)
          }
        }
      }
      this.tipKeys = tipKeys
    },
    back () {
      wx.navigateBack({
        delta: 1
      })
    },
    clearSto () {
      this.searchData = ['hahaha']
      wx.setStorageSync('searchData', this.searchData)
    },
    navTo (e) {
      var content
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].UUID === e.currentTarget.id) {
          content = this.items[i].Title
          break
        }
      }
      this.collect(content)

      wx.navigateTo({
        url: '../../pages/detail/main?id=' + e.currentTarget.id
      })

      this.inputPla = this.inputVal
      wx.setStorageSync('inputPla', this.inputPla)
      // 保存这次搜索内容到搜索框placeholder

      this.clearInput()
    }
  },
  onLoad () {
    this.items = wx.getStorageSync('database')
  }
}
</script>

<style scoped>
.page{
  width: 100%;
  height: 200px;
}
.searchbar-result {
  font-size: 14px;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12px 15px 12px 35px;
}
.weui-cell__bd{
  padding: 0px 10px;
  margin: 5px;
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e2e2e2;
}
.avatar{
  margin: auto;
  width: 50px;
  height: 50px;
}
.avatar img{
  width: 50px;
  height: 50px;
  border-radius: 4px;
}
.info{
  padding: 0px 10px 5px;
}
.info_title{
  width: 270px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
}
.info_1 text{
  padding: 0px 10px;
  border-radius: 5px;
  background: #e2e2e2;
  margin-right: 4px;
  font-size: 14px;
  color: red;
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
.result{
  width: 64px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>