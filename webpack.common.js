const path = require('path')
const { DefinePlugin } = require('webpack')
const { mergeWithRules } = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')

const commonConfig = {
  entry: './src/app.ts',
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          idHint: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.ts$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.postcss$/,
        use: [
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(png|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash][ext]',
        },
        include: path.resolve(__dirname, 'src/assets/img'),
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash][ext]',
        },
        include: path.resolve(__dirname, 'src/assets/svg'),
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
    new DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(false),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
    new VueLoaderPlugin(),
    new ESLintPlugin({ files: ['./src/**/*.{ts,vue}'] }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        extensions: {
          vue: {
            enabled: true,
            compiler: '@vue/compiler-sfc',
          },
        },
      },
    }),
    new SVGSpritemapPlugin(
      path.resolve(__dirname, 'src/assets/svg/sprites/**/*.svg'),
    ),
    new HtmlWebpackPlugin({
      title: 'ToRead',
      template: 'src/index.html',
      favicon: path.resolve(__dirname, 'src/static/favicon.ico'),
      minify: true,
    }),
  ],
  performance: {
    hints: 'warning',
  },
}

module.exports = () =>
  mergeWithRules({
    module: {
      rules: {
        test: 'match',
        use: 'prepend',
      },
    },
  })(
    commonConfig,
    process.env.NODE_ENV === 'development' ? devConfig : prodConfig,
  )
