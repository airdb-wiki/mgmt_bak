<template>
  <div>
    <div class="basefirst">
        <img :src="item.AvatarURL" mode="scaleToFill" class="avatar" @click="previewImage([item.AvatarURL])" />
        <div class="name_cntent">
            <text class="name">{{item.Nickname}}&nbsp;&nbsp;{{item.BabyID}}</text>
            <text class="desc">1983年被送样河南</text>
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
            <div class="label"><text>性别：女</text></div>
        </div>
        <div class="row_item border">
            <div class="label"><text>出生日期：2012-09-10</text></div>
        </div>
        <div class="row_item border">
            <div class="label"><text>户籍地点：中国广东深圳南山区粤海街道办1001号</text></div>
        </div>
    </div>
    <div class="photos_container">
        <div class="photos_list">
            <div class="photo_item" :key="index" v-for="(photo,index) of [item.AvatarURL,item.AvatarURL,item.AvatarURL,item.AvatarURL,item.AvatarURL,item.AvatarURL]">
                <img :src="photo" mode="scaleToFill" class="photo" @click="previewImage([item.AvatarURL,item.AvatarURL,item.AvatarURL,item.AvatarURL,item.AvatarURL,item.AvatarURL],index)" />
            </div>
        </div>
        <div class="desc"><text>左右滑动查看图片</text></div>
    </div>
    <div class="row_container">
        <div class="row_item border">
            <div class="label">失踪信息</div>
        </div>
        <div class="row_item border">
            <div class="label"><text>寻亲编号：15344</text></div>
        </div>
        <div class="row_item border">
            <div class="label"><text>寻亲类别：家寻宝贝</text></div>
        </div>
        <div class="row_item border">
            <div class="label"><text>信息来源：https://bbs.baobeihuijia.com/xxxx</text></div>
        </div>
        <div class="row_item border">
            <div class="label"><text>跟进制原则：李四</text></div>
        </div>
    </div>

    <div class="row_container">
        <div class="row_item border">
            <div class="label">其他资料</div>
        </div>
        <div class="row_item border">
            <div class="label"><text>其他线索：xx</text></div>
        </div>
        <div class="row_item border">
            <div class="label"><text>跟进进度：</text></div>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
//  AvatarURL: 'https://wechat-1251018873.file.myqcloud.com/images/banner.png',
//         BabyID: 32519,
//         Gender: 1,
//         BirthedAt: 1599305851,
//         BirthedProvince: '北京',
//         BirthedCity: '北京',
//         BirthedCountry: '中国',
//         MissedAt: 1599305851,
//         MissedProvince: '广东',
//         MissedCity: '深圳',
//         MissedCountry: '中国',
//         MissedAddress: '测试测试',
//         Nickname: '王姑娘',
//         Height: '172厘米左右',
//         Subject: '1988年3月3日(农历）出生于江苏省宿迁市人民医院，被送养的王姑娘寻亲 32519',
//         DataFrom: 'https://bbs.baobeihuijia.com/thread-151906-1-1.html',
//         Category: '宝贝寻家',
//         Volunteer: '鼠尔草 跟进',
//         Details: '测试测试'
export default Vue.extend({
  name: 'ShowArticle',
  props: ['item'],
  data() {
    return {}
  },
  created() {
    console.log('xxxxxxxxxxxxxcomponent_article', this.item)
    // window.addEventListener('wxshow', (options) => console.log('wxshow:', options))
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    })
  },
  methods: {
    jumpToDetail(jurl) {
      this.url = '/article/111?data={aaa=11,bb=22}'
      console.log('xxxurl', jurl)
      window.location.href = '/article/111'
      // window.location.href = jurl
    },
    share(article) {
      window.onShareAppMessage = (res) => {
        console.log(res)
        if (res.from === 'button') {
          return {
            title: article.title,
            path: `/article/${article.id}`,
            imageUrl: article.cover,
          }
        }
        return null
      }
    },
    previewImage(list,current){
        if (!current) current = 0
        wx.previewImage({
           current: current,
           urls: list
        })
    }
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
            height: 80rpx;
            .label{
                font-family: PingFangSC;
                font-size: 24rpx;
                margin-left: 20rpx;
                color: #000000;
                mix-blend-mode: normal;
                opacity: 0.5;
            }
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
