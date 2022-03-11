import { css } from 'linaria';
import { borderRadius, borderWidth } from '@cbhq/cds-common/tokens/border';

import { palette } from '../tokens';

const FOCUS_RING_PADDING = 4;
export const focusVisibleClassName = 'focus-visible';

/**
 * focusRing uses the focus-visible polyfill (since Safari does not yet support focus-visible)
 * @link https://github.com/WICG/focus-visible
 * this polyfill detects whether an interaction would have triggered the focus-visible property
 *  and adds the .focus-visible class
 */
export const focusRing = css`
  position: relative;
  /* if we use the focus ring we need to turn off the browser stylesheet outline */
  &:focus {
    outline: none;
  }
  &.${focusVisibleClassName} {
    &::before {
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

const INSET_FOCUS_RING_PADDING = 0;

/**
 * insetFocusRing should only be used in a MenuItem or when overflow is hidden.
 * insetFocusRing uses the focus-visible polyfill (since Safari does not yet support focus-visible)
 * @link https://github.com/WICG/focus-visible
 * this polyfill detects whether an interaction would have triggered the focus-visible property
 *  and adds the .focus-visible class
 */
export const insetFocusRing = css`
  position: relative;
  &:focus {
    outline: none;
  }
  &.${focusVisibleClassName} {
    &::before {
      content: '';
      position: absolute;
      top: ${INSET_FOCUS_RING_PADDING}px;
      left: ${INSET_FOCUS_RING_PADDING}px;
      right: ${INSET_FOCUS_RING_PADDING}px;
      bottom: ${INSET_FOCUS_RING_PADDING}px;
      border: ${borderWidth.focusRing}px solid ${palette.primary};
      border-radius: ${borderRadius.compact}px;
    }
  }
`;
