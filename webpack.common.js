const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/app.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    absoluteRuntime: false,
                    corejs: false,
                    helpers: true,
                    regenerator: true,
                    useESModules: false,
                  },
                ],
              ],
            },
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
        test: /\.vue$/,
        use: ['vue-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.vue'],
  },
  plugins: [new VueLoaderPlugin()],
}
