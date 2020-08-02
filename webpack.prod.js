const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsWebpackPlugin(), new TerserPlugin()],
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.postcss$/,
        include: path.resolve(__dirname, 'src'),
        use: [MiniCssExtractPlugin.loader],
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
}
