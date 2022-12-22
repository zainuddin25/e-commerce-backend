module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    'no-template-curly-in-string': 'warn',
    'array-callback-return': 'warn',
    'curly': 'warn',
    'dot-location': [
      'warn',
      'property'
    ],
    'eqeqeq': 'warn',
    'no-alert': 'error',
    'no-else-return': 'warn',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'warn',
    'no-param-reassign': [
      'warn',
      {
        'props': true,
        'ignorePropertyModificationsFor': [
          'ctx',
          'target'
        ]
      }
    ],
    'no-return-await': 'warn',
    'no-return-assign': 'warn',
    'no-self-compare': 'warn',
    'no-sequences': 'warn',
    'no-throw-literal': 'warn',
    'no-unused-expressions': 'warn',
    'no-void': 'warn',
    'no-useless-concat': 'warn',
    'no-console': 'error',
    'array-bracket-newline': [
      'warn',
      'consistent'
    ],
    'array-bracket-spacing': [
      'warn',
      'never'
    ],
    'block-spacing': 'warn',
    'brace-style': 'warn',
    'camelcase': 'warn',
    'comma-dangle': [
      'warn',
      'always-multiline'
    ],
    'comma-spacing': 'warn',
    'comma-style': 'warn',
    'computed-property-spacing': 'warn',
    'func-call-spacing': 'warn',
    'eol-last': 'warn',
    'func-name-matching': 'warn',
    'function-call-argument-newline': [
      'warn',
      'consistent'
    ],
    'indent': [
      'off',
      2
    ],
    'linebreak-style': 'warn',
    'keyword-spacing': 'warn',
    'lines-between-class-members': 'warn',
    'no-lonely-if': 'warn',
    'no-multi-assign': 'warn',
    'no-trailing-spaces': 'warn',
    'no-whitespace-before-property': 'warn',
    'object-curly-newline': [
      'warn',
      {
        'multiline': true,
        'consistent': true
      }
    ],
    'object-property-newline': 'warn',
    'operator-linebreak': [
      'warn',
      'after'
    ],
    'padded-blocks': [
      'warn',
      'never'
    ],
    'padding-line-between-statements': [
      'warn',
      {
        'blankLine': 'always',
        'prev': '*',
        'next': 'multiline-block-like'
      },
      {
        'blankLine': 'always',
        'prev': 'multiline-block-like',
        'next': '*'
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': [
          'const',
          'let',
          'export'
        ]
      },
      {
        'blankLine': 'always',
        'prev': [
          'const',
          'let',
          'export'
        ],
        'next': '*'
      },
      {
        'blankLine': 'any',
        'prev': [
          'const',
          'let',
          'export'
        ],
        'next': [
          'const',
          'let',
          'export'
        ]
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': 'return'
      }
    ],
    'quotes': [
      'warn',
      'single',
      { 'allowTemplateLiterals': true }
    ],
    'semi': [
      'warn',
      'always'
    ],
    'semi-style': 'warn',
    'space-before-blocks': 'warn',
    'space-in-parens': 'warn',
    'space-before-function-paren': [
      'warn',
      {
        'named': 'never',
        'anonymous': 'never',
        'asyncArrow': 'always'
      }
    ],
    'space-infix-ops': 'warn',
    'space-unary-ops': 'warn',
    'switch-colon-spacing': 'warn',
    'arrow-body-style': ['warn', 'always'],
    'arrow-parens': [
      'warn',
      'as-needed',
      {
        'requireForBlockBody': true
      }
    ],
    'no-confusing-arrow': 'warn',
    'no-duplicate-imports': 'warn',
    'no-var': 'warn',
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'warn',
    'prefer-template': 'warn',
    'template-curly-spacing': 'warn'
  },
};
