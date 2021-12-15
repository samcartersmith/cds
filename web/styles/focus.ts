import { borderRadius, borderWidth } from '@cbhq/cds-common/tokens/border';
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

const INSET_FOCUS_RING_PADDING = -1;

export const insetFocusRing = css`
  position: relative;
  &:focus-visible {
    outline: none;

    &:before {
      content: '';
      position: absolute;
      top: ${INSET_FOCUS_RING_PADDING}px;
      left: ${INSET_FOCUS_RING_PADDING}px;
      right: ${INSET_FOCUS_RING_PADDING}px;
      bottom: ${INSET_FOCUS_RING_PADDING}px;
      border: ${borderWidth.focusRing}px solid ${palette.primary};
      border-radius: ${borderRadius.standard};
      transition: ease-out opacity 0.1s;
    }
    &:first-child {
      &:before {
        border-top-right-radius: ${borderRadius.popover}px;
        border-top-left-radius: ${borderRadius.popover}px;
      }
    }
    &:last-child {
      &:before {
        border-bottom-right-radius: ${borderRadius.popover}px;
        border-bottom-left-radius: ${borderRadius.popover}px;
      }
    }
  }
`;
