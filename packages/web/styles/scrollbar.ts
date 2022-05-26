import { css } from 'linaria';

import { borderRadius, palette } from '../tokens';

/**
 * This is custom styling for scrollbars that should only be used when
 * you want to ensure the scrollbar won't add to the size of scrollable content
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter#browser_compatibility
 * and will be clipped by the parent container's edges
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar
 */
export const transparentScrollbar = css`
  /* this makes the track (the background) invisible */
  &::-webkit-scrollbar {
    background: transparent;
    width: 8px;
  }
  /* when you make the track invisible, you have to recreate the thumb (scrubber) */
  &::-webkit-scrollbar-thumb {
    background-color: ${palette.lineHeavy};
    border-radius: ${borderRadius.pill};
    &:hover {
      background-color: ${palette.foregroundMuted};
    }
  }
`;
