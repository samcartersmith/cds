// import { borderRadius } from '@cbhq/cds-common';
import { css } from 'linaria';

import { palette } from '../tokens';

// TODO: Common deep imports
export const container = css`
  background-color: ${palette.foreground};
  border-radius: 12px;
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
