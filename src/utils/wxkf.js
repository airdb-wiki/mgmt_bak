import { openCustomerServiceChat } from '@tarojs/taro'

// 微信客服，如 https://work.weixin.qq.com/kfid/kfc02343d9ba414880a
// 一块做好事
export const WXKF_ZUOHAOSHI = "kfc02343d9ba414880a";

// 应急救援
export const WXKF_YINGJIJIUYUAN = "kfca5589323d10b770e";

// 紧急寻人
export const WXKF_JINJIXUNREN = "kfc33a33428ab9cb292";

// 心理咨询
export const WXKF_XINLIZIXUN = "kfcdcc3f68951dbed53";

// 宝贝回家客服
export const WXKF_BBHJ = "kfc5fdb2e0a1f297753";

/**
 * 打开客服聊天
 * @param {string} id 客服ID
 */
export function openCustomerService(id = WXKF_BBHJ) {
    openCustomerServiceChat({
        extInfo: { url: `https://work.weixin.qq.com/kfid/${id}?sence=mp-bbhj` },
        corpId: "wx4aaa3fe59423b402",
        success(res) {
            console.log("打开客服成功");
        },
        fail(res) {
            console.log("fail", res);
        },
    });
}