<template>
123123
    <ShowArticle></ShowArticle>
</template>

<script>
import { ref } from "vue";
// 默认是 index
import ShowArticle from '../../../components/article/ShowArticle.vue';
import "./index.less";

import { AtList, AtListItem } from "taro-ui-vue3";

export default {
  components:{
    ShowArticle,
  },
  setup() {
   
  },
  data() {
   
  },
  methods: {

  },
   
};
</script>