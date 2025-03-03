import {
	Crypto,
	Base64
} from './bundle.js'; //引入上面的代码
// 阿里配置参数, 全部都为必须参数
const config = {
	bucketName: "qxcsc",// 你的bucketName
	accessid: "LTAI5t8tKvUSv8DBUBu7XbZN", // 你的阿里oss accessid
	accesskey: "BSahzmhP1oY50vS3tp3MUvYGaINQMB", // 你的阿里oss secret
	host: "http://file.qxcms.com", // 上传oss地址 注意地区
};
export const common = {
	formatDate: function(date, formatstr) {
		//	使用示例
		// // 年、月、日、时、分、秒
		// var date = jutils.formatDate(new Date(1634002035*1000),"YYYY-MM-DD HH:ii:ss");
		// // 2021-10-12 09:27:15
		// //年、月、日、周
		// var date = jutils.formatDate(new Date(1634002035*1000),"YYYY-MM-DD 周W");
		// //2021-10-12 周二
		// //时、分、秒
		// var date = jutils.formatDate(new Date(1634002035*1000),"HH:ii:ss");
		// //09:27:15
		var arrweek = ["日", "一", "二", "三", "四", "五", "六"];
		var str = formatstr.replace(/yyyy|YYYY/, date.getFullYear()).replace(/yy|YY/,
				common.$addZero(date.getFullYear() % 100, 2)).replace(/mm|MM/, common.$addZero(date
				.getMonth() + 1,
				2)).replace(/m|M/g, date.getMonth() + 1).replace(/dd|DD/, common.$addZero(date.getDate(), 2))
			.replace(/d|D/g,
				date.getDate()).replace(/hh|HH/, common.$addZero(date.getHours(), 2)).replace(/h|H/g,
				date.getHours()).replace(/ii|II/, common.$addZero(date.getMinutes(), 2)).replace(/i|I/g,
				date.getMinutes()).replace(/ss|SS/, common.$addZero(date.getSeconds(), 2)).replace(/s|S/g,
				date.getSeconds()).replace(/w|g/, common.$addZero(date.getDay(), 2)).replace(/W/g, arrweek[date
				.getDay()]);
		return str;
	},
	$addZero: function(v, size) {
		for (var i = 0, len = size - (v + "").length; i < len; i++) {
			v = "0" + v;
		}
		return v + ""
	},
	// 随机数
	getFileNumber: function() {
		let timeNumber = new Date().getTime()
		let randomNumber = Math.floor(Math.random() * 999999)
		return timeNumber + '' + randomNumber
	},
}
// 阿里直传
export const alUploadFile = function(path, showLoading = true) {
	return new Promise((resolve, reject) => {
		let date = new Date(new Date().getTime() + 1000 * 3600);
		let expiration = date.toISOString();
		//let expiration = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'T'+date.getHours()+':'+date.getMinutes()+':00.000Z';
		let policyText = {
			expiration, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
			"conditions": [
				["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
			]
		};
		let bucketName = config.bucketName; //你的bucketName
		let policyBase64 = Base64.encode(JSON.stringify(policyText))
		let accessid = config.accessid; //你的阿里oss accessid
		let accesskey = config.accesskey; //你的阿里oss secret
		let host = config.host; //上传oss地址
		let bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
			asBytes: true
		});
		let signature = Crypto.util.bytesToBase64(bytes); //签名
		// 在阿里云存储路径=>文件地址可根据自己需求修改 此时的文件地址: App/年月日/随机数.文件后缀
		let fileName = 'App/' + common.formatDate(new Date(), 'YYYYMMDD') + '/' + common.getFileNumber() +
			'.' + path.split('.').pop(); //文件名 注意：相同文件名会覆盖之前的文件

		if (showLoading) uni.showLoading({
			mask: true,
			title: '上传中..'
		})
		uni.uploadFile({
			url: host,
			filePath: path,
			fileType: '',
			name: 'file',
			formData: {
				name: fileName,
				key: fileName, //文件名
				policy: policyBase64, // 获取的的policy
				OSSAccessKeyId: accessid, // 的AccessKeyId
				success_action_status: '200', // 让服务端返回200,默认返回204
				signature, // 获取的的signature
			},
			success: (res) => {
				if (showLoading) uni.hideLoading()
				res.file = host + '/' + fileName
				resolve(res)
			},
			fail: (res) => {
				if (showLoading) uni.hideLoading()
				reject(false)
			}
		})
	})
}