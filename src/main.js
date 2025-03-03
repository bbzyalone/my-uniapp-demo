// import GoEasy from './lib/goeasy.esm.min.js'
// import GRTC from './lib/goeasy-rtc.esm.min.js' //引入GRTC SDK

import {
	createSSRApp
} from "vue";
import App from "./App.vue";

import * as Pinia from 'pinia';


//初始化GoEasy，GRTC依赖GoEasy
// GoEasy.init({
// 	host: 'hangzhou.goeasy.io', //若是新加坡区域：singapore.goeasy.io
// 	appkey: 'BC-8ef0913ef79c4dd6b65d10c279cc5a51', // common key,
// 	modules: ['im'],
// 	// true表示支持通知栏提醒，false则表示不需要通知栏提醒
// 	allowNotification: true //仅有效于app,小程序和H5将会被自动忽略
// });

// //初始化GRTC
// GRTC.init(GoEasy);

// //挂载为全局对象，便于在其他页面使用
// uni.$GoEasy = GoEasy;
// uni.$GRTC = GRTC;

export function createApp() {
	const app = createSSRApp(App);
	app.use(Pinia.createPinia());
	return {
		app,
		Pinia,
	};
}