import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

export const HTTP_STATUS = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    CLIENT_ERROR: 400,
    AUTHENTICATE: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
}

/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
    let pages = Taro.getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let url = currentPage.route
    return url
}

export const pageToLogin = () => {
    let path = getCurrentPageUrl()
    if (!path.includes('login')) {
        Taro.navigateTo({
            url: "/pages/login/login"
        });
    }
}
class httpRequest {

    baseOptions(params, method = "GET") {
        let { url, data } = params;
        const BASE_URL = getBaseUrl(url);
        let contentType = "application/json";
        contentType = params.contentType || contentType;
        const option = {
            url: BASE_URL + url,
            data: data,
            method: method,
            header: {
                'content-type': contentType,
                'Authorization': Taro.getStorageSync('Authorization')
            }
        };
        return Taro.request(option);
    }

    get(url, data) {
        let option = { url, data };
        return this.baseOptions(option);
    }

    post(url, data, contentType) {
        let params = { url, data, contentType };
        return this.baseOptions(params, "POST");
    }

    put(url, data) {
        let option = { url, data };
        return this.baseOptions(option, "PUT");
    }

    delete(url, data) {
        let option = { url, data };
        return this.baseOptions(option, "DELETE");
    }

}

export default new httpRequest()