<template>
  <view>
    <view class="title_container">
      <text class="title_text">{{detail.introduction}}</text>
    </view>
    <view class="helper_container">
      <nut-cell-group>
        <nut-cell round-radius="0">
          <view class="flex">
            <view class="flex flex-start">
              <view>
                <image :src="avatar || logo" mode="scaleToFill" class="avatar" />
              </view>
              <view>
                <view class="label">
                  <text class="name">{{detail.name}}</text>
                  <text class="id">{{detail.babyid}}</text>
                </view>
                <view class="label">{{detail.desc}}</view>
              </view>
            </view>
            <view class="helper_icon">
                <button class="share_button" open-type="share">
                  <nut-icon name="share" color="#fa2c19" size="18"></nut-icon>
                </button>
            </view>     
          </view>
        </nut-cell>
        <nut-cell round-radius="0">
          <view class="flex">
            <view>
              <view class="label">累计转发助力：{{detail.share_count}}次</view>
              <view class="label">累计曝光助力：{{detail.show_count}}次</view>
            </view>
            <view class="helper_icon">
                <nut-icon name="download" color="#fa2c19" size="18"></nut-icon>
            </view>     
          </view>
        </nut-cell>
      </nut-cell-group>
    </view>
    <!-- 基本信息 -->
    <view class="info_container">
      <nut-cell-group>
        <nut-cell title="基本信息">
          <text class="cell_title">基本信息</text>
        </nut-cell>
        <nut-cell title="姓名：" :desc="detail.name || '-'"></nut-cell>
        <nut-cell title="性别：" :desc="detail.gender || '-'"></nut-cell>
        <nut-cell title="出生日期：" :desc="detail.birthed_at || '-'"></nut-cell>
      </nut-cell-group>
    </view>
    <!-- 轮播图 -->
    <view class="swiper_container" v-if="detail.carousel.length">
      <swiper class="swiper_class" :current="current">
        <view v-for="(item,index) in detail.carousel" :key="index">
          <swiper-item>
            <image :src="item" mode="heightFix" class="swiper_img"></image>
          </swiper-item>
        </view>
      </swiper>
      <view class="touch_container">
        <view class="touch_left" @click="swiperImg('left')"></view>
        <view class="text">左右滑动查看更多图片</view>
        <view class="touch_right" @click="swiperImg('right')"></view>
      </view>
    </view>
    <!-- 失踪信息 -->
    <view class="info_container">
      <nut-cell-group>
        <nut-cell title="失踪信息">
          <text class="cell_title">失踪信息</text>
        </nut-cell>
        <nut-cell title="失踪时间：" :desc="detail.miss_at || '-'"></nut-cell>
        <nut-cell title="失踪地点：" :desc="detail.miss_addr || '-'"></nut-cell>
        <nut-cell title="失踪时身高：" :desc="detail.miss_height || '-'"></nut-cell>
        <nut-cell title="特征" border="0">
          <view>
            <view>特征：</view>
            <view style="margin-top:10px">{{detail.character}}</view>
          </view>
        </nut-cell>
      </nut-cell-group>
    </view>
    <!-- 寻亲信息 -->
    <view class="info_container">
      <nut-cell-group>
        <nut-cell title="寻亲信息">
          <text class="cell_title">寻亲信息</text>
        </nut-cell>
        <nut-cell title="寻亲编号：" :desc="detail.babyid || '-'"></nut-cell>
        <nut-cell title="寻亲类型：" :desc="detail.category || '-'"></nut-cell>
        <nut-cell title="信息来源：" :desc="detail.data_from || '-'" @click="copy"></nut-cell>
        <nut-cell title="跟进志愿者：" :desc="detail.follower || '-'"></nut-cell>
      </nut-cell-group>
    </view>
    <!-- 提供线索 -->
    <view class="button_container">
      <!-- <nut-button type="success" shape="square" size="large">提供线索</nut-button> -->
      <button class="custom_btn" @tap="openCustomerService">提供线索</button>
    </view>
  </view>
</template>

<script>
import { AtMessage } from "taro-ui-vue3";
import { Avatar,Button,Cell,Icon } from '@nutui/nutui';
import Taro from "@tarojs/taro";
import { queryLost, lostShareCb } from "../../../utils/api";
import { ParseTime } from "../../../common/utils";
import { openCustomerServiceChat } from '@tarojs/taro'
import "./index.less";
export default {
  components: {},
  data() {
    return {
      id: '',
      detail: {
        babyid: "", //失踪人员登记编号
        birthed_at: "", //出生日期
        carousel: [], //轮播图
        category: "", //寻亲信息
        character: "", //特征
        data_from: "", //信息来源
        follower: "", //跟进志愿者
        gender: "", //性别
        id: 0, //丢失序号
        introduction: "", //简介内容
        miss_addr: "", //失踪地点
        miss_at: "", //失踪信息
        miss_height: "", //失踪时身高
        name: "", //姓名
        name_more: "", //基础信息
        share_count: 0, //累计转发次数
        show_count: 0, //累计曝光次数
        title: "", //标题
        wx_more: {}
      },
      current: 0,
      logo: require('../../../../imgs/logo.jpg')
    };
  },
  methods: {},
  created() {
    // 建议在页面初始化时把 getCurrentInstance() 的结果保存下来供后面使用，
    // 而不是频繁地调用此 API
    this.$instance = Taro.getCurrentInstance();
    this.id = this.$instance.router.params.id;
    this.getDetail(this.id)
  },
  onLoad(options){
    console.log(options)
  },
  mounted() {
    
  },
  methods: {
    ParseTime,
    openCustomerService(){
      let id = 'kfc5fdb2e0a1f297753'
      openCustomerServiceChat({
        extInfo: { url: `https://work.weixin.qq.com/kfid/${id}?sence=mp-bbhj`},
        corpId: "wx4aaa3fe59423b402",
        success(res) {
          console.log("打开客服成功");
        },
        fail(res) {
          console.log("fail", res);
        },
      });
    },
    getDetail(id) {
      queryLost(id).then((res) => {
        if(res.success){
          this.detail = res.data
          let desc = ''
          let name = ''
          if(res.data.introduction.indexOf('寻找')!==-1){
            desc = res.data.introduction.substring(2)
            if(desc.indexOf('市')){
              let i = desc.indexOf('市')
              desc = desc.substring(0,i+1)
            }
          }
          this.detail.desc = desc
        }
      });
    },
    swiperImg(type) {
      let len = this.detail.carousel.length
      if(this.current < len-1 && type=='right' ) this.current ++;
      if(this.current > 0 && type=='left' ) this.current --;
    },
    // 复制消息来源
    copy(){
      Taro.setClipboardData({
        data: this.detail.data_from,
        success: function (res) {
          Taro.getClipboardData({
            success: function (res) {
              console.log(res.data) // data
            }
          })
        }
      })
    },
    // 转发后的回调
    shareCb(){
      let params = {
        lost_id: this.id,
        share_key: this.detail.wx_more.share_app_message.share_key
      }
      lostShareCb(params).then(res=>{

      })
    }
  },
  onPullDownRefresh: function () {
    setTimeout(()=>{
      wx.stopPullDownRefresh();
    },300)
  },
  // 分享
  onShareAppMessage(res) {
    const that = this
    that.shareCb()
    return {
      title: this.detail.wx_more.share_timeline.title,
      url: 'pages/article/detail/index?lost_id=1143038'
    }
  }
};
</script>
<style lang="less">
  .title_container{
    width: 100%;
    background: #fff;
    min-height: 50px;
    padding: 20px 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #f4f4f4;
    .title_text{
      font-weight: bold;
      color: #333;
      font-size: 28px;
    }
  }
  .helper_container{
    .flex{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .label{
        padding: 4px 0;
        .name{
          font-weight: bold;
          margin-right: 10px;
        }
        .id{
          font-weight: bold;
        }
      }
    }
    .flex-start{
      justify-content: flex-start;
    }
    .avatar{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #f4f4f4;
      margin-right: 20px;
    }
    .helper_icon{
      padding: 20px;
    }
    button{
      background: transparent;
      margin: 0;
      padding: 0;
      border: 0;
      border: none;
    }
    button::after{
      border: none;
    }
    .share_button{
      background: transparent;
      border: none;
    }
  }
  .swiper_container{
    .swiper_class{
      height: 360px;
      .swiper_image{
        width: 100%;
        height: 360px;
      }
    }
    
    .touch_container{
      width: 100%;
      height: 70px;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      .text{
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #fff;
        box-sizing: border-box;
        padding: 0 20px;
        font-size: 28px;
        border-radius: 30px;
      }
      .touch_left, .touch_right{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #ddd;
        position: relative;
        margin: 0 10px;
      }
      .touch_left::after{
        content: "";
        width: 12px;
        height: 12px;
        border: solid #fff;
        border-width: 4px 0 0 4px;
        transform: translate(-50%, -50%) rotate(-45deg);
        position: absolute;
        left: 55%;
        top: 50%;
      }
      .touch_right::after{
        content: "";
        width: 12px;
        height: 12px;
        border: solid #fff;
        border-width: 0 4px 4px 0;
        transform: translate(-50%, -50%) rotate(-45deg);
        position: absolute;
        left: 45%;
        top: 50%;
      }
    }
  }
  .button_container{
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 30px 50px 30px;
    button{
      background: transparent;
      margin: 0;
      padding: 0;
      border: 0;
      border: none;
    }
    button::after{
      border: none;
    }
    .custom_btn{
      width: 100%;
      height: 90px;
      line-height: 90px;
      color: #fff;
      font-size: 30px;
      background: #30BD24;
    }
  }
  .nut-cell-group__warp{
    border-radius: none;
    border-bottom: 4px solid #f0f0f0;
  }
  .nut-cell{
    box-shadow: none;
    color: #333;
  }
  .cell_title{
    font-weight: bold;
    color: #333;
  }
  .nut-cell__title{
    font-weight: 400;
    color: #333;
    flex: 1 0 auto;
  }
  .nut-cell__value{
    color: #666;
  }
</style>