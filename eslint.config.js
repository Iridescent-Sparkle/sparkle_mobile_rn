const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  react: true,
  typescript: true,
  rules: {
    'ts/no-use-before-define': 'off',
  },
})
