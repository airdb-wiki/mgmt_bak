# mina

> A MiniProgram project in Wechat base on [Tencent Wepy](https://github.com/Tencent/wepy)

## Wepy Install & Usage

[doc](https://tencent.github.io/wepy/document.html#/./doc.cli)

## Node Modules Install

``` bash
npm install
```

# Develop
``` bash
npm run dev
```

# build
``` bash
npm run build
```

## How to use weui in wepy

[wechat-applet-wepy-introduces-weui](https://laravelcode.cn/posts/63/wechat-applet-wepy-introduces-weui)


# Error Code

| Code |  Errmsg |
| ---- | ---     |
| 1002 |  获取话题数据错误 |
| 1004 |  创建回复错误    |
| 1101 |  正常显示数据错误    |
| 1301 |  列表信息错误    |


app.wpy:        content: '服务器错误，请联系管理员'
components/topicList.wpy:          content: '服务器错误，请联系管理员'
mixins/replyMixin.js:        content: '服务器错误，请联系管理员'
mixins/replyMixin.js:          content: '服务器错误，请联系管理员'
pages/auth/register.wpy:          content: '服务器错误，请联系管理员'
pages/auth/register.wpy:          content: '服务器错误，请联系管理员'
pages/auth/register.wpy:            content: '服务器错误，请联系管理员'
pages/auth/login.wpy:            content: '服务器错误，请联系管理员'
pages/auth/login.wpy:          content: '服务器错误，请联系管理员'
pages/replies/create.wpy:          content: '错误: 1004，请联系管理员'
pages/users/show.wpy:          content: '服务器错误，请联系管理员'
pages/users/edit.wpy:          content: '服务器错误，请联系管理员'
pages/users/edit.wpy:            content: '服务器错误，请联系管理员'
pages/notifications/index.wpy:          content: '服务器错误，请联系管理员'
pages/notifications/index.wpy:          content: '服务器错误，请联系管理员'
pages/topics/show.wpy:          content: '错误码: 1002，请联系管理员'
pages/topics/index.wpy:            content: '服务器错误，请联系管理员'
utils/api.js:      content: '服务器错误，请联系管理员或重试'
