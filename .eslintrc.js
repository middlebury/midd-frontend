module.exports = {
  root: true,
  parser: 'babel-eslint',

  env: {
    browser: true,
    es6: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },

  rules: {
    // http://eslint.org/docs/rules/
    'no-undef': 'error',
    'no-unused-vars': 'warn'
  },

  globals: {
    drupalSettings: true
  }
};
