import { get, post } from '../utils/request'

export function getTotic(params) {
  /**
    * @description 获取主题
    * @param {string} tab 顶部tab，如果全部，可不传或all，其他使用 node name
    * @param {number} p 第几页，不传代表第1页
    */
  return get('/topics', params)
}
export function getToticDetail(tid) {
  /**
    * @description 获取主题详情
    * @param {number} tid 主题id
    */
  return get('/topic/detail', { tid })
}

export function checkSession(code) {
  /**
    * @description 检查登录
    * @param {string} code 小程序登录code
    */
  return get('/wechat/check_session', { code })
}

export function register(params) {
  /**
    * @description 注册系统账号并绑定
    * @param {string} params.unbind_token
    * @param {string} params.username 用户名
    * @param {string} params.email 邮箱
    * @param {string} params.passwd 密码
    * @param {string} params.pass2 确认密码
    * @param {string} params.userInfo 小程序 wx.getUserInfo 返回的 userInfo，json 格式原样传过来
    */
  return post('/wechat/register', params)
}

export function login(params) {
  /**
    * @description 登录
    * @param {string} params.token token
    * @param {number} params.uid 中文网用户uid
    * @param {string} params.nickname 微信昵称
    * @param {string} params.avatar 微信头像
    */
  return get('/wechat/login', params)
}

export function getArticles(p) {
  /**
    * @description 文章列表
    * @param {number} p token
    */
  return get('/articles', { p })
}

export function articleDetail(id) {
  /**
    * @description 文章详情
    * @param {number} id
    */
  return get('/article/detail', { id })
}

export function getSources(p) {
  /**
    * @description 资源列表
    * @param {number} p
    */
  return get('/resources', { p })
}

export function getSourceDetail(id) {
  /**
    * @description 资源详情
    * @param {number}  id
    */
  return get('/resource/detail', { id })
}

export function getProjects(p) {
  /**
    * @description 项目列表
    * @param {number} p
    */
  return get('/projects', { p })
}

export function getProjectDetail(id) {
  /**
    * @description 项目详情
    * @param {number} id
    */
  return get('/project/detail', { id })
}

export function comment(objid, data) {
  /**
    * @description 提交评论
    * @param {number} objid
    * @param {number} data.objtype 0-主题；1-文章；2-资源；3-wiki；4-开源项目；5-图书；
    * @param {string} data.content
    */
  return post(`comment/${objid}`, data)
}
