/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
/* eslint-disable indent */
import wepy from 'wepy'
// import tip from './tip'
const baseUrl = 'https://mina.baobeihuijia.com/v1/'
const wxRequest = async (params = {}, url, loadingNoShow) => {
	// if (!loadingNoShow) {
	// 	tip.loading()
	// }
	let data = params.query || {}
	let header = params.header || {
		'Content-Type': 'application/json'
	}
	try {
		let res = await wepy.request({
			url: baseUrl + url,
			method: params.method || 'POST',
			data: data,
			header: header
		})
		// if (!loadingNoShow) {
		// 	tip.loaded()
		// }
		return res
	} catch (err) {
		// tip.loaded()
		// var getErr = err.errMsg
		// getErr = getErr.replace('request:fail', '')
		// await tip.confirm(getErr, false)
		wx.navigateBack({
			delta: 1
		})
		return err
	}
}
const httpRequest = function(options) {
	wepy.request({
		url: baseUrl + options.url,
		data: options.data,
		method: options.method == 'POST' || options.method == 'post' ? 'POST' : 'GET',
		header: {
			'content-type': 'application/json' // 默认值
		},
		success: function(res) {
			console.log('http success--->', res)
			if (res.statusCode == 200) {
				options.success(res.data)
			} else {
				options.fail(res)
			}
		},
		fail: function(error) {
			options.fail(error)
			console.log('http fail--->', error)
		}
	})
}
module.exports = {
	baseUrl,
	wxRequest,
	httpRequest
}
