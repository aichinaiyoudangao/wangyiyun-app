const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  transpileDependencies: true,
  devServer: {
    // proxy: 'http://localhost:3000',
    proxy: {
      '/api': { // 匹配所有以'/api'开头的请求路径
        target: 'http://localhost:3000', // 代理目标的基本路径
        changeOrigin: true, // 伪装端口，只有这个值为true的情况下 才表示开启跨域
        pathRewrite: {
          '^/api': '' // 因为真实路径中并没有/api这段, 所以要去掉这段才能拼接正确地址转发请求
        }
      }
    }
  }
  // host: '0.0.0.0',
  // port: 3000, //本地
  // open: true,
  // https: false,
  // client: {
  //   webSocketURL: 'ws://0.0.0.0:3001/ws',
  // },
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  // }
}


