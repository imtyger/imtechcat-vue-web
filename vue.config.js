module.exports = {
  publicPath: './',
  assetsDir: 'static',
  devServer: {
    // host: 'localhost',
    host: 'localhost',
    port: 9000, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
    proxy: { // 配置自动启动浏览器
      '/api/*': {
        target: 'http://127.0.0.1:9999',
        changeOrigin: true
      }
    }
  }

}
