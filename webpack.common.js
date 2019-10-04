const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/app.js',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), new Dotenv()],
}
