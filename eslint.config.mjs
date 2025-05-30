import globals from 'globals';
import * as tseslint from 'typescript-eslint';
import eslintJs from '@eslint/js';
import eslintImport from 'eslint-plugin-import';
import eslintSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactPerf from 'eslint-plugin-react-perf';
import eslintJest from 'eslint-plugin-jest';
import eslintTestingLibrary from 'eslint-plugin-testing-library';
import eslintJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintReactNativeA11y from 'eslint-plugin-react-native-a11y';
import eslintReactNative from 'eslint-plugin-react-native';
import eslintCodegen from 'eslint-plugin-codegen';
import internalPlugin from '@cbhq/eslint-plugin-internal';

const commonSettings = {
  react: {
    version: 'detect', // Automatically detect the React version
  },
};

const ignores = [
  '*.md',
  'dist/',
  'node_modules/',
  'OWNERS',
  'Makefile',
  'eslint.config.mjs',
  '**/babel.config.cjs',
  'next-env.d.ts',
  '__mocks__',
  '**/dist/**',
  '**/dts/**',
  '**/cjs/**',
  '**/esm/**',
  '**/lib/**',
  '**/templates/**',
  '**/.next/**',
  // These files use assert { type: 'json' } syntax that breaks eslint and must be fully ignored
  '**/getAffectedRoutes.mjs',
  '**/getBuildInfo.mjs',
  'apps/mobile-app/prebuilds',
  'apps/mobile-app/prebuilds',
  // within their NX project, these files are not included by the Typescript config
  // when linting with TS types (e.g. internal/safely-spread-props) this will raise an error
  'packages/web/optimize-css.ts',
  'packages/icons/scripts/*.ts',
  'packages/illustrations/scripts/*.ts',
  'libs/docusaurus-plugin-docgen/module-declarations.d.ts',
  'apps/figma-strings-plugin/vite.config.ts',
];

const typescriptRules = {
  '@typescript-eslint/no-empty-object-type': 'error',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-namespace': 'off',
  '@typescript-eslint/no-require-imports': 'off',
  '@typescript-eslint/no-unsafe-function-type': 'error',
  '@typescript-eslint/no-unused-vars': 'warn',
  '@typescript-eslint/prefer-namespace-keyword': 'off',
};

const reactRules = {
  'import/default': 'off',
  'import/named': 'off',
  'import/namespace': 'off',
  'import/no-unresolved': 'off',
  'import/order': 'off',
  'simple-import-sort/exports': 'warn',
  'simple-import-sort/imports': [
    'warn',
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
  'react/jsx-sort-props': [
    'warn',
    {
      shorthandFirst: true,
      reservedFirst: true,
    },
  ],
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

export default tseslint.config(
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
    settings: commonSettings,
    extends: [
      eslintJs.configs.recommended,
      eslintImport.flatConfigs.recommended,
      eslintReact.configs.flat.recommended,
      eslintReactHooks.configs['recommended-latest'],
      eslintReactPerf.configs.flat.recommended,
      eslintJsxA11y.flatConfigs.recommended,
      internalPlugin.configs.importRules,
    ],
    plugins: {
      'simple-import-sort': eslintSimpleImportSort,
    },
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
      internalPlugin.configs.allRules,
    ],
    plugins: {
      'simple-import-sort': eslintSimpleImportSort,
      codegen: eslintCodegen,
    },
    settings: commonSettings,
    rules: {
      ...typescriptRules,
      ...reactRules,
      'no-loss-of-precision': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'codegen/codegen': 'error',
      'internal/safely-spread-props': 'warn',
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
      internalPlugin.configs.importRules,
    ],
    plugins: {
      'react-native': eslintReactNative,
      'react-native-a11y': eslintReactNativeA11y,
      'simple-import-sort': eslintSimpleImportSort,
    },
    settings: commonSettings,
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
      internalPlugin.configs.importRules,
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      'react-native': eslintReactNative,
      'react-native-a11y': eslintReactNativeA11y,
      'simple-import-sort': eslintSimpleImportSort,
    },
    settings: commonSettings,
    rules: {
      ...typescriptRules,
      ...reactRules,
      ...testRules,
      'no-loss-of-precision': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
    },
  },
);
