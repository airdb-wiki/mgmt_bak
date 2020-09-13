// const baseUrl = 'https://scf.baobeihuijia.com/release/mina'
const baseUrl = 'https://scf.baobeihuijia.com/release/mina/v1'

function request({ url, data, method }) {
  const header = {
    token: wx.getStorageSync('token') || '',
  }
  return new Promise((resove, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      data,
      header,
      success: (res) => {
        resove(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

function get(url, data) {
  return request({ url, method: 'get', data })
}
function post(url, data) {
  return request({ url, method: 'post', data })
}

export {
  request,
  get,
  post
}
