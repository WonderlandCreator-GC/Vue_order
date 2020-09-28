module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        // 当前 devServer 的地址是 localhost:8080 , 需要代理的地址是 localhost:4000
        '/api': {
          target: 'http://localhost:4000', // 设置要调用的接口域名和端口号
          changeOrigin: true, // 设置是否跨域
          pathRewrite: { // 路径重写
            '^/api': ''
          }
        }
      }
    },
    resolve: {
      alias: {
        common: '@/common',
        components: '@/components',
        pages: '@/pages',
        api: '@/api'
      }
    }
  }
}
