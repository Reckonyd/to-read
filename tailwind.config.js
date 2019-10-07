module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'focus', 'hover', 'active'],
  },
  plugins: [
    function({ addUtilities }) {
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
