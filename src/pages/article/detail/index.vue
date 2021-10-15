<template>
  <!-- <ShowArticle></ShowArticle> -->
</template>

<script>
import { ref } from "vue";
// 默认是 index
// import ShowArticle from '../../../components/article/ShowArticle.vue';
import Taro, { useRouter } from '@tarojs/taro';
import {articleDetail} from '@utils/api.js';
import "./index.less";
export default {
  
  components:{
    // ShowArticle,
  },
  setup() {
   
  },
  data() {
    return
  },
  methods: {
      
  },
  created () {
    // 建议在页面初始化时把 getCurrentInstance() 的结果保存下来供后面使用，
    // 而不是频繁地调用此 API
    this.$instance = Taro.getCurrentInstance()
  },
  mounted () {
    // 获取路由参数
    console.log(this.$instance.router.params.id) // 输出 { id: 2, type: 'test' }
    articleDetail()
  },
   
};
</script>