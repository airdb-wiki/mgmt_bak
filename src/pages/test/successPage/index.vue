<template>
  <div>
    <!-- 自定义navigation -->
    <navigation :search='false'></navigation>

    <div class="weui-article" style="margin-top: 65px;">
      <div class="weui-article__h1 h1">{{article.title}}</div>
      <div class="weui-article__section">

        <div class="weui-article__title title">发布时间：{{article.time}}  |  文章来源：{{article.resource}}  |  责任编辑：{{article.editory}}</div>
        <div class="weui-article__title" style="text-align: center;">编  辑：{{article.editor}}</div>

        <div class="weui-article__section">
          <div class="weui-article__h3 h3" style="text-align: center;font-weight: bold;">{{article.subTitle_1}}</div>
          <div class="weui-article__p" v-for="item in article.content_1" :key="item.id">
            {{item}}
          </div>
          <div class="weui-article__p">
            <image class="weui-article__img" src="/static/images/home/sls.png" mode="aspectFit" style="height: 180px" />
            <image class="weui-article__img" src="/static/images/home/vr.png" mode="aspectFit" style="height: 180px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from '@/components/navigation'

export default {
  components: {
    navigation
  },
  data () {
    return {
      article: {
        title: '31年梦思亲，3000里路迢迢--唐军回家',
        time: '2018-4-23',
        resource: '党员信息化平台',
        editory: '宝贝回家',
        editor: '欢悦无题',
        subTitle_1: '陈连发寻家',
        abstract: '他心底一直有一个愿望，想找到自己的亲人',
        content_1: [
          '现居河北省盐山县的陈连发，三岁被拐，十岁知晓自己身世，十四岁养父去世他只得辍学走向社会打拼。现在，他与亲生父母分离近三十一年了，他心底一直有个心愿，想找到自己的亲人。',
          '2014年6月8日，经人介绍，约32岁的陈连发在宝贝回家寻子网站进行了寻亲登记，寻家工作组志愿者精彩跟进该案例，及时和陈连发进行沟通，陈连发告诉精彩，他十岁时养母病重，告诉他说他不是自己亲生的孩子，有机会让他去找找亲生父母，说卖他到河北的是一个贵州女人。说他刚到家的时候，把去厕所说成找马桶，吃水果一定要削皮，听邻居说他亲生父亲开车来村上找过他没有找到又走了。陈连发后来得知自己被人贩子以3000元的价格卖给了他现在养家叔叔，后来听说这个人贩子已经被枪毙了。',
          '6月20日精彩在宝贝回家论坛发帖，精彩发帖后，志愿者和社会爱心人士在各大平台对陈连发寻亲帖进行了广泛的转帖和讨论。志愿者红黄凤凰建议尽量找到陈连发小时候照片，陈连发费劲周折找到了他小时候的照片；志愿者分析陈连发和在网站登记的已回家孩子杨国浩是卖到同一个地方，陈连发可能是从贵州带过来的，也有可能是四川云南一带的。帮助寻找期间，精彩指导陈连发本人采血入库。',
          '2016年10月23日，精彩因故不能再继续跟进该案例，志愿者卫穆接下了这个任务，立刻与陈连发取得联系，引导他和养家姐姐以及周围邻居沟通，希望能挖掘到有用信息。寻亲心切的陈连发自己想了很多办法走访和取证，但获得有用线索还是很少。',
          '夜夜多梦，梦里回家，家在哪里呀？'
        ]
      }
    }
  },
  onShareAppMessage: function () {
    return {
      title: '凝聚每一份爱的力量',
      path: '/pages/hr/main?from=forward',
      imageUrl: '/static/images/forward.png'
    }
  }
}
</script>

<style scoped>
.h1{
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  text-align: center;
}
.title{
    text-align: center;
    font-size: 10px;
}
</style>
