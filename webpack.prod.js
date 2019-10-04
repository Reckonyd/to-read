const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const purgecss = require('@fullhuman/postcss-purgecss')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsWebpackPlugin()],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
                purgecss({
                  content: ['./src/**/*.vue'],
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'ToRead',
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css',
    }),
  ],
})
