module.exports = {
  plugins: ['stylelint-scss'],
  rules: {
    /**
     * Property order rules
     */

    /**
     * Sass rules
     */
    'scss/at-rule-no-unknown': true,

    'at-rule-blacklist': null,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment']
      }
    ],
    'at-rule-name-case': 'lower',
    'at-rule-name-newline-after': 'always-multi-line',
    'at-rule-name-space-after': 'always-single-line',
    'at-rule-no-unknown': null, // unset so scss plugin can handle it
    'at-rule-no-vendor-prefix': true,
    'at-rule-property-requirelist': null,
    'at-rule-semicolon-newline-after': 'always',
    'at-rule-semicolon-space-before': 'never',
    'at-rule-whitelist': null,

    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-space-after': 'always-single-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-no-empty': true,
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-opening-brace-newline-before': 'always-single-line',
    'block-opening-brace-space-after': 'always-single-line',
    'block-opening-brace-space-before': 'always',

    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-named': 'never',
    'color-no-hex': null,
    'color-no-invalid-hex': true,
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands']
      }
    ],
    'comment-no-empty': true,
    'comment-whitespace-inside': 'always',
    'comment-word-blacklist': null,
    'custom-media-pattern': null,
    'custom-property-empty-line-before': 'never',
    'custom-property-pattern': null,

    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-block-no-duplicate-properties': [
      true,
      { ignore: ['consecutive-duplicates-with-different-values'] }
    ],
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-semicolon-newline-before': null,
    'declaration-block-semicolon-space-after': null,
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-newline-after': null,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': null,
    'declaration-no-important': null,
    'declaration-property-unit-blacklist': null,
    'declaration-property-unit-whitelist': null,
    'declaration-property-value-blacklist': null,
    'declaration-property-value-whitelist': null,

    'font-family-name-quotes': 'always-where-recommended',
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': true,
    'font-weight-notation': 'numeric',
    'function-blacklist': null,
    'function-calc-no-invalid': true,
    'function-calc-no-unspaced-operator': true,
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-parentheses-newline-inside': 'always-multi-line',
    'function-parentheses-space-inside': 'never-single-line',
    'function-url-no-scheme-relative': null,
    'function-url-quotes': 'always',
    'function-url-scheme-blacklist': null,
    'function-url-scheme-whitelist': null,
    'function-whitelist': null,
    'function-whitespace-after': 'always',

    indentation: 2,

    'keyframe-declaration-no-important': true,
    'keyframes-name-pattern': null,

    'length-zero-no-unit': true,

    'max-empty-lines': 1,
    'max-nesting-depth': [
      2,
      {
        ignore: ['pseudo-classes'],
        ignoreAtRules: ['each', 'media', 'supports', 'include']
      }
    ],
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-blacklist': null,
    'media-feature-name-case': 'lower',
    'media-feature-name-no-unknown': true,
    'media-feature-name-no-vendor-prefix': null,
    'media-feature-name-value-whitelist': null,
    'media-feature-name-whitelist': null,
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    'media-query-list-comma-newline-after': 'always-multi-line',
    'media-query-list-comma-newline-before': null,
    'media-query-list-comma-space-after': 'always-single-line',
    'media-query-list-comma-space-before': 'never',

    'no-descending-specificity': null,
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-first-line': true,
    'no-empty-source': true,
    'no-eol-whitespace': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'no-missing-end-of-source-newline': true,
    'no-unknown-animations': true,
    'number-leading-zero': 'always',
    'number-max-precision': 4,
    'number-no-trailing-zeros': true,

    'property-blacklist': null,
    'property-case': 'lower',
    'property-no-unknown': true,
    'property-no-vendor-prefix': true,
    'property-whitelist': null,

    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],

    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-blacklist': null,
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-operator-whitelist': null,
    'selector-attribute-quotes': 'always',
    'selector-class-pattern': null,
    'selector-combinator-blacklist': null,
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-combinator-whitelist': null,
    'selector-descendant-combinator-no-non-space': true,
    'selector-id-pattern': null,
    'selector-list-comma-newline-after': 'always-multi-line',
    'selector-list-comma-newline-before': 'never-multi-line',
    'selector-list-comma-space-after': 'always-single-line',
    'selector-list-comma-space-before': 'never',
    'selector-max-attribute': 1,
    'selector-max-class': 2,
    'selector-max-combinators': null,
    'selector-max-compound-selectors': null,
    'selector-max-empty-lines': 0,
    'selector-max-id': 0,
    'selector-max-pseudo-class': null,
    'selector-max-specificity': null,
    'selector-max-type': null,
    'selector-max-universal': 1,
    'selector-nested-pattern': null,
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute']
      }
    ],
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-blacklist': null,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-class-whitelist': null,
    'selector-pseudo-element-blacklist': null,
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'single',
    'selector-pseudo-element-no-unknown': true,
    'selector-pseudo-element-whitelist': null,
    'selector-type-case': 'lower',
    'selector-type-no-unknown': true,
    'shorthand-property-no-redundant-values': true,
    'string-no-newline': true,
    'string-quotes': 'single',

    'time-min-milliseconds': null,

    'unit-blacklist': null,
    'unit-case': 'lower',
    'unit-no-unknown': true,
    'unit-whitelist': null,

    'value-keyword-case': 'lower',
    'value-list-comma-newline-after': 'always-multi-line',
    'value-list-comma-newline-before': 'never-multi-line',
    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never',
    'value-list-max-empty-lines': 0,
    'value-no-vendor-prefix': true
  }
};
