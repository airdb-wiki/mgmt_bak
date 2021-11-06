import Taro from '@tarojs/taro'
export function mpAutoUpdate() {
    /**
     * @description 执行小程序自动更新
     */
    console.log('runing mp auto update')
    if (Taro.canIUse('getUpdateManager')) { // 获取小程序更新机制兼容
        const updateManager = Taro.getUpdateManager()
        updateManager.onCheckForUpdate((res) => { // 1. 检查小程序是否有新版本发布
            console.log(' update==>',res)
            if (res.hasUpdate) { // 请求完新版本信息的回调
                // 检测到新版本，需要更新，给出提示
                Taro.showModal({
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
        Taro.showModal({
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
     Taro.showLoading()
    updateManager.onUpdateReady(() => { // 静默下载更新小程序新版本
        Taro.hideLoading()
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(() => {
        Taro.hideLoading()
            // 新的版本下载失败
        Taro.showModal({
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
        })
    })
}


export function ParseTime(time, cFormat) {
    /**
     * @description 格式化时间
     * @param {Object} ParseTime
     */
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (typeof time === 'string') {
            if (/^[0-9]+$/.test(time)) {
                time = parseInt(time)
            }
            // 处理特殊的多余字符串 - GOLANG 中默认JSON 序列化-> 2020-05-06T12:12:12.555Z
            time = time.replace('T', ' ')
            time = time.replace('Z', '')
                //处理IOS中不兼容问题 对于字符串的格式有要求 必须 yyyy/mm/dd 或者 yyyy/mm/dd hh:MM:ss
            time = time.replace(/-/g, '/')
            if (time.indexOf('.') > -1) { // 2020/05/06 12:12:12.555 -> 2020/05/06 12:12:12
                time = time.substring(0, time.indexOf('.'))
            }
        }
        if (typeof time === 'number' && time.toString().length === 10) {
            time *= 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
            // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return timeStr
}