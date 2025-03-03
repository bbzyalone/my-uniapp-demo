<template>
	<view>
		<view id="demo"></view>
	</view>
</template>

<script setup>
	import {
		onReady
	} from '@dcloudio/uni-app';
	import SVGA from "svgaplayerweb";
	import {
		onMounted
	} from "vue";

	onReady(() => {
		var player = new SVGA.Player('#demo');
		var parser = new SVGA.Parser('#demo');
		
		parser.load('http://file.qxcms.com/posche.svga', function(videoItem) {
		// 开始处理
		})

	})
	
</script>

<style>

</style>