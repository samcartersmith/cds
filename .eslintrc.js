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
  reportUnusedDisableDirectives: true,
  overrides: [
    // Node.js
    {
      files: [
        '**/.*.js',
        '**/.*.ts',
        '**/*.config.js',
        '**/*.config.ts',
        '**/scripts/**/*',
      ],
      extends: ['plugin:@cbhq/node'],
      rules: {
        'compat/compat': 'off',
      },
    },
    {
      files: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.stories.tsx'
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ],
};