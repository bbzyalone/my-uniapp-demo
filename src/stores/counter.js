import {
	defineStore
} from 'pinia';

export const useCounterStore  = defineStore('counter', {
	state: () => ({
		count: 1
	}),
	actions: {
		increment() {
			this.count++;
		},
	},
})

export const userInfoStore = defineStore('userInfo',{
	state: ()=>({
		data: uni.getStorageSync("userInfo")
	})
})