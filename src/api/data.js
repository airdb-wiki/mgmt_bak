import { get } from '@/utils/http'

export function getList () {
  var ret
  get('/lastest/wechatapi/small/reliefstation').then((res) => {
    console.log('api/data getList function=========', res)
    ret = res.data
  })
  return ret
  // return axios({
  //   method: 'get',
  //   url: url,
  //   params: params
  // })
}
