import { css } from 'linaria';

import { borderRadius, palette } from '../tokens';

export const container = css`
  background-color: ${palette.foreground};
  border-radius: ${borderRadius.rounded};
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
