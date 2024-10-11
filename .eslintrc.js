const importConfig = require('@cbhq/eslint-plugin/configs/imports');

const simpleImportSortConfig = importConfig.rules['simple-import-sort/imports'][1];

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
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'react/boolean-prop-naming': [
          'error',
          {
            rule: '^(?!(is|has|should)[A-Z]).*',
            message:
              'Please refer to the boolean naming conventions found here https://github.cbhq.net/frontend/cds/blob/master/docs/conventions/api-design.md#boolean',
          },
        ],
        // makes sure event handlers are prefixed with handle*
        'react/jsx-handler-names': 'error',
        'react/jsx-uses-react': 'error',
        'react/react-in-jsx-scope': 'error',
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
      env: {
        'jest/globals': true,
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-uses-react': 0,
        'react/react-in-jsx-scope': 0,
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
            assertFunctionNames: ['expect', 'measureRenders'],
            additionalTestBlockFunctions: [],
          },
        ],
      },
    },
  ],
  rules: {
    // Many of the following rules were disabled as a result of the @cbhq/eslint plugin upgrade: https://github.cbhq.net/frontend/cds/pull/1557
    // We will be disabling these rule in follow up pr's once Kat's illustration/icon work lands.
    '@cbhq/func-declaration-in-module': 'off',
    '@cbhq/graphql-directives': 'off',
    '@cbhq/graphql-disallow-required-action-throw': 'off',
    '@cbhq/graphql-field-alias': 'off',
    '@cbhq/graphql-id-and-uuid-types': 'off',
    '@cbhq/graphql-node-interface': 'off',
    '@cbhq/graphql-relay-connection-types': 'off',
    '@cbhq/graphql-require-description': 'off',
    '@cbhq/no-class-decorator': 'off',
    '@cbhq/no-lib-import': 'off',
    '@cbhq/no-lodash': 'off',
    '@cbhq/no-regex-lookbehind': 'off',
    '@cbhq/no-unsafe-methods': 'off',
    '@cbhq/react-intl-no-duplicate-message-id': 'off',
    '@cbhq/react-intl-no-unused-message': 'off',
    '@cbhq/react-intl-require-i18nKey-template-prefix': 'off',
    '@cbhq/react-native-no-fabric-incompatible-apis': 'off',
    '@cbhq/react-no-inline-props-types': 'off',
    '@cbhq/react-prefer-named-module-import': 'off', // Do not enable this rule until thoroughly tested. We have had an incident caused by this in the past because not all consumers are compatible.
    '@cbhq/react-ref-requires-key': 'off',
    '@cbhq/react-require-use-memo': 'off',
    '@cbhq/relay-no-external-import-data-type': 'off',
    '@cbhq/relay-resolvers': 'off',
    '@cbhq/ts-singular-type-name': 'off',
    '@graphql-eslint/no-deprecated': 'off',
    '@graphql-eslint/no-duplicate-fields': 'off',
    '@graphql-eslint/relay-edge-types': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'func-declaration-in-module': 'off',
    'graphql-eslint': 'off',
    'import/no-duplicates': 'off',
    'import/no-relative-packages': 'off',
    'max-classes-per-file': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'no-return-assign': 'off',
    'no-underscore-dangle': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-sort-props': [
      'warn',
      {
        reservedFirst: true,
        shorthandFirst: true,
      },
    ],
    'simple-import-sort/imports': ['warn', simpleImportSortConfig],
    'ts-no-enum': 'off',
    'ts-singular-type-name': 'off',
  },
};
