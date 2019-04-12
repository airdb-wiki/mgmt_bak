<template>
	<div class="publish-card">
		<div class="publish-card__hd">
			<p @click="handleClick(publishInfo)"  class="publish-card__title"> {{ publishInfo.Title }}</p>
			<div class="publish-card__opt">
				<div v-if="!isFollow">
					<button class="weui-btn btn-follow" type="primary" @click="handleFollow(publishInfo)">+关注</button>
				</div>
				<div v-else>
				  <!-- 已关注按钮 -->
				  <button class="weui-btn btn-follow has-followed" type="primary" @click="handleFollow(publishInfo)">已关注</button>
				</div>

				<p class="text-follower">1人已关注</p>
			</div>
		</div>
		<div @click="handleClick(publishInfo)" class="publish-card__bd">
			<div class="publish-card__avatar">
				<image v-if="publishInfo.AvatarUrl" :src="publishInfo.AvatarUrl" background-size="cover" /></image>
			</div>
			<div class="publish-card__detail">
				<div class="publish-card__detail-group">
					<div class="label">姓　　名：</div>
					<div class="cont">
						<span class="text-name">{{ publishInfo.Nickname || '--' }}</span>
						<span class="text-sex" v-if=" publishInfo.Gender == 0 ">未知</span>
						<span class="text-sex" v-else-if=" publishInfo.Gender == 1 ">男</span>
						<span class="text-sex" v-else>女</span>
					</div>
				</div>
				<div class="publish-card__detail-group">
					<div class="label">生　　日：</div>
					<div class="cont">{{publishInfo.BirthedAt}}</div>
				</div>

				<div class="publish-card__detail-group">
					<div class="label">档案编号：</div>
					<div class="cont">{{publishInfo.Babyid}}</div>
				</div>

			</div>
		</div>
		<div class="publish-card__fd">
			<div class="publish-card__detail-group">
				<div class="label">失踪时间：</div>
				<div class="cont">{{ publishInfo.MissedAt }}</div>
			</div>

			<div class="publish-card__detail-group">
				<div class="label">失踪地点：</div>
				<div class="cont">{{publishInfo.MissedProvince}}{{publishInfo.MissedCity}} - {{publishInfo.MissedAddress}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: [
    'isFollow',
    'publishInfo',
    'handleClick',
    'handleFollow'
  ],
  onload: function (option) {
    console.log('publish-card====', this.publishInfo.BirthAt)
  }
}
</script>
<style>
.publish-card {
	position: relative;
	margin: 0 20rpx 25rpx;
	background: #fff;
	box-shadow: 0 0 20rpx rgba(0, 0, 0, .2);
	border-radius: 8rpx;
}	
.publish-card__hd {
	position: relative;
	height: 120rpx;
	padding: 0 180rpx 0 20rpx;
	border-bottom:2rpx solid #f5f5f5;
}
.publish-card__title {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size:34rpx;
	line-height:120rpx;
	color:#000;
}
.publish-card__opt {
	position: absolute;
	right: 0;
	top: 0;
	box-sizing: border-box;
	width: 180rpx;
	height: 120rpx;
	padding-top: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.publish-card__opt .btn-follow {
	width: 110rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0;
	font-size: 24rpx;
	border-radius: 4rpx;
	text-align: center;
	overflow: hidden;
}
.publish-card__opt .btn-follow.has-followed {
	opacity: .6;
}
.publish-card__opt .text-follower {
	margin-top: 2rpx;
	font-size: 22rpx;
	color: #aaa;
}
.publish-card__bd {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	padding: 20rpx;
}
.publish-card__avatar {
	flex: 0 0 auto;
	width: 160rpx;
	height: 160rpx;
	background: #ccc;
	border-radius: 4rpx;
	overflow: hidden;
	margin-top: 3rpx; 
}
.publish-card__avatar image {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.publish-card__detail {
	flex: 1 1 auto;
	margin-left: 20rpx;
}
.publish-card__detail-group {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	flex-wrap: nowrap;
	margin-bottom: 3rpx;
}
.publish-card__detail-group .label {
	flex: 0 0 auto;
	color: #aaa;
	white-space: nowrap;
}
.publish-card__detail-group .text-name {
	display: inline-block;
	vertical-align: middle;
	width: 200rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.publish-card__detail-group .text-sex {
	display: inline-block;
	vertical-align: middle;
	margin-left: 6rpx;
}
.publish-card__fd {
	padding: 20rpx;
}
</style>