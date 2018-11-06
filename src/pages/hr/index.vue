<template>
  <div class="page">
    <div class="navigation">
      <div class="btn">
        <navigator open-type="navigateBack">
          <img src="/static/images/home/back.png" class="back">
        </navigator>

        <div style="border-left: 1px solid #e2e2e2;margin: 2px 10px 0 4px;height: 18px;"></div>

        <navigator open-type="reLaunch" url="/pages/home/main">
          <img src="/static/images/home/home.png" class="home">
        </navigator>
      </div>
      <div class="title">加入我们</div>
    </div>

    <tx-video vid="m0028s08v11"></tx-video>
    <img src="/static/images/home/like1.png" class="bg">

    <!-- 自定义navigation -->
    <!--
    <div class="navigation">
      <button :plain="true" @click="back">
        <img src="/static/images/home/back.png" class="back">
        <div style="border: 1px solid #e2e2e2;margin: 0 10px 0 4px;"></div>
        <img src="/static/images/home/home.png" class="home">
      </button>
    </div>
    -->
    <div class="page__bd" style="margin-top: 60px;">
        <div class="weui-article">

            <div class="weui-article__section">
                <div class="weui-article__section">
                    <div class="weui-article__h1 myh">
                      <div style="background: linear-gradient(120deg, transparent 45%, #f3f3f3 60%, transparent 100%);">背景介绍</div>
                      <img src="/static/images/home/like1.png">
                    </div>
                    <div class="weui-article__p">
                        宝贝回家小程序宗旨是为帮助寻找失踪儿童及一些流浪乞讨的孩子找家，为孩子家长及志愿者提供一个信息沟通的平台。  
                    </div>
                    <div class="weui-article__p">
                        项目介绍： 
                        <a href="https://bbhj.airdb.io" style="color: deepskyblue;">https://bbhj.airdb.io</a>
                    </div>
                    <div class="weui-article__p">
                      <p>目前采用 MPVue + Golang 实现， Github地址： 
                        <a style="color: deepskyblue;">https://github.com/bbhj/mina</a>
                      </p>
                      喜欢的同学，可以 Star 一下！
                    </div>
                </div>
                <div class="weui-article__section">
                    <div class="weui-article__h1 myh">
                      <div>欢迎加入</div>
                      <img src="/static/images/home/like1.png" style="opacity: .5;">
                    </div>
                    <div class="weui-article__p">
                        如果您有足够的精力、技术投入，欢迎您的加入。 需至少满足如下条件一：
                        <p>\t1. 希望您比较了解 vue、小程序等前端技术；</p>
                        <p>\t2. 希望您能够使用 Golang 编程, 有一定的代码规范；</p>
                        <p>\t3. 希望您有自己的 Github, 有一定的代码提交；</p>
                        <p>\t4. 希望您有一颗追求技术、技术公益的心。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ha></ha>
</div>
</template>

<script>
export default {
  components: {
  },
  onShareAppMessage: function () {
    return {
      title: '志愿者招募计划',
      path: '/pages/hr/main?from=forward',
      imageUrl: '/static/images/forward/home1.jpg'
    }
  }
}
</script>

<style scoped>
.page{
  position: relative;
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
  left: 142px;
  z-index: -1;
  width: 60px;
  height: 60px;
  opacity: .7;
}
</style>
