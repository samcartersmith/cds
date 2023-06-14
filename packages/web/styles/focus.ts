import { css } from 'linaria';

import { borderRadius, borderWidth, palette } from '../tokens';

const FOCUS_RING_PADDING = 4;
const FOCUS_RING_POSITION = `calc(-1 * (${FOCUS_RING_PADDING}px + ${borderWidth.button}))`;
const INSET_FOCUS_RING_PADDING = 0;

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
      top: ${FOCUS_RING_POSITION};
      left: ${FOCUS_RING_POSITION};
      right: ${FOCUS_RING_POSITION};
      bottom: ${FOCUS_RING_POSITION};
      border: ${borderWidth.focusRing} solid ${palette.primary};
      border-radius: inherit;
    }
  }
`;

/**
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
  &.${focusVisibleClassName} + label,
  &.${focusVisibleClassName} {
    &::before {
      content: '';
      position: absolute;
      top: ${INSET_FOCUS_RING_PADDING}px;
      left: ${INSET_FOCUS_RING_PADDING}px;
      right: ${INSET_FOCUS_RING_PADDING}px;
      bottom: ${INSET_FOCUS_RING_PADDING}px;
      border: ${borderWidth.focusRing} solid ${palette.primary};
      border-radius: ${borderRadius.roundedSmall};
    }
  }
  &.${focusVisibleClassName} + label {
    &::before {
      border-radius: ${borderRadius.roundedNone};
    }
  }
  &.${focusVisibleClassName}:first-of-type + label {
    &::before {
      border-top-left-radius: ${borderRadius.rounded};
      border-bottom-left-radius: ${borderRadius.rounded};
    }
  }

  &.${focusVisibleClassName}:last-of-type + label {
    &::before {
      border-top-right-radius: ${borderRadius.rounded};
      border-bottom-right-radius: ${borderRadius.rounded};
    }
  }
`;
