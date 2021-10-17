<template>
  <!-- <ShowArticle></ShowArticle> -->
  <view>
    123123
  </view>
</template>

<script>
import { AtMessage } from 'taro-ui-vue3'
import Taro from '@tarojs/taro';
import { articleDetail } from "../../../utils/api";
import "./index.less";
export default {
  // ShowArticle,
  components:{
    
  },
  data() {
    return {

    }
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
    let id = this.$instance.router.params.id;
    console.log("id", id);
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
  
    articleDetail(id).then((res) => {
        console.log(res);

      });
  },
   
};
</script>