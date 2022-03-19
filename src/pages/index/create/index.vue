<template>
	<view class="content">
		<view class="row-item">
			<label for="" class="item-left">姓名</label>
			<view class="item-right">
				<input type="text" class="name-input" placeholder="请输入" :value="userData.name" @input="onInput('name')">
			</view>
		</view>
        <view class="row-item">
			<picker mode="selector" style="width:100%" :value="sex" header-text="选择性别" range-key="title" :range="sexArray" @change="bindSexChange">
				<view class="flex">
					<label for="" class="item-left">性别</label>
					<view class="item-right">
						<block v-if="userData.genders">
							<view class="text">{{userData.genders}}</view>
						</block>
						<block v-else>
							<view class="no-text">请选择</view>
						</block>
						<u-icon name="arrow-right" class="ml-20" color="#ccc" size="28"></u-icon>
					</view>
				</view>
			</picker>
		</view>
        <view class="row-item">
			<picker mode="date" style="width:100%" :value="born" header-text="选择出生日期" start="1949-01-01" end="2099-09-01" @change="bindDateChange">
				<view class="flex">
					<label for="" class="item-left">出生日期</label>
					<view class="item-right">
						<block v-if="!userData.times">
							<view class="no-text">请选择</view>
						</block>
						<block v-else>
							<view class="text">{{userData.times}}</view>
						</block>
						<u-icon name="arrow-right" class="ml-20" color="#ccc" size="28"></u-icon>
					</view>
				</view>
			</picker>
		</view>
		<view class="row-item">
			<picker mode="date" style="width:100%" :value="lose" header-text="选择失踪时间" start="1949-01-01" end="2099-09-01" @change="bindDateChange">
				<view class="flex">
					<label for="" class="item-left">失踪时间</label>
					<view class="item-right">
						<block v-if="!userData.times">
							<view class="no-text">请选择</view>
						</block>
						<block v-else>
							<view class="text">{{userData.times}}</view>
						</block>
						<u-icon name="arrow-right" class="ml-20" color="#ccc" size="28"></u-icon>
					</view>
				</view>
			</picker>
		</view>
        <view class="row-item">
			<picker mode="region" style="width:100%" :value="city" header-text="选择省市" start="1949-01-01" end="2099-09-01" @change="bindDateChange">
				<view class="flex">
					<label for="" class="item-left">所在地区</label>
					<view class="item-right">
						<block v-if="!userData.city">
							<view class="no-text">请选择</view>
						</block>
						<block v-else>
							<view class="text">{{userData.city}}</view>
						</block>
						<u-icon name="arrow-right" class="ml-20" color="#ccc" size="28"></u-icon>
					</view>
				</view>
			</picker>
		</view>
        <view class="row-item" style="height:auto">
            <view style="width:100%">
                <label for="" class="item-left">详细地址</label>
                <view class="textarea-wrap">
                    <textarea placeholder="请在此处添加详细地址" :value="userData.address" @input="onInput('address')"></textarea>
                </view>
            </view>
        </view>
        <view class="row-item">
			<label for="" class="item-left">失踪时身高</label>
			<view class="item-right">
				<input type="text" class="name-input" placeholder="请输入" :value="userData.height" @input="onInput('height')">
			</view>
		</view>
        <view class="row-item" style="height:auto">
            <view style="width:100%">
                <label for="" class="item-left">特征</label>
                <view class="textarea-wrap">
                    <textarea placeholder="请在此处添加～" :value="userData.feature" @input="onInput('feature')"></textarea>
                </view>
            </view>
        </view>
        <view class="row-item" style="height:auto">
            <view style="width:100%">
                <label for="" class="item-left">走失者照片上传（最多9张）</label>
                <!-- <view class="textarea-wrap">
                    <textarea placeholder="请在此处添加～" :value="userData.sign" @input="onInputMark"></textarea>
                </view> -->
                <view class="pic-wrap">
                    <block v-if="userData.photos.length < 9">
                        <view class="pic-add"></view>
                    </block>
                    <block v-for="(item, index) in userData.photos" :key="index" >
                        <view class="pic-item">
                            <image :src="item"  class="pic-img"/>
                        </view>
                    </block>
                </view>
                
            </view>
        </view>
        <view class="row-item">
			<label for="" class="item-left">信息来源</label>
			<view class="item-right">
				<input type="text" class="name-input" placeholder="请输入" :value="userData.source" @input="onInput('source')">
			</view>
		</view>
        <view class="row-item">
			<label for="" class="item-left">跟踪志愿者</label>
			<view class="item-right">
				<input type="text" class="name-input" placeholder="请输入" :value="userData.director" @input="onInput('director')">
			</view>
		</view>
		<view class="detail-operation" id="bottomWrap">
			<view class="btn" @click="setData">确认</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userData:{
                name: '',
                sex: '',
                born: '',
                lose: '',
                city: '',
                address: '',
                height: '',
                feature: '',
                photos: [],
                source: '',
                director: ''
			},
			
            // picker sex数据
			sexArray: [
				{
					id: 0,
					title: '女'
				},
				{
					id: 1,
					title: '男'
				}
			]
		}
	},
	methods:{
		// 输入名字
		onInput(e){
			this.userData.enterpriseName = e.detail.value
		},
		// 选择性别
		bindSexChange(e) {
			this.userData.genders = this.sexArray[e.detail.value].title
		},
		// 选择出生日期
		bindDateChange(e) {
			this.userData.times = e.detail.value
		},
		// 输入签名
		onInputMark(e) {
			this.userData.sign = e.detail.value
			console.log(this.userData)
		},
		// 提交信息
		setData(){
			if(!this.userData.enterpriseName){
				uni.showToast({
					title: '名字不能为空',
					duration:1500,
					icon:'none'
				})
				return false
			}
			if(this.userData.genders == '请选择性别'){
				uni.showToast({
					title: '请选择性别',
					duration:1500,
					icon:'none'
				})
				return false
			}
			if(this.userData.times == '请选择生日'){
				uni.showToast({
					title: '请选择生日',
					duration:1500,
					icon:'none'
				})
				return false
			}
            let data = {
                avatar:this.userData.avatar,
                born:this.userData.times+' 00:00:00',
                name:this.userData.enterpriseName,
                sex:this.userData.genders == '男' ? 1 : 0,
                typeId: this.userData.cascadeId,
                sign:this.userData.sign
            }
            this.$request(this.commonApi.petAdd,'POST',data,'application/json').then(res=>{
                console.log(res)
                let items = res.data
                if (items.code !== 200) {
                    uni.showToast({
                        title: items.msg,
                        icon: 'none'
                    })
                } else {
                    uni.showToast({
                        title: '录入成功',
                        icon: 'none',
                        duration: 1500,
                        success: () => {
                            
                        }
                    })
                }
            })
		},
		confirm(e){
			this.userData.genders = e[0].label
		},
		getTime(e){
			this.userData.times = e.result
		},
		
	},
	onLoad(option) {
		
		
	}
};
</script>

<style lang="less">
	.content {
		width: 100%;
		// padding: 0 30rpx;
		position: relative;
        padding-bottom: 240rpx;
		.row-item{
			position: relative;
			width: 100%;
			padding: 0 30rpx;
		    box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.flex{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.item-left{
				height: 110rpx;
				line-height: 110rpx;
				flex-shrink: 0;
				font-size: 30rpx;
				font-weight: 500;
				color: #000000;
			}
			.item-right{
				height: 110rpx;
				line-height: 110rpx;
				display: flex;
				align-items: center;
				.avatar{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					background: #f4f4f4;
				}
				.no-text{
					font-size: 30rpx;
					color: #A0A0A0;
					line-height: 43rpx;
				}
				.text{
					font-size: 30rpx;
					color: #333;
					line-height: 43rpx;
				}
				.name-input{
					text-align: right;
					line-height: 110rpx;
					height: 110rpx;
					padding-right: 10px;
				}
				.ml-20{
					margin-left: 20rpx;
				}
			}
			.textarea-wrap{
				margin-top: 20rpx;
				width: 100%;
				textarea{
					width: 100%;
				}
			}
			&:active{
				background: #f4f4f4;
			}
			&::after{
				position: absolute;
				bottom: 0;
				left: 30rpx;
				right: 30rpx;
				height: 1px;
				background: #f4f4f4;
				content: '';
			}
            // 照片容器
            .pic-wrap{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                margin-bottom: 40rpx;
                // 上传图片
                .pic-add{
                    position: relative;
                    width: 130rpx;
                    height: 130rpx;
                    background: #f4f4f4;
                    border-radius: 12rpx;
                    box-sizing: border-box;
                    &::before, &::after{
                        position: absolute;
                        content: '';
                        background: #999;
                        border-radius: 8rpx;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    &::before{
                        width: 50rpx;
                        height: 6rpx;
                    }
                    &::after{
                        width: 6rpx;
                        height: 50rpx;
                    }
                }
                .pic-item{
                    width: 130rpx;
                    height: 130rpx;
                    border-radius: 8rpx;
                    overflow: hidden;
                    .pic-img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
		}
		.row-item:last-child::after{
			background: #fff;
		}
		.detail-operation {
			width: 100%;
			background: #ffffff;
			position: fixed;
			bottom: 0;
			left: 0;
            z-index: 99;
            padding-top: 20rpx;
            padding-bottom: 36rpx;
            box-shadow: 0 0 20rpx 0 rgba(0,0,0,0.06);
			.btn{
				width: 650rpx;
				height: 92rpx;
				line-height: 92rpx;
				text-align: center;
				background: #ED2339;
				border-radius: 46rpx;
				margin: 0 auto;
				color: #fff;
				font-size: 30rpx;
				// margin-bottom: 30rpx;
			}
		}
	}
</style>
