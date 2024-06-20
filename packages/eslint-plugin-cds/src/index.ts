import { TSESLint } from '@typescript-eslint/utils';

import { mobileConfig } from './configs/mobile';
import { webConfig } from './configs/web';
import { rules } from './rules';

const rules2 = rules as {
  [key: string]: TSESLint.RuleModule<string, []>;
};

const config = {
  rules: rules2,
  configs: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      sourceType: 'module',
    },
    mobile: mobileConfig,
    web: webConfig,
  },
};

export default config;
