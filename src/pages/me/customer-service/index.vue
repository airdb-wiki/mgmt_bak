<template>
  <view class="customer-service">
    <view class="customer-service-tip">
      <text class="title">FAQ 常见问题：</text>
      <text class="text"
        >1.紧急情况下，您可以通过客服联系我们，我们会有专业高效的客服会尽快回复您。</text
      >
      <text class="text"
        >2.
        我们的客服会将您的情况进行搜集，并且会通知到下线的志愿者,触发线下救助流程。</text
      >
      <text class="text">3. 整个过程是公益行为，不会收取任何费用。</text>
      <text class="text"
        >4.整个过程不会主动采集您的个人信息，是隐私的。只有微信头像和昵称是公开的。</text
      >
      <text class="text">5. 欢迎大家积极参与、加入志愿者群。</text>
    </view>
    <view class="customer-list">
      <customer-item v-for="item in list" :key="item.id" :item="item" />
    </view>
  </view>
</template>

<script>
import { defineComponent } from "vue";
import {
  WXKF_ZUOHAOSHI,
  WXKF_YINGJIJIUYUAN,
  WXKF_JINJIXUNREN,
  WXKF_BBHJ,
  WXKF_XINLIZIXUN,
} from "../../../utils/wxkf";
import CustomerItem from "../../../components/CustomerItem.vue";

export default defineComponent({
  components: { CustomerItem },
  setup() {
    const list = [
      {
        id: WXKF_ZUOHAOSHI,
        title: "一块做好事",
        desc: "欢迎运营产品设计开发等技术人员加入志愿者, 一起做好事",
      },
      {
        id: WXKF_YINGJIJIUYUAN,
        title: "地震救援",
        desc: "地震灾害救援",
      },
      {
        id: WXKF_YINGJIJIUYUAN,
        title: "救援物资",
        desc: "反馈、咨询救援物资需求情况",
      },
      {
        id: WXKF_YINGJIJIUYUAN,
        title: "洪灾救援",
        desc: "洪水灾害救援",
      },
      {
        id: WXKF_XINLIZIXUN,
        title: "心理咨询",
        desc: "(试运营)提供心理咨询服务",
      },
      {
        id: WXKF_ZUOHAOSHI,
        title: "抗疫有我",
        desc: "全民抗疫，一起努力打败疫情",
      },
    ];

    return {
      list,
    };
  },
});
</script>

<style lang="less">
.customer-service {
  padding: 20px;
  min-height: 100vh;
  background-color: #efeded;
  box-sizing: border-box;
  .customer-service-tip {
    padding: 25px;
    border-radius: 8px;
    background-image: url("../../../../imgs/bg_customer.jpg");
    background-size: cover;
    background-position: center;
    overflow: hidden;
    filter: drop-shadow(0 0 5px rgba(17, 17, 17, 0.06));
    .title {
      display: block;
      font-size: 36px;
      color: #240e06;
    }
    .text {
      display: block;
      font-size: 28px;
      color: #825035;
    }
  }
  .customer-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .customer-item {
      flex: 1 1 49%;
      max-width: 49%;
      box-sizing: border-box;
    }
  }
}
</style>