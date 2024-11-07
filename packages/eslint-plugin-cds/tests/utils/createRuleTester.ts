import { RuleTester } from '@typescript-eslint/rule-tester';
import { TSESLint } from '@typescript-eslint/utils';
import path from 'node:path';

const fixturesPath = path.resolve(__dirname, '../../fixtures');

export function createRuleTester(options?: Partial<TSESLint.RuleTesterConfig>): RuleTester {
  const defaultOptions: TSESLint.RuleTesterConfig = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      tsconfigRootDir: fixturesPath,
      project: './tsconfig.json',
    },
  };

  return new RuleTester({
    ...defaultOptions,
    ...options,
  });
}
