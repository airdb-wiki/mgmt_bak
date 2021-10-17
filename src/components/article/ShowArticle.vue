<template>
  <div>
    <div class="basefirst">
        <image :src="avatar" mode="scaleToFill" class="avatar" />
        <div class="name_cntent">
            <text class="name">{{item.nickname}}&nbsp;&nbsp;{{item.babyid}}</text>
            <text class="desc">{{item.title}}</text>
        </div>
        <img class="share" src="../../imgs/icon/icon-share.png" @click="share" />
    </div>
    <div class="row_container">
        <div class="row_item small_row">
            <div class="label"><text>累计转发助力：1500次</text></div>
        </div>
        <div class="row_item small_row">
            <div class="label"><text>累计曝光助力：10,000次</text></div>
        </div>
    </div>

    <div class="row_container">
        <div class="row_item border">
            <div class="label">基础信息</div>
        </div>
        <div class="row_item border">
            <div class="label"><text>性别：</text></div>
            <div class="value"><text>{{ item.gender==2?'女':'男' }}</text></div>
        </div>
        <div class="row_item border">
            <div class="label"><text>出生日期：</text></div>
            <div class="value"><text>{{ParseTime(item.missed_at,'{y}-{m}-{d}')}}</text></div>
        </div>
        <div class="row_item border">
            <div class="label"><text>寻亲编号：</text></div>
            <div class="value"><text>{{item.babyid}}</text></div>
        </div>
        <div class="row_item border">
            <div class="label"><text>寻亲类别：</text></div>
            <div class="value"><text>{{item.category}}</text></div>
        </div>
        <div class="row_item border">
            <div class="label"><text>户籍地点：{{item.missed_province}}-{{item.missed_city}}-{{item.missed_address}}</text></div>
        </div>
    </div>
    <div class="photos_container">
        <div class="photos_list">
            <div class="photo_item" :key="index" v-for="(photo,index) in item.images">
                <img :src="photo" mode="scaleToFill" class="photo" 
                     @click="previewImage(item.images, index)" />
            </div>
        </div>
        <div class="desc"><text>左右滑动查看图片</text></div>
    </div>
    <div class="row_container">
        <div class="row_item border">
            <div class="label">失踪信息</div>
        </div>
        <div class="row_item border">
            <div class="label"><text>信息来源：</text></div>
            <div class="value"><text>{{item.data_from}}</text></div>
        </div>
        <div class="row_item border">
            <div class="label"><text>跟进志愿者：</text></div>
            <div class="value"><text>{{item.details}}</text></div>
        </div>
    </div>

    <div class="row_container">
        <div class="row_item border">
            <div class="label">其他资料</div>
        </div>
        <div class="row_item border">
            <div class="label"><text>其他线索：</text></div>
            <div class="value"><text></text></div>
        </div>
        <div class="row_item border">
            <div class="label"><text>跟进进度：</text></div>
            <div class="value"><text></text></div>
        </div>
    </div>
  </div>
</template>

<script>
import { ParseTime } from '../../common/utils'
import { computed, defineComponent, PropType, toRefs } from "vue";
export default defineComponent({
  name: 'ShowArticle',
  props: ['item'],
  data() {
    return {
      avatar: 'https://wechat-1251018873.cos.ap-shanghai.myqcloud.com/mina/base/forward/home1.jpg',
    }
  },
  setup() {
    console.log('artice123123', this.item)
  },
  created() {
    
    // if (this.item.images !== undefined) {
    //   this.avatar = this.item.images[0]
    // }
    // // window.addEventListener('wxshow', (options) => console.log('wxshow:', options))
    // wx.showShareMenu({
    //   withShareTicket: true,
    //   menus: ['shareAppMessage', 'shareTimeline'],
    // })
  },
  methods: {
    ParseTime,
    // jumpToDetail(jurl) {
    //   this.url = '/article/111?data={aaa=11,bb=22}'
    //   console.log('xxxurl', jurl)
    //   window.location.href = '/article/111'
    //   // window.location.href = jurl
    // },
    // share(article) {
    //   window.onShareAppMessage = (res) => {
    //     console.log(res)
    //     if (res.from === 'button') {
    //       return {
    //         title: article.title,
    //         path: `/article/${article.id}`,
    //         imageUrl: article.cover,
    //       }
    //     }
    //     return null
    //   }
    // },
    // previewImage(list, current) {
    //   if (!current) current = 0
    //   wx.previewImage({
    //     current: current,
    //     urls: list
    //   })
    // }
  },
})
</script>

<style lang="less">
    .basefirst{
        position: relative;
        background: #FFFFFF;
        width: 100%;
        height: 140rpx;
        .avatar{
            position: absolute;
            left: 20rpx;
            top: 20rpx;
            width: 100rpx;
            height: 100rpx;
        }
        .name_cntent{
            position: absolute;
            top: 20rpx;
            left: 140rpx;
            .name {
                 font-family: PingFangSC;
                font-size: 26rpx;
                color: #000000;
            }
            .desc{
                font-family: PingFangSC;
                font-size: 24rpx;
                text-align: justify;
                color: #000000;
                mix-blend-mode: normal;
                opacity: 0.3;
                width: 500rpx;
            }
        }
        .share{
           top: 45rpx;
           right: 30rpx;
           width: 50rpx;
           height: 50rpx;
           position: absolute;
        }
    }
    .row_container{
        background: #FFFFFF;
        margin-bottom: 10rpx;
        .row_item{
            width: 100%;
            line-height: 80rpx;
            min-height: 80rpx;
            font-family: PingFangSC;
            font-size: 24rpx;
            color: #000000;
            mix-blend-mode: normal;
            opacity: 0.5;
            clear: both;
            .label{
                float: left;
                margin-top: 20rpx;
                margin-left: 20rpx;
                line-height: 40rpx;
                min-width: 150rpx;
            }
            .value{
                float: left;
                margin-top: 20rpx;
                margin-left: 5rpx;
                width: 550rpx;
                white-space: pre-wrap;
                line-height: 40rpx;
            }
        }
        .row_item::after{
            content: "";
            display: block;
            clear: both;
        }
        .small_row{
            line-height: 50rpx;
            height: 50rpx;
        }
        .border {
            border-bottom: 1px solid #f5f6f6;
        }
    }

    .photos_container{
        background: #FFFFFF;
        margin-bottom: 10rpx;
        padding: 10rpx 20rpx 10rpx 20rpx;
        .photos_list{
            white-space: nowrap;
            overflow-x: scroll;
            overflow-y: hidden;
            -webkit-overflow-scrolling:touch;
            height:190rpx;
            ::-webkit-scrollbar{
                display: none;
            }
            .photo_item{
                display: inline-block;
                margin-right: 20rpx;
                .photo{
                    width: 250rpx;
                    height: 180rpx;
                    border-radius: 10rpx;
                }
            }
        }
        .desc{
            text-align: center;
            font-family: PingFangSC;
            font-size: 20rpx;
            color: #000000;
            mix-blend-mode: normal;
            opacity: 0.5;
        }
    }
</style>
