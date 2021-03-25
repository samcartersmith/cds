import { css } from 'linaria';

import { palette } from '../tokens';

export const focusVisible = css`
  position: relative;
  &:focus-visible,
  &.focus-visible {
    &:before {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      border: 2px solid ${palette.primary};
      border-radius: inherit;
    }
  }
`;
