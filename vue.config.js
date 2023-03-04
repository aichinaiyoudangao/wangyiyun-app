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
    host: '0.0.0.0',
    port: 3000,
    client: {
      webSocketURL: 'ws://0.0.0.0:3001/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  // devServer: {
  //   proxy: {
  //     // http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html
  //     '/api': { // 请求相对路径以/api开头的, 才会走这里的配置
  //       target: 'http://localhost:3000', // 后台接口域名 我们要代理的真实的接口地址
  //       changeOrigin: true, // 改变请求来源(欺骗后台你的请求是从http://c.m.163.com)
  //       pathRewrite: {
  //         '^/api': '' // 因为真实路径中并没有/api这段, 所以要去掉这段才能拼接正确地址转发请求
  //       }
  //     }
  //   }
  // }


}
