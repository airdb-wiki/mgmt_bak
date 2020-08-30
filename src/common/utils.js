// eslint-disable-next-line import/prefer-default-export
export function mpAutoUpdate() {
  /**
   * @description 执行小程序自动更新
   */
  console.log('runing mp auto update')
  if (wx.canIUse('getUpdateManager')) { // 获取小程序更新机制兼容
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate((res) => { // 1. 检查小程序是否有新版本发布
      if (res.hasUpdate) { // 请求完新版本信息的回调
        // 检测到新版本，需要更新，给出提示
        wx.showModal({
          title: '更新提示',
          content: '检测到新版本，是否下载新版本并重启小程序？',
          success(res2) {
            if (res2.confirm) { // 2. 用户确定下载更新小程序，小程序下载及更新静默进行
              // eslint-disable-next-line no-use-before-define
              downLoadAndUpdate(updateManager)
            } else if (res2.cancel) { // 用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
              // wx.showModal({
              //   title: '温馨提示~',
              //   content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
              //   showCancel: false, // 隐藏取消按钮
              //   confirmText: '确定更新', // 只保留确定更新按钮
              //   success(res3) {
              //     if (res3.confirm) {
              //       // 下载新版本，并重新应用
              //       // eslint-disable-next-line no-use-before-define
              //       downLoadAndUpdate(updateManager)
              //     }
              //   }
              // })
            }
          }
        })
      }
    })
  } else {
    // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用此小程序功能，请升级到最新微信版本后重试。'
    })
  }
}

export function downLoadAndUpdate(updateManager) {
  /**
   * @description 下载小程序新版本并重启应用
   * @param {Object} updateManager
   */
  wx.showLoading()
  updateManager.onUpdateReady(() => { // 静默下载更新小程序新版本
    wx.hideLoading()
    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    updateManager.applyUpdate()
  })
  updateManager.onUpdateFailed(() => {
    wx.hideLoading()
    // 新的版本下载失败
    wx.showModal({
      title: '已经有新版本了哟~',
      content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
    })
  })
}
