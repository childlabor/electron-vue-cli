# electron-vue-cli
项目构建基于vue-cli3，整合了electron。实现桌面应用快速开发。

## 项目结构
```js
+---build // 应用程序打包文件
|   \---win-unpacked
|       +---locales
|       +---resources
|       \---swiftshader
+---dist // 渲染进程打包文件
|   +---css
|   +---img
|   \---js
+---public
+---src
|   +---main // 主进程
|   \---renderer // 渲染进程
|       +---assets
|       +---components
|       \---views
\---tests
    \---unit

```

## 技术栈
- electron
- vue
- vue-router
- vuex
- axios
- sass

## install
$ yarn

### 开发
$ yarn run dev

### 打包
$ yarn run build

### 热替换实现
- 主进程：nodemon
- 渲染进程：webpack-dev-server

### TODO
模块封装
- 主进程
    - 请求封装
    - 桌面通知
    - 快捷键拦截
    - 进程间通信
    - session
    - 菜单
    - 系统事项
- 渲染进程
    - 进程间通信

