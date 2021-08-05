const path = require('path')

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
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
}
