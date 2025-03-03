<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title}}</text>
			<text>Current Count: {{ counter.count }}</text>
			
		</view>
		<view>用户信息： {{ userInfo.data.name }}</view>
		<!-- #ifdef MP -->
		<button @click="login()">小程序登录demo</button>
		<!-- #endif -->
		<!-- #ifdef APP -->
		<button @click="orderPay()">app支付demo</button>
		<!-- #endif -->

		<button type="default" @click="updateStore()">更新数据缓存</button>
<!-- 		<button type="default" @click="selectImages()">测试按钮</button> -->
		
		<!-- 跳转至动画页面 -->
		<button type="default" @click="selectImages()">跳转至动画</button>

	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		alUploadFile
	} from "@/uni_modules/qying-alUpload/js_sdk/alUpload";

	import {
		ref,
		onMounted
	} from 'vue'
	const title = ref('麻了 麻了')

	import {
		useCounterStore,
		userInfoStore
	} from '@/stores/counter'
	
	onLoad(() => {
		uni.setStorageSync("userInfo", {
			"name": "王轲强",
			"age": 29
		})
	})
	
	const counter = useCounterStore()
	const userInfo = userInfoStore()
	
	function updateStore(){
	console.log("更新数据测试");
		//userInfo.data=
	}
	
	function selectImages() {
		// uni.chooseImage({
		// 	complete(res) {
		// 		let tempFilePath = res.tempFilePaths[0];
		// 		console.log("选择的图片", tempFilePath)
		// 		alUploadFile(tempFilePath).then(res => {
		// 			console.log(res)
		// 		})
		// 	}
		// })
		uni.navigateTo({
			url: '/pages/index/demo1/demo1'
		})
	}

	onMounted(() => {
		getLocation()
	})

	function getLocation() {
		uni.getLocation({
			type: 'wgs84',
			success: function(res) {
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
			}
		})
	}
	// #ifdef APP
	const orderPay = () => {
		uni.request({
			method: 'POST',
			url: 'http://192.168.1.95:5005/ali-pay/appPay', //支付参数获取api
			success(res) {
				console.log('支付参数获取api回参：', res.data)
				//唤起支付宝支付
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: res.data.data,
					success(res) {
						console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				})
			}
		})
	}
	// #endif

	// #ifdef MP
	const login = () => {
		uni.login({
			success(res) {
				console.log('登录成功', res)
				var wxMaCode = res.code
				uni.request({
					method: 'POST',
					url: 'http://192.168.1.95:5001/login/login',
					data: {
						"loginType": "WX_MA",
						"wxMaCode": wxMaCode,
						"device": "ANDROID",
						"terminal": "APP",
						"regionCode": "123"
					},
					success(res) {
						console.log('登录回参', res)
					}
				})
			}
		})
	}
	// #endif
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>