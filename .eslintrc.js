module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  extends: ['standard'],
  rules: {
    'standard/object-curly-even-spacing': [0, 'either'],
    'spaced-comment': 'error',
    // allow async-await
    'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
