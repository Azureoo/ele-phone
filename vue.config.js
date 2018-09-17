module.exports = {
    // webpack配置
    // see https://github.com/vuejs/vue-cli/tree/dev/docs/config
    configureWebpack: {
        externals: {
            //前提：需要在public下面 index.html中用script标签将其脚本库导入
            "BMap": "BMap",
            // 要使用$ 则可以写 "$":'jQuery'
            "jQuery": 'jQuery'//在此处配置后 在组件中不用导
        }
    },
    devServer: {
        proxy: {
            '/api/': {
                target: 'https://h5.ele.me/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}