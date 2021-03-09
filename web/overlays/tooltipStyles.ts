import { css } from 'linaria';

import { palette } from '../tokens';

export const container = css`
  background-color: ${palette.foreground};
  display: none;
  border-radius: 14px;
  z-index: 1000;
`;

export const opened = css`
  display: block;
`;

export const disabled = css`
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
`;
