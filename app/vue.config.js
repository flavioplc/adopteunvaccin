module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath: process.env.BASE_URL || '/',
  css: {
    extract: true
  },
  configureWebpack: {
    // No need for splitting
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  
}