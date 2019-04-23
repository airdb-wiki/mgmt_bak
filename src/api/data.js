import axios from '@/utils/http'

export function get (url, params) {
  return axios({
    method: 'get',
    url: url,
    params: params
  })
}

export function post (url, parms) {
  return axios({
    method: 'post',
    url: url,
    data: parms
  })
}

// 获取救助站列表
export const apiGetReliefStations = (parms) => {
  return axios({
    method: 'get',
    url: '/lastest/wechatapi/small/reliefstation',
    data: parms
  })
}

// 微信登录
export const apiWeixinlogin = (parms) => {
  return axios({
    method: 'post',
    url: '/lastest/wechatapi/small/user/login',
    data: parms
  })
}

// 获取失踪信息预览
export const apiGetArticleSummary = (parms) => {
  return axios({
    method: 'get',
    url: '/lastest/wechatapi/small/article/summary',
    data: parms
  })
}

// 获取失踪人员关联图片
export const apiGetImage = (parms) => {
  return axios({
    method: 'get',
    url: '/lastest/wechatapi/small/image/getList',
    data: parms
  })
}

// 志愿者相关接口
export const apiVolunteer = (parms) => {
  return axios({
    method: 'post',
    url: '/lastest/wechatapi/small/volunteer/add',
    data: parms
  })
}

// 获取失踪信息
export const apiArticle = (parms) => {
  return axios({
    method: 'get',
    url: '/lastest/wechatapi/small/article',
    data: parms
  })
}

// 获取评论
export const apiComment = (parms) => {
  return axios({
    method: 'get',
    url: '/lastest/wechatapi/small/comment',
    data: parms
  })
}

// 增加访问记录
export const apiUpdateCount = (parms) => {
  return axios({
    method: 'get',
    url: '/lastest/wechatapi/small/article/updateCount',
    data: parms
  })
}

// 获取热词
export const apiKeywords = (parms) => {
  return axios({
    method: 'get',
    url: '/lastest/wechatapi/small/article/keywords',
    data: parms
  })
}
