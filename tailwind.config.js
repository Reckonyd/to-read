module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.vue'],
  },
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'odd', 'even', 'focus', 'hover', 'active'],
  },
  plugins: [
    function ({ addUtilities }) {
      const justifyEvenly = {
        '.justify-evenly': {
          justifyContent: 'space-evenly',
        },
      }

      addUtilities(justifyEvenly, {
        variants: ['responsive'],
      })
    },
  ],
}
