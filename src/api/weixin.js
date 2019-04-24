export const weixinSetting = () => {
  mpvue.getSetting({
    success: res => {
      let setting = {
        userInfo: res.authSetting['scope.userInfo'],
        userLocation: res.authSetting['scope.userLocation'],
        address: res.authSetting['scope.address'],
        invoiceTitle: res.authSetting['scope.invoiceTitle'],
        werun: res.authSetting['scope.werun'],
        record: res.authSetting['scope.record'],
        writePhotosAlbum: res.authSetting['scope.writePhotosAlbum'],
        camera: res.authSetting['scope.camera']
      }
      mpvue.setStorageSync('setting', setting)
      mpvue.setStorageSync('aaaa', res)
    }
  })
}

export const weixinGetSystemInfo = () => {
  // 获取系统信息
  wx.getSystemInfo({
    success: function (res) {
      try {
        mpvue.setStorageSync('systemInfo', res)
      } catch (e) {
        console.log('weixinGetSystemInfo failed App.vue')
      }
    }
  })
}

export const weixinGetNetworkType = () => {
  // 用户网络类型
  wx.getNetworkType({
    success: function (res) {
      try {
        // loginInfo['networkType'] = res.networkType
        console.log('----network----', res)
      } catch (e) {
        console.log('getNetworkType failed App.vue')
      }
    }
  })
}

// 此方法使用前需要判断微信是否有授权
export const weixinGetLocation = () => {
  // 获取用户经纬度
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      try {
        console.log('userLocation', res)
      } catch (e) {
        console.log('getLocation failed App.vue')
      }
    }
  })
}
