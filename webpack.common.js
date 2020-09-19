const path = require('path')
const {mergeWithCustomize } = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const WebpackCdnPlugin = require('webpack-cdn-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')

const webpackConfig = env => {
  const config = env.production ? prodConfig : devConfig

  process.env.NODE_ENV = env.production ? 'production' : 'development'

  return mergeWithCustomize({
    customizeArray(a, b, key) {
      if (key === 'plugins') {
        return [...a, ...b]
      }

      if(key === 'module.rules') {
        const aArr = a.map(aRule => {
          let bRule = b.find(({ test }) => test.toString() === aRule.test.toString())

          if(!bRule) return aRule

          return {
            ...aRule,
            use: [...aRule.use, ...bRule.use]
          }
        })

        const bArr = b.filter(bRule => !a.find(aRule => aRule.test.toString() === bRule.test.toString()))

        return [...aArr, ...bArr]
      }

      return undefined
    }
  })(config, {
    entry: './src/app.ts',
    module: {
      rules: [
        {
          test: /\.vue$/,
          include: path.resolve(__dirname, 'src'),
          use: ['vue-loader'],
        },
        {
          test: /\.ts(x?)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                appendTsSuffixTo: [/\.vue$/]
              }
            },
          ],
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.postcss$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        },
        {
          test: /\.(gif|png|jpe?g)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name][contentHash].[ext]',
                outputPath: 'assets',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                disable: true,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: ['svg-sprite-loader', 'svgo-loader'],
        },
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.js', '.vue', '.svg', '.json'],
    },
    plugins: [
      new VueLoaderPlugin(),
      new FaviconsWebpackPlugin({
        logo: './src/assets/favicon.png',
        favicons: {
          appName: 'ToRead',
          appShortName: 'ToRead',
          appDescription:
            'ToRead helps readers and learners to organize their material and thoughts to a seamless space.',
          developerName: 'Thanos Valimitis',
          start_url: '/index.html',
          display: 'standalone',
          background: '#edf2f7',
          theme_color: '#9b2c2c',
          version: '1.0.0',
        },
      }),
      new WebpackCdnPlugin({
        modules: [
          {
            name: 'vue',
            var: 'Vue',
            path: 'dist/vue.runtime.global.prod.js',
            devUrl: ':name/dist/vue.global.js',
          },
          {
            name: 'vuex',
            var: 'Vuex',
            path: 'dist/vuex.global.prod.js',
            devUrl: ':name/dist/vuex.global.js',
          },
          {
            name: 'uuid',
            var: 'uuid',
            path: 'dist/umd/uuid.min.js',
          },
          {
            name: 'file-saver',
            var: 'saveAs',
            path: 'dist/FileSaver.min.js',
          },
          {
            name: 'axios',
            var: 'axios',
            path: 'dist/axios.min.js',
          },
        ],
        prod: process.env.NODE_ENV === 'production',
      }),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: ['./src/**/*.{ts,vue}', './functions/**/*.js']
        },
        typescript: {
          extensions: {
            vue: {
              enabled: true,
              compiler: '@vue/compiler-sfc'
            }
          }
        }
      })
    ],
  })
}

module.exports = webpackConfig
