<template>
  <div>
  	<detail></detail>
  	<div class="footer">
  		<button class="share_btn" open-type="share">
	  		<div class="weui-label">
	  			分享给好友
	  		</div>
  	    </button>
  	    <button class="share_btn" open-type="share">
	  		<div class="weui-label">
	  			生成海报
	  		</div>
  	    </button>
  	</div>
  </div>
</template>

<script>
import detail from '@/components/detail'

export default{
  components: {
    detail
  },
  data () {
    return {
      uuid: '',
      article: {}
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('test === /detail onShareAppMessage', res.target)
    }
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/pages/detail/main?uuid=' + this.article.UUID
    }
  }
}
</script>

<style>
.footer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0rpx;
  width: 100%;
  height: 100rpx;
  background: #fff;
}
.share_btn{
  width:50%;
  background:#fff;
}
button::after{
  border: none;
  border-right: 1rpx solid #dddddd;
  border-radius: 0;
}
.weui-label{
  font-size:35rpx;
  margin-right:35px;
  margin-left:35px;
}
</style>