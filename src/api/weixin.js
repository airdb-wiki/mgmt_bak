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
    }
  })
}
