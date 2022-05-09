/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
import { css } from 'linaria';
// eslint-disable-next-line no-restricted-imports
import { borderRadius as borderRadiusTokens } from '@cbhq/cds-common/tokens/borderRadius';

import { borderRadius } from '../tokens';

export const borderRadiusVariables = {
  '--border-radius-none': `${borderRadiusTokens.none}px`,
  '--border-radius-compact': `${borderRadiusTokens.compact}px`,
  '--border-radius-tooltip-v2': `${borderRadiusTokens.tooltipV2}px`,
  '--border-radius-standard': `${borderRadiusTokens.standard}px`,
  '--border-radius-badge': `${borderRadiusTokens.badge}px`,
  '--border-radius-tooltip': `${borderRadiusTokens.tooltip}px`,
  '--border-radius-pill': `${borderRadiusTokens.pill}px`,
  '--border-radius-round': `${borderRadiusTokens.round}px`,
  '--border-radius-input': `${borderRadiusTokens.input}px`,
  '--border-radius-search': `${borderRadiusTokens.search}px`,
  '--border-radius-popover': `${borderRadiusTokens.popover}px`,
};

export const none = css`
  border-radius: ${borderRadius.none};
`;
export const compact = css`
  border-radius: ${borderRadius.compact};
`;
export const tooltipV2 = css`
  border-radius: ${borderRadius.tooltipV2};
`;
export const standard = css`
  border-radius: ${borderRadius.standard};
`;
export const badge = css`
  border-radius: ${borderRadius.badge};
`;
export const tooltip = css`
  border-radius: ${borderRadius.tooltip};
`;
export const pill = css`
  border-radius: ${borderRadius.pill};
`;
export const round = css`
  border-radius: ${borderRadius.round};
`;
export const input = css`
  border-radius: ${borderRadius.input};
`;
export const search = css`
  border-radius: ${borderRadius.search};
`;
export const popover = css`
  border-radius: ${borderRadius.popover};
`;
