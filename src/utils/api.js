/*
 * @Author: your name
 * @Date: 2021-12-11 11:50:56
 * @LastEditTime: 2021-12-11 17:30:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /mp-bbhj/src/utils/api.js
 */
import HTTPREQUEST from "./http"

// Use standard REST APIs, swagger:
// https://airdb.dev/redoc/?url=https://service-iw6drlfr-1251018873.sh.apigw.tencentcs.com/test/mina/docs/swagger.json

export const API_LIST = {
    lost: '/mina/v1/lost',
    rescue: '/mina/v1/rescue',
}

export function login(params) {
    /**
     * @description 登录
     * @param {string} params.token token
     * @param {number} params.uid 中文网用户uid
     * @param {string} params.nickname 微信昵称
     * @param {string} params.avatar 微信头像
     */
    return get('/mina/v1/wechat/login', params)
}

export function checkSession(code) {
    /**
     * @description 检查登录
     * @param {string} code 小程序登录code
     */
    return get('/mina/v1/wechat/check_session', { code })
}

export function listLost(pageNo) {
    /**
     * @description 文章列表
     * @param {number} pageNo
     * @param {number} pageSize
     * @param {string} ??category
     * @param {string} ??keywords
     */
    // return get('/articles', { page_no })
    const pageSize = 10
    return HTTPREQUEST.get('/mina/v1/lost', { pageNo, pageSize })
}

export function queryLost(lost_id) {
    /**
     * @description 寻亲详情
     * @param {number} lost_id
     */
    return HTTPREQUEST.get('/mina/v1/lost/' +lost_id)
}

export function lostShareCb({lost_id, share_key}) {
    /**
     * @description 寻亲详情页转发回调
     * @param {number} lost_id 
     * @param {string} share_key
     */
    console.log(lost_id)
    console.log(share_key)

    return HTTPREQUEST.get(`/mina/v1/lost/${lost_id}/share/${share_key}/callback`)
}

export function searchLost() {
    /**
     * @description 文章详情
     * @param {number} babyid
     * @param {string} name
     * @param {string} city
     */
    return HTTPREQUEST.get('/mina/v1/lost/', { id })
}

export function listRescue(pageNo) {
    /**
     * @description 文章详情
     * @param {number} pageNo
     * @param {number} pageSize
     */
    const pageSize = 10
    return HTTPREQUEST.get('/mina/v1/rescue', { pageNo, pageSize })
}
export function queryRescue(id) {
    /**
     * @description 文章详情
     * @param {number} id
     */
    return HTTPREQUEST.get('/mina/v1/rescue/', { id })
}

export function searchRescue(city) {
    /**
     * @description 文章详情
     * @param {string} name
     * @param {string} city
     */
    return HTTPREQUEST.get('/mina/v1/rescue/', { city })
}