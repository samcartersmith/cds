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
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
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
      },
      env: {
        'jest/globals': true,
      },
    },
    // Performance tests w/Reassure
    {
      files: ['**/*.perf-test.tsx'],
      rules: {
        '@cbhq/no-misnamed-test-file': 'off',
        'jest/expect-expect': [
          'error',
          {
            assertFunctionNames: ['expect', 'measurePerformance'],
            additionalTestBlockFunctions: [],
          },
        ],
      },
    },
  ],
  rules: {
    // All following rules were disabled as a result of the @cbhq/eslint plugin upgrade: https://github.cbhq.net/frontend/cds/pull/1557
    // We will be disabling these rule in follow up pr's once Kat's illustration/icon work lands.
    'ts-no-enum': 'off',
    'ts-singular-type-name': 'off',
    'func-declaration-in-module': 'off',
    'react/function-component-definition': 'off',
    'graphql-eslint': 'off',
    '@graphql-eslint/relay-edge-types': 'off',
    '@cbhq/graphql-relay-connection-types': 'off',
    '@cbhq/graphql-id-and-uuid-types': 'off',
    '@cbhq/graphql-require-description': 'off',
    '@graphql-eslint/no-duplicate-fields': 'off',
    '@cbhq/no-lodash': 'off',
    '@cbhq/react-no-default-props': 'off',
    '@cbhq/no-class-decorator': 'off',
    '@cbhq/no-lib-import': 'off',
    '@cbhq/no-regex-lookbehind': 'off',
    '@cbhq/no-unsafe-methods': 'off',
    '@cbhq/react-intl-no-unused-message': 'off',
    '@cbhq/react-no-inline-props-types': 'off',
    '@cbhq/react-no-static-methods-memo': 'off',
    '@cbhq/react-prefer-named-module-import': 'off', // Do not enable this rule until thoroughly tested. We have had an incident caused by this in the past because not all consumers are compatible.
    '@cbhq/react-ref-requires-key': 'off',
    '@cbhq/react-require-use-memo': 'off',
    '@cbhq/react-use-callback-for-function': 'off',
    '@graphql-eslint/no-deprecated': 'off',
    '@cbhq/react-native-no-fabric-incompatible-apis': 'off',
    '@cbhq/graphql-field-alias': 'off',
    '@cbhq/relay-no-external-import-data-type': 'off',
    '@cbhq/graphql-directives': 'off',
    '@cbhq/graphql-node-interface': 'off',
    '@cbhq/graphql-disallow-required-action-throw': 'off',
    '@cbhq/relay-resolvers': 'off',
    '@cbhq/react-intl-no-duplicate-message-id': 'off',
    '@cbhq/react-intl-require-i18nKey-template-prefix': 'off',
    '@cbhq/func-declaration-in-module': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@cbhq/react-native-no-fabric-incompatible-apis': 'off',
    '@cbhq/react-native-no-fabric-incompatible-apis': 0,
    'import/no-duplicates': 'off',
    'import/no-relative-packages': 'off',
    '@cbhq/ts-singular-type-name': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
  },
};
