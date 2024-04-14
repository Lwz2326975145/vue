const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack:{
    devServer:{
      //设置代理服务器
      proxy:{
        '/api':{
          target:'http://159.75.169.224:6300/',
          changeOrigin:true,
          pathRewrite:{'^/api':'/'}
        }
      }
    }
  }
})
