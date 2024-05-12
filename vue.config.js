const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 指定启动端口为 8625
  devServer: {
    port: 8625
  }
})
