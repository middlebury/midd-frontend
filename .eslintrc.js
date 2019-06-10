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
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  plugins: ['react'],

  settings: {
    react: {
      pragma: 'h'
    }
  },

  rules: {
    // http://eslint.org/docs/rules/
    'no-undef': 'error',
    'no-unused-vars': 'warn',

    // https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  },

  globals: {
    drupalSettings: true
  }
};
