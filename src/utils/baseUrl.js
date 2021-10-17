let BASE_URL = "https://scf.baobeihuijia.com"

const getBaseUrl = (url) => {
    // let BASE_URL = '';
    let domain = BASE_URL
    if (process.env.NODE_ENV === 'development') {
        domain += "/release"
            //开发环境 - 根据请求不同返回不同的BASE_URL
            // if (url.includes('/api/')) {
            //    BASE_URL = ''
            // } else if (url.includes('/iatadatabase/')) {
            //    BASE_URL = ''
            // }
    } else {
        // 生产环境
        domain += "/release"
    }

    return domain
}

export default getBaseUrl;