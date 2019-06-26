module.exports = {
  lintOnSave: false,
  productionSourceMap:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:4000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
