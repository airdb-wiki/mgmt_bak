<template>
  <div class="page">
    <tx-video vid="m0028s08v11"></tx-video>
    <img src="https://wechat-1251018873.file.myqcloud.com/mina/base/icon/love-bg.png" class="bg">
    <div class="page__bd" style="margin-top: 60px;">
        <div class="weui-article">

            <div class="weui-article__section">

              <div class="weui-article__section">
                <div class="weui-article__h1 myh">
                  <div>背景介绍</div>
                  <img src="https://wechat-1251018873.file.myqcloud.com/mina/base/icon/love-bg.png">
                </div>
                <div class="weui-article__p">
                    宝贝回家小程序宗旨是为帮助寻找失踪儿童及一些流浪乞讨的孩子找家，为孩子家长及志愿者提供一个信息沟通的平台。
                </div>
                <div class="weui-article__p">
                    更多信息请访问：
                    <a href="https://www.airdb.com/zh/bbhj/" style="color: deepskyblue;">https://www.airdb.com/zh/bbhj/</a>
                </div>
              </div>

              <div class="weui-article__section">
                <div class="weui-article__h1 myh">
                  <div>欢迎加入</div>
                  <img src="https://wechat-1251018873.file.myqcloud.com/mina/base/icon/love-bg.png" style="opacity: .5;">
                </div>
                <div class="weui-article__p">
                  如果您有足够的精力、技术投入，欢迎您的加入。 需至少满足如下条件一：
                  <p>\t1. 希望您比较了解 vue、小程序等前端技术；</p>
                  <p>\t2. 希望您能够使用 Golang 编程, 有一定的代码规范；</p>
                  <p>\t3. 希望您有自己的 Github, 有一定的代码提交；</p>
                  <p>\t4. 希望您有一颗追求技术、技术公益的心。</p>
                </div>
              </div>

              <div>
                <div class="weui-article__h1 myh">
                  <div>具体岗位信息</div>
                  <img src="https://wechat-1251018873.file.myqcloud.com/mina/base/icon/love-bg.png" style="opacity: .5;">
                </div>
                <div class='hire-title hirer'>产品经理</div>
                <div>
                  工作地点: 在线兼职, 招聘人数: 1~2名<br>
                  <div class='hire-title'>岗位描述:</div>
                  1.设计宝贝回家小程序,新论坛及主站点<br>
                  2.把握宝贝回家产品方向,更好的让线下公益组织与线上结合
                </div>
                <div>
                  <div class='hire-title'>职位要求:</div>
                  1.熟悉产品从业务调研、需求分析到实现过程、产品发布的整个流程;<br>
                  2.负责新产品的创新和预研,完成新产品的用户需求定义、产品功能/UI/交互的设计;<br>
                  3.负责制定项目开发计划并跟踪进度,确保项目如期完成;<br>
                  4.收集市场反馈与用户行为及需求,提升用户体验;<br>
                  5.撰写详细的产品需求文档及原型设计文档,跟踪产品研发进度;<br>
                  6.负责把控产品推进进度、协调突发问题与质量管理工作.
                </div>

                <div class='hire-title space-top hirer' >产品运营</div>
                <div>
                  工作地点: 在线兼职, 招聘人数: 1~2名<br>
                  <div class='hire-title'>岗位描述:</div>
                  1.日常运营宝贝回家公众号及小程序，对日常数据进行监控，整理，分析，定期形成数据分析报告<br>
                  2.结合实时热点，运营宝贝回家寻人品牌<br>
                  3.整合寻人公益平台,整合相关数据,挖掘更多公益价值
                </div>
                <div>
                  <div class='hire-title'>职位要求:</div>
                  1.专业不限,富有创意,有自己独特的构思和见解<br>
                  2.工作耐心细致，能够关注每项指标的变化，提高运营效果<br>
                  3.有一定数据分析能力，能够形成自己专属的运营方法论<br>
                </div>
              </div>
            </div>
        </div>
    </div>
    <ha></ha>
    <!-- <div class="shade" v-if="hidden" catchtouchmove='preventTouchMove'>
      <div class="container_one">
        <div class="trans_text">1.点击</div>
        <img src="/static/images/trans1.jpg" alt="" class="trans1">
      </div>
      <div class="container_two">
        <div class="trans_text">2.点击 [添加到我的小程序]</div>
        <img src="/static/images/trans2.jpg" alt="" class="trans2">
      </div>
      <div class="container_three">
        <div class="trans_text">3.在微信首页下拉,快速进入"宝贝回家"</div>
        <img src="/static/images/trans3.jpg" alt="" class="trans3">
      </div>
      <div class="container_four" @click="conceal">我知道了</div>
    </div> -->
</div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      hidden: 1
    }
  },
  methods: {
    conceal: function () {
      this.hidden = 0
    },
    preventTouchMove: function (e) {

    }
  },
  onShareAppMessage: function () {
    return {
      title: '志愿者招募计划',
      path: '/pages/hr/main?from=forward',
      imageUrl: '/static/images/forward/home1.jpg'
    }
  },
  onShow: function () {
    this.hidden = 1
  }
}
</script>

<style scoped>
.page{
  position: relative;
  width: 340px;
  height: 100%;
}
.bg{
  z-index: -1;
  position: absolute;
  top: 100px;
  left: 110px;
  width: 460px;
  height: 460px;
  transform: rotate(-20deg);
  opacity: .2;
}
.navigation {
  width: 100%;
  padding-top: 21pt;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  z-index: 9999;
  display: flex;
  flex-direction: row;
}
.title {
  width: 50%;
  margin-left: 3pt;
  text-align: center;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30pt;
  font-size: 18px;
  font-weight: bold;
}
.btn {
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3pt 0pt 5pt 4pt;
  margin-left: 6pt;
  width: 56pt;
  height: 15pt;
}
.back {
  width: 20pt;
  height: 20pt;
}
.home {
  width: 17pt;
  height: 17pt;
}
.navbar{
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3px 5px;
  margin-left: 10px;
  width: 25px;
  height: 25px;
}
.myh{
  margin: 0px;
  position: relative;
}
.myh div{
  text-align: center;
  font-weight: bold;
  letter-spacing: 4px;
  line-height: 49px;
  z-index: 9999;
  height: 52px;
}
.myh img{
  position: absolute;
  top: -4px;
  left: 123px;
  z-index: -1;
  width: 60px;
  height: 60px;
  opacity: .7;
}


  /*正式版本样式*/
  .shade{
    position:fixed;
    width:100%;
    height:100%;
    top:70px;
    background:rgba(0,0,0,0.4);
    overflow: hidden;
    color: #fff;
    font-size:18px;
    font-family: Microsoft Yahei;
    letter-spacing:6px;
  }
  .container_one{
    display: flex;
    flex-direction: row;
    margin-top: 12px;
    /* justify-content: center; */
  }
  .container_two{
    margin-top: 12px;
    margin-left: 0px;
  }
  .trans_text{
    margin-left: 30px;
    margin-right: 5px;
  }
  .container_three{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 12px;
   }
  .container_four{
    border:solid 1px;
    width: 150px;
    height: 35px;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-left: 100px;
  }
  .trans1{
    width: 150px;
    height: 40px;
    margin-left: 10px;
  }
  .trans2{
    margin-left: 25px;
    width: 84%;
    height: 140px;
    margin-top: 10px;
  }
  .trans3{
    width:84%;
    height: 180px;
    margin-top: 10px;
  }
  .hire-title{
    font-weight: 700;
  }
  .space-top{
    margin-top:30px;
  }
  .hirer{
    font-size: 20px;
    /* font-weight: 700; */
  }
</style>
