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
    </div>

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

    <div class="page__bd">
        <div class="weui-article">
            
            <div class="weui-article__h1">
                <navigator open-type="navigateBack">加入我们</navigator>
            </div>

            <div class="weui-article__section">
                <div class="weui-article__section">
                    <div class="weui-article__h3">1. 背景介绍</div>
                    <div class="weui-article__p">
                        宝贝回家小程序宗旨是为帮助寻找失踪儿童及一些流浪乞讨的孩子找家，为孩子家长及志愿者提供一个信息沟通的平台。  
                    </div>
                    <div class="weui-article__p">
                        项目介绍： <a href="https://bbhj.airdb.io">https://bbhj.airdb.io</a>
                    </div>
                    <div class="weui-article__p">
                      目前采用 MPVue + Golang 实现， Github地址： https://github.com/bbhj/mina
                    </div>
                </div>
                <div class="weui-article__section">
                    <div class="weui-article__h3">2. 欢迎加入</div>
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
</div>
</template>

<script>
export default {
  components: {
  },
  onShareAppMessage: function () {
    return {
      title: '志愿者招募计划',
      // imageUrl: '/static/images/home/home.png',
      path: '/pages/hr/main?from=forward'
    }
  }
}
</script>

<style>
.navigation{
  width: 100%;
  padding: 36px 0 16px 4px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
}
.btn{
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 3px 4px 3px 5px;
  margin-left: 6px;
  width: 70px;
  height: 24px;
}
.back{
  width: 24px;
  height: 24px;
}
.home{
  width: 23px;
  height: 23px;
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
</style>
