import { RuleTester } from '@typescript-eslint/rule-tester';
import { TSESLint } from '@typescript-eslint/utils';
import path from 'path';

const fixturesPath = path.resolve(__dirname, '../../fixtures');

export function createRuleTester(options?: Partial<TSESLint.RuleTesterConfig>): RuleTester {
  const defaultOptions: TSESLint.RuleTesterConfig = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      tsconfigRootDir: fixturesPath,
      project: './tsconfig.json',
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return new RuleTester({
    ...defaultOptions,
    ...options,
  });
}
