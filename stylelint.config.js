module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'screen', 'extend'],
      },
    ],
    'selector-max-id': 0,
    'unit-disallowed-list': ['px'],
  },
  overrides: [
    {
      files: ['*.html', '*.vue', '**/*.html', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
}
