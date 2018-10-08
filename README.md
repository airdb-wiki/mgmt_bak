# Mina

> A Mpvue project

宝贝回家小程序
![宝贝回家小程序](https://github.com/bbhj/mina/blob/master/static/images/mina/8.jpg)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

------------------------------
## 一些注意事项
由于屏幕适配问题，所以在每次编译前，要修改如下代码：
* 在添加有自定义navigation（带返回和主页）的wxss文件加
```
.navigation {
  width: 100%;
  padding: 26px 0 12px 8px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
}
.btn {
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 2rpx solid #e2e2e2;
  padding: 3px 4px 3px 9px;
  margin-left: 6px;
  width: 72px;
  height: 24px;
}
.back {
  width: 24px;
  height: 24px;
}
.home {
  width: 23px;
  height: 23px;
}
```

* 在使用到可滑动的narbar时加(去除滚动条)
```
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
```

* 在dist/commom/vendor.wxss中修改
```
.navigation.data-v-31126f10 {
  position: fixed;
  width: 100%;
  height: 40px;
  padding: 30px 0 28rpx 40rpx;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: row;
}
```