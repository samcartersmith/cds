import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { css } from 'linaria';

import { palette } from '../tokens';

const FOCUS_RING_PADDING = 4;

// if we use the focus ring we need to turn off the browser stylesheet outline
export const focusRing = css`
  position: relative;
  &:focus-visible,
  &.focus-visible {
    outline: none;

    &:before {
      content: '';
      position: absolute;
      /* TODO: make border width work with other components */
      top: calc(-1 * (${FOCUS_RING_PADDING}px + ${borderWidth.button}px));
      left: calc(-1 * (${FOCUS_RING_PADDING}px + ${borderWidth.button}px));
      right: calc(-1 * (${FOCUS_RING_PADDING}px + ${borderWidth.button}px));
      bottom: calc(-1 * (${FOCUS_RING_PADDING}px + ${borderWidth.button}px));
      border: ${borderWidth.focusRing}px solid ${palette.primary};
      border-radius: inherit;
    }
  }
`;
