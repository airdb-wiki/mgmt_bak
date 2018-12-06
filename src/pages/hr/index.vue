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
    <img src="https://wechat-1251018873.file.myqcloud.com/mina/base/icon/love-bg.png" class="bg">

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
                      <div>背景介绍</div>
                      <img src="https://wechat-1251018873.file.myqcloud.com/mina/base/icon/love-bg.png">
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
            </div>
        </div>
    </div>
    <ha></ha>
    <div class="shade" v-if="hidden" catchtouchmove='preventTouchMove'>
      <!-- <div class="t_w">
        <div class="tanchu_view">
          <div>
            <div class="bg_view">遮罩层</div>
            <div class="txtys">点击确定遮罩层</div>
            <div class="txtsure"  >
              <div class="txtsurebg" @click="conceal">
                  <text class="txtsurename">确定</text>
              </div>        
            </div>
          </div>
        </div>
      </div> -->
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
    </div>
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
/*測試版遮罩樣式*/
/* .shade{
  position:fixed;
  width:100%;
  height:100%;
  top:50px;
  background:rgba(0,0,0,0.4);
  overflow: hidden;
  } */
.t_w{
  position:relative;
  }
.tanchu_view{
  width: 80%;
  margin:25% auto;
  overflow: hidden;
  background-color: #fff1e6;
  border-radius: 10rpx;
  padding: 4rpx;
  }
 
 
.bg_view{
  margin:30rpx auto 30rpx auto;
  color:#fcb712;
  font-size:50rpx;
  background-color: #fff1e6;
  padding:0rpx 30rpx;
  text-align: center;
  }
 
 
  .txtys{
    font-size: 50rpx;
    text-align: center;
    margin-bottom: 200rpx;
  }
 
.txtsure{
 width: 100%;
 height: 100%;
 display: flex;
 justify-content: center;
 margin: 20rpx;
}
 
/*确定背景*/
.txtsurebg{
  width: 300rpx;
  height: 300rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 50rpx;
  background-color: burlywood;
   flex-direction: column;
}
 
/*确定图标*/
.txtsureimg{
  display:block;
  width:120rpx;
  height:120rpx;
}
 
/*确定文本*/
.txtsurename{
   margin-bottom: 0rpx;
   color: white;
   font-size: 70rpx;
}
 
/*右上角图标*/
.t_image{
  width:204rpx;
  height:200rpx;
  position: absolute;
  top: -6%;
  left:88%;
  }
 
/*右上角图标*/
.t_image1{
  display:block;
  width:60rpx;
  height:60rpx;
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
  }
  .container_four{
    border:solid 1px;
    width: 200px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .container_one{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .container_two{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container_three{
      display: flex;
      flex-direction: column;
      align-items: center;
   }
  .trans_text{
    margin-left: 20px;
  }
  .trans1{
    width: 150px;
    height: 50px;
    margin-left: 10px;
  }
  .trans2{
    width: 90%;
    height: 150px;
  }
  .trans3{
    width:90%;
    height: 250px;
  }
</style>
