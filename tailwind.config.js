module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue'],
  theme: {
    extend: {
      colors: {
        themeFontColor: 'var(--theme-font-color)',
        themeSecondaryFontColor: 'var(--theme-secondary-font-color)',
        themePlaceholderColor: 'var(--theme-placeholder-color)',
        directory: '#201d1d',
        light: '#fffdf7',
        dark: '#363131',
      },
    },
  },
}
