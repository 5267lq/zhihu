const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
const ENV = process.env.NODE_ENV
module.exports = defineConfig({
  // 本后台不支持CORS跨域请求，请客户端基于Proxy跨域代理实现
  lintOnSave: ENV !== 'production',
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
})
