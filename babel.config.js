const corejsVersion = require('./package.json')['dependencies']['core-js']

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: { version: corejsVersion, proposals: true },
      },
    ],
  ],
}
