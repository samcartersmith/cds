module.exports = {
  root: true,
  plugins: ['@cbhq'],
  extends: [
    'plugin:@cbhq/conventions',
    'plugin:@cbhq/react',
    'plugin:@cbhq/testing',
    'plugin:@cbhq/imports',
  ],
  parserOptions: {
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  env: {
    'jest/globals': true,
  },
  reportUnusedDisableDirectives: true,
  overrides: [
    // Node.js
    {
      files: [
        '**/.*.js',
        '**/.*.ts',
        '**/*.tsx',
        '**/*.config.js',
        '**/*.config.ts',
        '**/scripts/**/*',
      ],
      extends: ['plugin:@cbhq/node'],
      rules: {
        'compat/compat': 'off',
        'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      },
    },
    {
      files: ['**/*.tsx'],
      rules: {
        'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      },
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
