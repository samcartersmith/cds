// eslint.config.js
const globals = require('globals');
const tseslint = require('typescript-eslint');
const eslintJs = require('@eslint/js');
const eslintImport = require('eslint-plugin-import');
const eslintSimpleImportSort = require('eslint-plugin-simple-import-sort');
const eslintReact = require('eslint-plugin-react');
const eslintReactHooks = require('eslint-plugin-react-hooks');
const eslintReactPerf = require('eslint-plugin-react-perf');
const eslintJest = require('eslint-plugin-jest');
const eslintTestingLibrary = require('eslint-plugin-testing-library');
const eslintJsxA11y = require('eslint-plugin-jsx-a11y');
const eslintReactNativeA11y = require('eslint-plugin-react-native-a11y');
const eslintReactNative = require('eslint-plugin-react-native');

const eslintImportAutofixRule = require('./eslint.autofix.cjs');

const ignores = [
  '*.md',
  'dist/',
  'node_modules/',
  'OWNERS',
  'Makefile',
  'eslint.config.cjs',
  '**/babel.config.cjs',
  'next-env.d.ts',
  '__mocks__',
  '**/dist/**',
  '**/dts/**',
  '**/cjs/**',
  '**/esm/**',
  '**/lib/**',
  '**/templates/**',
  // These files use assert { type: 'json' } syntax that breaks eslint and must be fully ignored
  '**/getAffectedRoutes.mjs',
  '**/getBuildInfo.mjs',
];

const typescriptRules = {
  '@typescript-eslint/no-empty-object-type': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-namespace': 'off',
  '@typescript-eslint/no-require-imports': 'off',
  '@typescript-eslint/no-unsafe-function-type': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/prefer-namespace-keyword': 'off',
};

const reactRules = {
  'import/default': 'off',
  'import/named': 'off',
  'import/namespace': 'off',
  'import/no-unresolved': 'off',
  'import/order': 'off',
  'simple-import-sort/exports': 'error',
  'simple-import-sort/imports': [
    'error',
    {
      groups: [
        // Side effect imports first
        ['^\\u0000'],
        // React and react-native imports, npm imports, then coinbase imports
        ['^react$', '^react-native$', '^react', '^@?\\w', '^@cb.*'],
        // Shared code imports
        ['^:.*'],
        // Parent imports. Put `..` last.
        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
        // Other relative imports. Put same-folder imports and `.` last.
        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^\\.'],
      ],
    },
  ],
  'react-perf/jsx-no-new-array-as-prop': 'off',
  'react-perf/jsx-no-new-function-as-prop': 'off',
  'react-perf/jsx-no-new-object-as-prop': 'off',
  'react/display-name': 'off',
  'react/jsx-key': 'off',
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off',
};

const testRules = {
  'jest/no-mocks-import': 'off',
  'testing-library/await-async-events': 'off',
  'testing-library/await-async-queries': 'off',
  'testing-library/no-await-sync-events': 'off',
  'testing-library/no-manual-cleanup': 'off',
  'testing-library/no-node-access': 'off',
  'testing-library/prefer-find-by': 'off',
  'testing-library/render-result-naming-convention': 'off',
};

const importPlugins = {
  'simple-import-sort': eslintSimpleImportSort,
  coinbase: {
    rules: {
      'import-autofix': eslintImportAutofixRule,
    },
  },
};

module.exports = tseslint.config(
  { ignores },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      ...importPlugins,
    },
    extends: [
      eslintJs.configs.recommended,
      eslintImport.flatConfigs.recommended,
      eslintReact.configs.flat.recommended,
      eslintReactHooks.configs['recommended-latest'],
      eslintReactPerf.configs.flat.recommended,
      eslintJsxA11y.flatConfigs.recommended,
    ],
    rules: {
      ...reactRules,
      'no-loss-of-precision': 'off',
      'no-unused-vars': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintImport.flatConfigs.recommended,
      eslintReact.configs.flat.recommended,
      eslintReactHooks.configs['recommended-latest'],
      eslintReactPerf.configs.flat.recommended,
      eslintJsxA11y.flatConfigs.recommended,
    ],
    plugins: {
      ...importPlugins,
    },
    rules: {
      ...typescriptRules,
      ...reactRules,
      'no-loss-of-precision': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
    },
  },
  {
    files: ['**/*mobile*/**/*.{ts,tsx}'],
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintImport.flatConfigs.recommended,
      eslintReact.configs.flat.recommended,
      eslintReactHooks.configs['recommended-latest'],
      eslintReactPerf.configs.flat.recommended,
      eslintJsxA11y.flatConfigs.recommended,
    ],
    plugins: {
      'react-native': eslintReactNative,
      'react-native-a11y': eslintReactNativeA11y,
      ...importPlugins,
    },
    rules: {
      ...typescriptRules,
      ...reactRules,
      'no-loss-of-precision': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/**', '**/setup.js'],
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintImport.flatConfigs.recommended,
      eslintReact.configs.flat.recommended,
      eslintReactHooks.configs['recommended-latest'],
      eslintReactPerf.configs.flat.recommended,
      eslintJest.configs['flat/recommended'],
      eslintTestingLibrary.configs['flat/react'],
      eslintJsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      'react-native': eslintReactNative,
      'react-native-a11y': eslintReactNativeA11y,
      ...importPlugins,
    },
    rules: {
      ...typescriptRules,
      ...reactRules,
      ...testRules,
      'no-loss-of-precision': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
    },
  },
);
