const { defineConfig } = require('@vue/cli-service');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const dayjs = require('dayjs');
const path = require('path');
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: 'http://localhost:12345',
    proxy: "https://www.chives.asia",
    client: {
      overlay: false,
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          elementUI: {
            name: 'chunk-vant-ui',
            test: /[\\/]node_modules[\\/]vant[\\/]/,
            priority: 20,
            chunks: 'all',
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
          },
        },
      },
    },
    plugins: [
      new WebpackAssetsManifest({
        output: 'assets-manifest.json', // 输出文件名
        publicPath: true, // 包含publicPath
        writeToDisk: true, // 写入磁盘
        entrypoints: false, // 包含入口点信息
        customize(entry, original, manifest, asset) {
          // 可以自定义每个条目的格式
          return entry;
        },
        transform(assets, manifest) {
          // 记录所有文件（包括复制的public文件）
          const allFiles = manifest.compiler?.compilation?.assets || {};
          Object.keys(allFiles).forEach((file) => {
            if (!assets[file]) {
              assets[file] = `${manifest.getPublicPath()}${file}`;
            }
          });

          return assets;
        },
      }),
      new WebpackAssetsManifest({
        output: 'version.json', // 输出文件名
        publicPath: true, // 包含publicPath
        writeToDisk: true, // 写入磁盘
        entrypoints: false, // 包含入口点信息
        customize(entry, original, manifest, asset) {
          // 可以自定义每个条目的格式
          return entry;
        },
        transform(assets, manifest) {
          return {
            version: dayjs().format('YYYYMMDDHHmmss'),
          };
        },
      }),
    ],
  },
  chainWebpack: (config) => {
    config.output.filename('[name].[contenthash:8].js').end();
    config.output.chunkFilename('[name].[contenthash:8].js').end();

    // 获取当前的环境变量
    const isProduction = process.env.NODE_ENV === 'production';

    // 根据环境变量修改HTML插件的配置
    config.plugin('html').tap((args) => {
      // 设定HTML模板的路径
      args[0].template = isProduction ? path.resolve(__dirname, 'public/index.html') : path.resolve(__dirname, 'public/index-dev.html');
      return args;
    });
  },
});
