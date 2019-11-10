const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    hot: true,
    open: false,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('tailwindcss')],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'ToRead',
      template: 'src/index.html',
    }),
    new Dotenv(),
  ],
})
