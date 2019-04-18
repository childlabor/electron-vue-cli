// webpack配置项 cover
module.exports = {
  configureWebpack: {
    entry: './src/renderer/main.js'
  },
  lintOnSave: false, // eslint
  publicPath: '' // 使vue构建的所有资源都使用相对路径进行链接，以便electron加载文件时能正确读取文件。
}