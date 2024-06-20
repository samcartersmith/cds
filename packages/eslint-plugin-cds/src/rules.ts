/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TSESLint } from '@typescript-eslint/utils';

import { controlHasAssociatedLabelExtended } from './rules/control-has-associated-label-extended';
import { hasValidA11yDescriptorsExtended } from './rules/has-valid-accessibility-descriptors-extended';

export const rules: {
  [key: string]: TSESLint.RuleModule<string, []>;
} = {
  'control-has-associated-label-extended': controlHasAssociatedLabelExtended,
  'has-valid-accessibility-descriptors-extended': hasValidA11yDescriptorsExtended,
};
