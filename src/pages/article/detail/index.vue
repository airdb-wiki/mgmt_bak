<template>
  <view>
    <view class="basefirst">
      <image :src="avatar" mode="scaleToFill" class="avatar" />
      <view class="name_cntent">
        <text class="name"
          >{{ item.nickname }}&nbsp;&nbsp;{{ item.babyid }}</text
        >
        <text class="desc">{{ item.title }}</text>
      </view>
      <!-- <image class="share" src="../../../imgs/icon/icon-share.png" @click="share" /> -->
    </view>
    <view class="row_container">
      <view class="row_item small_row">
        <view class="label"><text>累计转发助力：1500次</text></view>
      </view>
      <view class="row_item small_row">
        <view class="label"><text>累计曝光助力：10,000次</text></view>
      </view>
    </view>

    <view class="row_container">
      <view class="row_item border">
        <view class="label">基础信息</view>
      </view>
      <view class="row_item border">
        <view class="label"><text>性别：</text></view>
        <view class="value"
          ><text>{{ item.gender == 2 ? "女" : "男" }}</text></view
        >
      </view>
      <view class="row_item border">
        <view class="label"><text>出生日期：</text></view>
        <view class="value"
          ><text>{{ ParseTime(item.missed_at, "{y}-{m}-{d}") }}</text></view
        >
      </view>
      <view class="row_item border">
        <view class="label"><text>寻亲编号：</text></view>
        <view class="value"
          ><text>{{ item.babyid }}</text></view
        >
      </view>
      <view class="row_item border">
        <view class="label"><text>寻亲类别：</text></view>
        <view class="value"
          ><text>{{ item.category }}</text></view
        >
      </view>
      <view class="row_item border">
        <view class="label"
          ><text
            >户籍地点：{{ item.missed_province }}-{{ item.missed_city }}-{{
              item.missed_address
            }}</text
          ></view
        >
      </view>
    </view>
    <view class="photos_container">
      <view class="photos_list">
        <view
          class="photo_item"
          :key="index"
          v-for="(photo, index) in item.images"
        >
          <image
            :src="photo"
            mode="scaleToFill"
            class="photo"
            @click="previewImage(item.images, index)"
          />
        </view>
      </view>
      <view class="desc"><text>左右滑动查看图片</text></view>
    </view>
    <view class="row_container">
      <view class="row_item border">
        <view class="label">失踪信息</view>
      </view>
      <view class="row_item border">
        <view class="label"><text>信息来源：</text></view>
        <view class="value"
          ><text>{{ item.data_from }}</text></view
        >
      </view>
      <view class="row_item border">
        <view class="label"><text>跟进志愿者：</text></view>
        <view class="value"
          ><text>{{ item.details }}</text></view
        >
      </view>
    </view>

    <view class="row_container">
      <view class="row_item border">
        <view class="label">其他资料</view>
      </view>
      <view class="row_item border">
        <view class="label"><text>其他线索：</text></view>
        <view class="value"><text></text></view>
      </view>
      <view class="row_item border">
        <view class="label"><text>跟进进度：</text></view>
        <view class="value"><text></text></view>
      </view>
    </view>
  </view>
</template>


<script>
import { AtMessage } from "taro-ui-vue3";
import Taro from "@tarojs/taro";
import { articleDetail } from "../../../utils/api";
// import ShowArticle  from '../../../components/article/ShowArticle.vue'
import { ParseTime } from "../../../common/utils";
import "./index.less";
export default {
  components: {
    // ShowArticle,
  },
  data() {
    return {
      item: {},
    };
  },
  methods: {},
  created() {
    // 建议在页面初始化时把 getCurrentInstance() 的结果保存下来供后面使用，
    // 而不是频繁地调用此 API
    this.$instance = Taro.getCurrentInstance();
  },

  mounted() {
    // 获取路由参数
    let id = this.$instance.router.params.id;
    // console.log("id", id);
    // Taro.atMessage({
    //       message: '消息通知',
    //       type:"success"
    //     });
    // console.log("id.length", id.length)
    // if (id.length == 0 || id == ""|| id == " "){

    //   Taro.navigateTo({
    //     url: '/pages/index/index'
    //     // url: 'pages/article/detail?id='+id
    //   })
    //   return
    // }

    queryLost(id).then((res) => {
      this.item = res.data.article;
      console.log(res.data.article);
      console.log("res.data.article", this.item);
    });
  },
  methods: {
    ParseTime,
  },
};
</script>