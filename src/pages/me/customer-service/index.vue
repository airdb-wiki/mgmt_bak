<template>
  <view class="customer-service">
    <view class="">
      FAQ 常见问题：
      <br />
      1.
      紧急情况下，您可以通过客服联系我们，我们会有专业高效的客服会尽快回复您。
      <br />
      2. 我们的客服会将您的情况进行搜集，并且会通知到下线的志愿者,
      触发线下救助流程。
      <br />
      3. 整个过程是公益行为，不会收取任何费用。
      <br />
      4.
      整个过程不会主动采集您的个人信息，是隐私的。只有微信头像和昵称是公开的。
      <br />
      5. 欢迎大家积极参与、加入志愿者群。
      <br />
      <br />
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
} from "../../../utils/wxkf";
import CustomerItem from "../../../components/CustomerItem.vue";

export default defineComponent({
  components: { CustomerItem },
  setup() {
    const list = [
      {
        id: WXKF_ZUOHAOSHI,
        title: "一块做好事",
        desc: "一块做好事，让社会更美好",
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
        id: WXKF_JINJIXUNREN,
        title: "洪灾救援",
        desc: "洪水灾害救援",
      },
      {
        id: WXKF_ZUOHAOSHI,
        title: "志愿者",
        desc: "成为线下寻人志愿者，帮助走失宝贝寻家",
      },
      {
        id: WXKF_ZUOHAOSHI,
        title: "技术志愿者",
        desc: "欢迎产品运营开发等技术人员加入，帮助我们提升服务质量",
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
  background-color: #f8f8f8;
  box-sizing: border-box;
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