// const baseUrl = 'https://studygolang.com/app'
const baseUrl = 'https://scf.baobeihuijia.com/release/mina'

function request({ url, data, method }) {
  const header = {
    token: wx.getStorageSync('token') || '',
  }
  return new Promise((resove, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      data: { ...data},
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
