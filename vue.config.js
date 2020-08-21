module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'common': '@/common',
        'components': '@/components',
        'pages': '@/pages',
      }
    }
  }
}