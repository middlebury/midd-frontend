module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['xo/esnext', 'xo/browser', 'prettier'],
  plugins: ['react', 'prettier'],
  globals: {
    drupalSettings: true
  },
  settings: {
    // set JSX pragma to h for Preact
    react: {
      pragma: 'h'
    }
  },
  // View all possible rules at http://eslint.org/docs/rules/
  rules: {
    // enable eslint to output prettier conflicts based on the prettierconfig
    'prettier/prettier': 'error',

    // override xo
    'capitalized-comments': 'off',

    'no-console': 'error',
    'no-return-assign': 'off',

    // Set Preact settings via react plugin
    // https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
};
