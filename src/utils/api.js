import HTTPREQUEST from "./http"

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

export function listLost(pageNo=1, keyword="") {
    /**
     * @description 文章列表
     * @param {number} pageNo
     * @param {number} pageSize
     * @param {string} ??type
     * @param {string} ??keywords
     */
    // return get('/articles', { page_no })
    const pageSize = 10
    return HTTPREQUEST.get('/mina/v1/lost/list', { pageNo, pageSize, keyword})
}

export function queryLost(id) {
    /**
     * @description 文章详情
     * @param {number} id
     */
    return HTTPREQUEST.get('/mina/v1/lost/query', { id })
}

export function searchLost() {
    /**
     * @description 文章详情
     * @param {number} babyid
     * @param {string} name
     * @param {string} city
     */
    return HTTPREQUEST.get('/mina/v1/lost/search', { id })
}

export function listRescue(pageNo=1) {
    /**
     * @description 文章详情
     * @param {number} pageNo
     * @param {number} pageSize
     */
    const pageSize = 10
    return HTTPREQUEST.get('/mina/v1/rescue/list', { pageNo, pageSize})
}
export function queryRescue(id) {
    /**
     * @description 文章详情
     * @param {number} id
     */
    return HTTPREQUEST.get('/mina/v1/rescue/query', { id })
}

export function searchRescue(city) {
    /**
     * @description 文章详情
     * @param {string} name
     * @param {string} city
     */
    return HTTPREQUEST.get('/mina/v1/rescue/search', { city })
}