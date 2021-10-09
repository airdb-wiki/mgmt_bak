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

export function checkSession(code) {
    /**
     * @description 检查登录
     * @param {string} code 小程序登录code
     */
    return get('/wechat/check_session', { code })
}

export function getArticles(pageNo) {
    /**
     * @description 文章列表
     * @param {number} pageNo
     * @param {number} pageSize
     * @param {string} ??type
     * @param {string} ??keywords
     */
    // return get('/articles', { page_no })
    const pageSize = 10
    return get('/lost/list', { pageNo, pageSize })
}

export function articleDetail(id) {
    /**
     * @description 文章详情
     * @param {number} id
     */
    return get('/article/query', { id })
}