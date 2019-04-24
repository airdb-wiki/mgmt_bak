import {
  apiGetReliefStations,
  apiWeixinLogin,
  apiWeixinCodeLogin,
  apiWeixinLoginScene
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

export const weixinlogin = (parms) => {
  return new Promise((resolve, reject) => {
    apiWeixinLogin(parms).then(res => {
      // commit('reliefStations', res.data)
      mpvue.setStorageSync('minaAuth', res.data)
      console.log('api promise ==store===', res.data)
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

export const weixincodelogin = (parms) => {
  return new Promise((resolve, reject) => {
    apiWeixinCodeLogin(parms).then(res => {
      // commit('reliefStations', res.data)
      mpvue.setStorageSync('user', res.data)
      console.log('api promise ==store==code=', res.data)
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

export const weixinLoginScene = (parms) => {
  return new Promise((resolve, reject) => {
    apiWeixinLoginScene(parms).then(res => {
      // commit('reliefStations', res.data)
      mpvue.setStorageSync('scene', res.data)
      console.log('api promise ==scene=', res.data)
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}
