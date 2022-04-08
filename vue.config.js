
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    publicPath: './',

    devServer: {
        port: 3001
    },

    transpileDependencies: true,
    
    configureWebpack: (config) => {
        config.externals = {
            L2Dwidget: "L2Dwidget"
        }
    }
})
