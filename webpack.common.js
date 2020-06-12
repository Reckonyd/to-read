const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, 'src'),
        use: ['vue-loader'],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
            },
          },
        ],
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
    extensions: ['.js', '.vue'],
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
  ],
}
