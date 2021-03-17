/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require('stylelint'),
    require('tailwindcss'),
    require('postcss-preset-env')({ stage: 1 }),
  ],
}
