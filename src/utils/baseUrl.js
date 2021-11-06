import Taro from '@tarojs/taro'
const BASE_URL = "https://scf.baobeihuijia.com"

const getBaseUrl = (url) => {
    let domain = BASE_URL
    const system = Taro.getAccountInfoSync()
    switch(system.miniProgram.envVersion) {
        case 'develop':
            domain += "/test"
            break;
        case 'trial':
            domain += "/test"
            break;
        case 'release':
            domain += "/test"
            break;
    }
    return domain
}

export default getBaseUrl;