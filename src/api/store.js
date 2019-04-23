import {
  apiGetReliefStations,
  apiWeixinLogin
} from '@/api/data'

export default {
  stations: {
    name: 'xxx stations'
  }
}
export const getReliefStations = () => {
  return new Promise((resolve, reject) => {
    apiGetReliefStations().then(res => {
      // commit('reliefStations', res.data)
      mpvue.setStorageSync('reliefStations', res.data)
      // console.log('api promise ==store===', res.data)
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

export const weixinlogin = () => {
  return new Promise((resolve, reject) => {
    apiWeixinLogin().then(res => {
      // commit('reliefStations', res.data)
      mpvue.setStorageSync('minaAuth', res.data)
      // console.log('api promise ==store===', res.data)
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}
