const path = require('path');
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    extract: false,
  },
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue$: path.resolve(__dirname, './node_modules/vue/dist/vue.runtime.esm-bundler.js'),
      },
    },
  },
  chainWebpack: config => {
  }
})
