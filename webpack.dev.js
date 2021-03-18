/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: [
      path.resolve(__dirname, 'dist'),
      path.resolve(__dirname, 'node_modules'),
    ],
    dev: {
      publicPath: '/',
    },
    open: false,
    historyApiFallback: true,
    host: '0.0.0.0',
  },
  module: {
    rules: [
      {
        test: /\.postcss$/,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ToRead',
      template: 'src/index.html',
    }),
  ],
}
