const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.js$/,
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
        test: /\.css$/,
        use: [
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.vue'],
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
