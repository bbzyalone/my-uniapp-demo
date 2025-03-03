# qying-alUpload

- 阿里云直传图片和视频
- 无需任何后台操作，前端直传
- 支持App、H5、小程序
- 提供单文件上传和多文件上传方案
- CSDN博客: [点击跳转](https://blog.csdn.net/qq_44860866/article/details/129670188) 可参考

## 使用方式
#### 一、请前往插件目录/alUpload.js中配置如下参数
``` js
const config = {
	bucketName: "",// 你的bucketName
	accessid: "", // 你的阿里oss accessid
	accesskey: "", // 你的阿里oss secret
	host: "", // 上传oss地址 注意地区
};
```
#### 二、引入
``` js
import { alUploadFile } from "@/uni_modules/qying-alUpload/js_sdk/alUpload";
```
#### 三、调用
``` js
//第一个参数uni.chooseImage返回的地址,第二个参数是否显示uni.showLoading, 不传默认为true
// 单文件上传
alUploadFile('uni.chooseImage返回的地址', true).then(res=>{
	console.log(res)
})
// 多文件上传，Promise.all
let files= [],postList = [];
// filseList: 数组Array<String>, String === uni.chooseImage返回的地址
for (let i in filseList) {
	postList.push(alUploadFile(filseList[i], true));
}
Promise.all(postList).then(res => {
	files = res.map(elem => {
		if (elem.statusCode == 200) {
			return elem.file;
		}
	});
	console.log(filse)
}).catch(err => {
	console.log(err);
});
```