/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
import { css } from 'linaria';
// eslint-disable-next-line no-restricted-imports
import { borderWidth as borderWidthTokens } from '@cbhq/cds-common/tokens/borderWidth';

import { borderWidth } from '../tokens';

export const borderWidthVariables = {
  '--border-width-none': `${borderWidthTokens.none}px`,
  '--border-width-button': `${borderWidthTokens.button}px`,
  '--border-width-card': `${borderWidthTokens.card}px`,
  '--border-width-checkbox': `${borderWidthTokens.checkbox}px`,
  '--border-width-radio': `${borderWidthTokens.radio}px`,
  '--border-width-sparkline': `${borderWidthTokens.sparkline}px`,
  '--border-width-focus-ring': `${borderWidthTokens.focusRing}px`,
  '--border-width-input': `${borderWidthTokens.input}px`,
};

export const none = css`
  border-radius: ${borderWidth.none};
`;

export const button = css`
  border-radius: ${borderWidth.button};
`;

export const card = css`
  border-radius: ${borderWidth.card};
`;

export const checkbox = css`
  border-radius: ${borderWidth.checkbox};
`;

export const radio = css`
  border-radius: ${borderWidth.radio};
`;

export const sparkline = css`
  border-radius: ${borderWidth.sparkline};
`;

export const focusRing = css`
  border-radius: ${borderWidth.focusRing};
`;

export const input = css`
  border-radius: ${borderWidth.input};
`;
