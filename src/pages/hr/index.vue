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
                      背景介绍
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
                      欢迎加入
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
  background-color: #fff;
  height: 100%;
  background-image: linear-gradient(to top, transparent 0, #fff 100%), url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541312159946&di=698558c0ce1040cedf233c39b0d1841e&imgtype=0&src=http%3A%2F%2Fpic38.photophoto.cn%2F20160311%2F0021033817789866_b.jpg');
  background-size: 1080px 1040px;
  background-position: -190px -190px;
  background-repeat: no-repeat;
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
  text-align: center;
  font-weight: bold;
  line-height: 43px;
  height: 50px;
  margin: 0px;
  background-image: linear-gradient(to top, transparent 0, #fff 100%), url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541312159946&di=698558c0ce1040cedf233c39b0d1841e&imgtype=0&src=http%3A%2F%2Fpic38.photophoto.cn%2F20160311%2F0021033817789866_b.jpg');
  background-size: 170px 140px;
  background-position: 88px -52px;
  background-repeat: no-repeat;
}
</style>
