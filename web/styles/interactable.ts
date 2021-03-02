import { css } from 'linaria';

import { palette } from '../styles/palette';
import { opacityDisabled } from './tokens';

export const interactable = css`
  position: relative;
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  z-index: 0;
  transition: transform 100ms;
  // Prevents layout shift - https://web.dev/cls/#animations-and-transitions
  transform: scale(1);

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &:before {
    z-index: -1;
    opacity: var(--interactable-opacity);
  }

  &:after {
    background-color: var(--interactable-underlay);
    z-index: -2;
  }
`;

export const scaledDownState = css`
  transform: scale(0.98);
`;

export const pressedState = css`
  --interactable-underlay: ${palette.foreground};
`;

export const hoveredState = css`
  --interactable-underlay: ${palette.background};
`;

export const disabledState = css`
  --interactable-underlay: unset;
  opacity: ${opacityDisabled};
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;
