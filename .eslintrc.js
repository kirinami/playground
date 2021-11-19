module.exports = {
  root: true,

  extends: [
    'airbnb-base',
    'airbnb-typescript/base',

    'plugin:@typescript-eslint/recommended',
  ],

  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },

  rules: {
    'no-empty-pattern': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-confusing-arrow': 'off',
    'no-multiple-empty-lines': [
      'error', {
        max: 1,
        maxBOF: 0,
        maxEOF: 1,
      },
    ],
    'max-classes-per-file': 'off',
    'prefer-destructuring': 'off',
    'class-methods-use-this': 'off',
    'object-curly-newline': ['error', {
      'multiline': true,
      'consistent': true,
    }],
    'prefer-arrow-callback': ['error', {
      'allowNamedFunctions': true,
      'allowUnboundThis': true,
    }],
    'max-len': ['error', 128, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'arrow-parens': ['error', 'as-needed', {
      requireForBlockBody: true,
    }],
    'arrow-body-style': 'warn',

    'import/prefer-default-export': 'off',
    'import/extensions': 'off',

    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/indent': ['error', 2, {
      SwitchCase: 1,
      ignoreComments: true,
      ignoredNodes: [
        'FunctionExpression > .params[decorators.length > 0]',
        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
      ],
    }],
    '@typescript-eslint/lines-between-class-members': ['error', 'always', {
      exceptAfterSingleLine: true,
    }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },

  ignorePatterns: ['*.js'],
};
