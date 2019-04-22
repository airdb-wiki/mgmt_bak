import { httpget } from '@/utils/http'

export const getListb = () => {
  return httpget('/lastest/wechatapi/small/reliefstation')
}

// 获取救助站列表
export const getList = () => {
  return new Promise((resolve, reject) => {
    httpget('/lastest/wechatapi/small/reliefstation').then(res => {
      // console.log('api promise =====', res.data)
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

// 微信登录
export const weixinlogin = (prams) => {
  console.log('prams====', prams)
  return new Promise((resolve, reject) => {
    httpget('/lastest/wechatapi/user/login', prams).then(res => {
      // console.log('api promise =====', res.data)
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}
