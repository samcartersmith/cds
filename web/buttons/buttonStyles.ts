import { tapTarget } from '@cbhq/cds-common/tokens/sizing';
import { css } from 'linaria';

import { spacing } from '../tokens';

export const button = css`
  display: inline-flex;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin: 0;
  position: relative;
  min-width: 100px;
  white-space: nowrap;
  appearance: none;
  outline: 0;
  overflow: visible;
  text-transform: none;
`;

export const buttonCompact = css`
  min-width: auto;
`;

export const buttonBlock = css`
  display: flex;
  width: 100%;
  max-width: 100%;
  white-space: normal;
`;

export const iconButton = css`
  width: ${tapTarget}px;
  height: ${tapTarget}px;
  min-width: unset;
`;

export const startIcon = css`
  display: inline-block;
  margin-right: ${spacing[1]};
`;

export const endIcon = css`
  display: inline-block;
  margin-left: ${spacing[1]};
`;
