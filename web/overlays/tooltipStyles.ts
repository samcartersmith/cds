import { borderRadius } from '@cbhq/cds-common/tokens/borderRadius';
import { css } from 'linaria';

import { palette } from '../tokens';

export const container = css`
  background-color: ${palette.foreground};
  border-radius: ${borderRadius.tooltip}px;
  z-index: 1000;
  min-height: 24px;
  align-items: center;
  justify-content: center;
`;

export const disabled = css`
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
`;
