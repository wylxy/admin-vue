module.exports = {
    publicPath: "/admin-vue/",
    // 关闭线上源码
    productionSourceMap: false,

    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
          .use('babel-loader')
          .loader('babel-loader')
          .end()
          .use('vue-svg-loader')
          .loader('vue-svg-loader');
      }
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost:8081', // 基础路径
    //             changeOrigin: true, // 允许跨域
    //             pathRewrite: {
    //                 // 路径重写
    //                 '/api': ''
    //             }
    //         }
    //     }
    // }
}
