/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
import { css } from 'linaria';
// eslint-disable-next-line no-restricted-imports
import { borderRadius as borderRadiusTokens } from '@cbhq/cds-common/tokens/borderRadius';

import { borderRadius } from '../tokens';

export const borderRadiusVariables = {
  '--border-radius-rounded-none': `${borderRadiusTokens.roundedNone}px`,
  '--border-radius-rounded-small': `${borderRadiusTokens.roundedSmall}px`,
  '--border-radius-rounded': `${borderRadiusTokens.rounded}px`,
  '--border-radius-rounded-medium': `${borderRadiusTokens.roundedMedium}px`,
  '--border-radius-rounded-large': `${borderRadiusTokens.roundedLarge}px`,
  '--border-radius-rounded-x-large': `${borderRadiusTokens.roundedXLarge}px`,
  '--border-radius-rounded-full': `${borderRadiusTokens.roundedFull}px`,
};

export const roundedNone = css`
  border-radius: ${borderRadius.roundedNone};
`;
export const roundedSmall = css`
  border-radius: ${borderRadius.roundedSmall};
`;
export const rounded = css`
  border-radius: ${borderRadius.rounded};
`;
export const roundedMedium = css`
  border-radius: ${borderRadius.roundedMedium};
`;
export const roundedLarge = css`
  border-radius: ${borderRadius.roundedLarge};
`;
export const roundedXLarge = css`
  border-radius: ${borderRadius.roundedXLarge};
`;
export const roundedFull = css`
  border-radius: ${borderRadius.roundedFull};
`;
