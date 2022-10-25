module.exports = {
  root: true,
  plugins: ['@cbhq', 'codegen'],
  extends: ['plugin:@cbhq/conventions', 'plugin:@cbhq/react', 'plugin:@cbhq/imports'],
  parserOptions: {
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'codegen/codegen': 'error',
        'react/jsx-uses-react': 'error',
        'react/react-in-jsx-scope': 'error',
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'no-restricted-globals': [
          'error',
          {
            name: 'window',
            message: 'Use getBrowserGlobals() function to access window',
          },
          {
            name: 'document',
            message: 'Use getBrowserGlobals() function to access document',
          },
          {
            name: 'process',
            message: 'Do not directly interact with process. Use a function from utils/env',
          },
        ],
      },
    },
    // Jest configs
    {
      files: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/__tests__/*.ts',
        '**/__tests__/*.tsx',
        '**/jest/**',
      ],
      extends: ['plugin:@cbhq/testing', 'plugin:@cbhq/node', 'plugin:testing-library/react'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-uses-react': 0,
        'react/react-in-jsx-scope': 0,
        'no-restricted-globals': 'off',
      },
      env: {
        'jest/globals': true,
      },
    },
  ],
};
