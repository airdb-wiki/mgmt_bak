<template>
    <view class="page_doc">
        <view class="doc_info">
            <view class="doc_item"
            v-for="(item,index) in docTitleList"
            :key="index"
            @click="jumpTo(item.url)">
                <span class="doc_item_title">{{item.name}}</span>
                <img class="doc_item_icon_right" :src="narrowImg" mode="widthFix"/>
            </view>
        </view>
    </view>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'doc',
  data() {
    return {
      narrowImg: 'https://wechat-1251018873.file.myqcloud.com/images/narrow.png',
      docTitleList: [{
        name: '英文文档',
        url: '/doc/detail/docs',
      }, {
        name: '中文文档',
        url: '/doc/detail/docscn',
      }, {
        name: '标准库中文文档',
        url: '/doc/detail/pkgdoc',
      }, {
        name: 'Go指南',
        url: '/doc/detail/tour',
      }],
    }
  },
  methods: {
    jumpTo(url) {
      window.open(url)
    }
  }
})

</script>
<style lang="less">
    .page_doc {

        .doc_info{
            width: 100%;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            padding: 10px 20px 20px 20px;
        }

        .doc_item{
            width:100%;
            height:160rpx;
            background:rgba(255,255,255,1);
            border-radius:4px;
            line-height:160rpx;
            margin-bottom: 10px;
            position: relative;
        }

        .doc_item_title {
            position: absolute;
            left: 20px;
            font-family: PingFangSC-Regular;
            font-size: 34rpx;
            color: #333333;
            letter-spacing: 0;
            line-height: 160rpx;
            font-weight: 700;
        }

        .doc_item_icon_right{
            position: absolute;
            width: 12px;
            height: 15px;
            top: 35px;
            right: 16px;
        }
    }

</style>
