import { ASYNC_INCREMENT } from '../types/counter'
import { createAction } from 'redux-actions'

export const hello = createAction(ASYNC_INCREMENT, () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://mina.baobeihuijia.com/test/lastest/wechapi/small/reliefstation',
      header: {
        cookie: 'xxxxx'
      },
      success: function(res) {
        console.log('----api----hello', res)
        resolve(res.data)
      }
    })
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
})
